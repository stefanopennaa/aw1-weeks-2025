import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect, useState } from "react";

import DefaultLayout from "./components/DefaultLayout";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";
import Questions from "./components/Questions";
import { Routes, Route, Navigate } from "react-router";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm";
import { LoginForm } from "./components/AuthComponents";
import NotFound from "./components/NotFound";
import API from "./API/API.mjs";

function App() {
  const [questions, setQuestions] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [message, setMessage] = useState(''); // NEW: global message for alerts (rendered in DefaultLayout)
  const [user, setUser] = useState('');

  // get all the questions
  useEffect(() => {
    const getQuestions = async () => {
      const questions = await API.getQuestions();
      setQuestions(questions);
    }
    getQuestions();
  }, []);

  // NEW: is the user logged in?
  useEffect(() => {
    const checkAuth = async () => {
      const user = await API.getUserInfo(); // we have the user info here
      setLoggedIn(true);
      setUser(user);
    };
    checkAuth();
  }, []);

  // NEW: handle login with credentials
  const handleLogin = async (credentials) => {
    try {
      const user = await API.logIn(credentials);
      setLoggedIn(true);
      setMessage({ msg: `Welcome, ${user.name}!`, type: 'success' });
      setUser(user);
    } catch (err) {
      setMessage({ msg: err, type: 'danger' });
    }
  };

  // NEW: handle logout
  const handleLogout = async () => {
    await API.logOut();
    setLoggedIn(false);
    // clean up everything
    setMessage('');
  };

  return (
    <Routes>
      <Route element={<DefaultLayout loggedIn={loggedIn} handleLogout={handleLogout} message={message} setMessage={setMessage} />} >
        <Route path="/" element={<Questions questions={questions} />} />
        <Route path="/questions/:questionId" element={<QuestionDescription questions={questions} />} >
          <Route index element={<Answers user={user} />} />
          <Route path="answers/new" element={loggedIn ? <AnswerForm addAnswer={true} user={user} /> : <Navigate replace to='/' />} />
          <Route path="answers/:answerId/edit" element={loggedIn ? <EditAnswerForm editAnswer={true} /> : <Navigate replace to='/' />} />
        </Route>
        <Route path='/login' element={loggedIn ? <Navigate replace to='/' /> : <LoginForm handleLogin={handleLogin} />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )

}

export default App;