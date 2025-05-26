// import
import express from 'express';
import morgan from 'morgan';
import { check, validationResult } from 'express-validator';
import { listQuestions, getQuestion, listAnswersOf, addAnswer, updateAnswer, voteAnswer, getUser } from './dao.mjs';
import cors from 'cors';

import passport from 'passport';
import LocalStrategy from 'passport-local';
import session from 'express-session';

// init
const app = express();
const port = 3001;

// middleware
app.use(express.json());
app.use(morgan('dev'));

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessState: 200,
  credentials: true // NEW: authentication
};

app.use(cors(corsOptions));

/* NEW: authentication */

passport.use(new LocalStrategy(async function verify(username, password, cb) { // local strategy: how the user will be authenticated? --> username/password
  const user = await getUser(username, password);
  if (!user) // user not found or wrong password
    return cb(null, false, 'Incorrect username or password.');

  return cb(null, user); // right password --> return user
}));

// serialize: how the user will be stored in the session
passport.serializeUser(function (user, cb) {
  cb(null, user);
});

// deserialize: how the user will be retrieved from the session
passport.deserializeUser(function (user, cb) {
  return cb(null, user);
});

// middleware: is the user logged in?
const isLoggedIn = (req, res, next) => { // the user must be logged in (isLoggedIn middleware)
  if (req.isAuthenticated()) {
    return next();
  }
  return res.status(401).json({ error: 'Not authorized' });
}

// inizialize the session
app.use(session({
  secret: "shhhhh... it's a secret!",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.authenticate('session'));

/* ROUTES */

// GET /api/questions
app.get('/api/questions', (req, res) => {
  listQuestions()
    .then(questions => res.json(questions))
    .catch(() => res.status(500).end());
});

// GET /api/questions/<id>
app.get('/api/questions/:id', async (request, response) => {
  try {
    const question = await getQuestion(request.params.id);
    if (question.error) {
      response.status(404).json(question);
    } else {
      response.json(question);
    }
  }
  catch {
    response.status(500).end();
  }
});

// GET /api/questions/<id>/answers
app.get('/api/questions/:id/answers', async (req, res) => {
  try {
    const answers = await listAnswersOf(req.params.id);
    res.json(answers);
  } catch {
    res.status(500).end();
  }
});

// POST /api/questions/<id>/answers
app.post('/api/questions/:id/answers', isLoggedIn, [ // the user must be logged in (isLoggedIn middleware)
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const newAnswer = req.body;
  const questionId = req.params.id;

  if (newAnswer.email !== req.user.username) {
    return res.status(401).json({ error: 'You can add answer only from your account' });
  }

  try {
    const id = await addAnswer(newAnswer, questionId);
    res.status(201).location(id).end();
  } catch (e) {
    console.error(`ERROR: ${e.message}`);
    res.status(503).json({ error: 'Impossible to create the answer.' });
  }
});

// PUT /api/answers/<id>
app.put('/api/answers/:id', isLoggedIn, [ // the user must be logged in (isLoggedIn middleware)
  check('text').notEmpty(),
  check('email').isEmail(),
  check('score').isNumeric(),
  check('date').isDate({ format: 'YYYY-MM-DD', strictMode: true })
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const answerToUpdate = req.body;
  answerToUpdate.id = req.params.id;

  if (answerToUpdate.email !== req.user.username) {
    return res.status(401).json({ error: 'You can\'t change the author of your question' });
  }

  try {
    await updateAnswer(answerToUpdate);
    res.status(200).end();
  } catch {
    res.status(503).json({ 'error': `Impossible to update answer #${req.params.id}.` });
  }
});

// POST /api/answers/<id>/vote
app.post('/api/answers/:id/vote', isLoggedIn, [ // the user must be logged in (isLoggedIn middleware)
  check('vote').notEmpty()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }

  const answerId = req.params.id;
  try {
    const num = await voteAnswer(answerId, req.body.vote);
    if (num === 1) {
      setTimeout(() => res.status(204).end(), 3000);
    }
    else
      throw new Error(`Error in casting a vote for answer #${answerId}`);
  } catch (e) {
    res.status(503).json({ error: e.message });
  }
});

/* NEW: routes for authentication */

// POST /api/sessions
app.post('/api/sessions', passport.authenticate('local'), function (req, res) { // login the user --> create a session
  return res.status(201).json(req.user);
});

// GET /api/sessions/current
app.get('/api/sessions/current', (req, res) => { // is the user logged in? --> is there a session?
  if (req.isAuthenticated()) {
    res.json(req.user);
  }
  else
    res.status(401).json({ error: 'Not authenticated' });
});

// DELETE /api/session/current
app.delete('/api/sessions/current', (req, res) => { // logout of the user --> delete the session
  req.logout(() => {
    res.end();
  });
});

/* Start the server */
app.listen(port, () => { console.log(`API server started at http://localhost:${port}`); });