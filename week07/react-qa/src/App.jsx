import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";
import { Container } from "react-bootstrap";

import { Answer, Question } from "./models/QAModels.mjs";
import NavHeader from "./components/NavHeader";
import QuestionDescription from "./components/QuestionDescription";
import Answers from "./components/Answers";

const fakeQuestion = new Question(1, "Is JavaScript better than Python?", "luigi.derussis@polito.it", 1, "2025-02-28");
fakeQuestion.init();
const fakeAnswers = fakeQuestion.getAnswers();

function App() {
  const [question, setQuestion] = useState(fakeQuestion);
  const [answers, setAnswers] = useState(fakeAnswers);

  const voteUp = (answerId) => {
    setAnswers((prevAnswers) => {
      const updatedAnswers = prevAnswers.map((ans) => {
        if (ans.id === answerId) {
          return new Answer(
            ans.id,
            ans.text,
            ans.email,
            ans.userId,
            ans.date,
            ans.score + 1
          );
        }
        return ans;
      });
      return updatedAnswers;
    });
  }

  const addAnswer = (answer) => {
    setAnswers((prevAnswers) => {
      const newId = prevAnswers.length > 0 ? Math.max(...prevAnswers.map(ans => ans.id)) + 1 : 1; // TODO: generate a unique id from the API server
      const userId = 1; // TODO: get the userId from the context or props
      const newAnswer = new Answer(
        newId,
        answer.text,
        answer.email,
        userId,
        answer.date
      );
      return [...prevAnswers, newAnswer];
    });
  }

  return (
    <>
      <NavHeader questionNum={question.id} />
      <Container fluid className="mt-3">
        <QuestionDescription question={question} />
        <Answers answers={answers} voteUp={voteUp} addAnswer={addAnswer} />
      </Container>
    </>
  )

}

export default App;