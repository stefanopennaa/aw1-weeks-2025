import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router";

import { Question, Answer } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";
import { AnswerForm, EditAnswerForm } from "./components/AnswerForm";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [questions, setQuestions] = useState([fakeQuestion]);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if (ans.id === answerId)
          return new Answer(ans.id, ans.text, ans.email, ans.userId, ans.date, ans.score + 1);
        else
          return ans;
      });
    });
  }

  const addAnswer = (answer) => {
    setAnswers(oldAnswers => {
      // temporaneo
      const newId = Math.max(...oldAnswers.map(ans => ans.id)) + 1;
      const newAnswer = new Answer(newId, answer.text, answer.email, undefined, answer.date);
      return [...oldAnswers, newAnswer];
    });
  }

  const updateAnswer = (answer) => {
    setAnswers(oldAnswers => {
      return oldAnswers.map(ans => {
        if (ans.id === answer.id)
          return new Answer(answer.id, answer.text, answer.email, ans.userId, answer.date, ans.score);
        else
          return ans;
      });
    });
  }

  const deleteAnswer = (answerId) => {
    setAnswers(oldAnswers => {
      return oldAnswers.filter((answer) => answer.id !== answerId);
    });
  }

  /* ROUTES 
  
    - / => list of questions
    - /questions/:qid => question answers

    - /questions/:qid/answers/new => new answer
    - /questions/:qid/answers/:aid/edit => edit answer

    - * => 404 page not found (default route)
  
  */

  return (
    <>
      <NavHeader />
      <Container fluid className="mt-3">
        <Routes>
          <Route path="/questions/:questionId" element={<QuestionDescription questions={questions} />} >
            <Route index element={<Answers answers={answers} voteUp={voteUp} editAnswer={updateAnswer} deleteAnswer={deleteAnswer} />} />
            <Route path="answers/new" element={<AnswerForm addAnswer={addAnswer} />} />
            <Route path="answers/:answerId/edit" element={<EditAnswerForm editAnswer={updateAnswer} answers={answers} />} />
          </Route>
        </Routes>
      </Container>
    </>
  )

}

export default App;