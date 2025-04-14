import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import { Link, useParams } from "react-router";
import { useState } from "react";

function Answers(props) {
  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} voteUp={props.voteUp} deleteAnswer={props.deleteAnswer} />
          <Link to="answers/new" className="btn btn-primary">Add</Link>
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {
  const [sortOrder, setSortOrder] = useState("none");

  const sortedAnswers = [...props.answers];
  if (sortOrder === "asc")
    sortedAnswers.sort((a, b) => a.score - b.score);
  else if (sortOrder == "desc")
    sortedAnswers.sort((a, b) => b.score - a.score);

  const sortByScore = () => {
    setSortOrder(oldOrder => oldOrder === "asc" ? "desc" : "asc");
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score <Button variant="link" className="text-black" onClick={sortByScore}><i className={sortOrder === "asc" ? "bi bi-sort-numeric-up" : "bi bi-sort-numeric-down"}></i></Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedAnswers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} deleteAnswer={props.deleteAnswer} />)}
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return (
    <tr><AnswerData answer={props.answer} /><AnswerAction {...props} /></tr>
  );
}

function AnswerData(props) {
  return (
    <>
      <td>{props.answer.date.format("YYYY-MM-DD")}</td>
      <td>{props.answer.text}</td>
      <td>{props.answer.email}</td>
      <td>{props.answer.score}</td>
    </>
  );
}

function AnswerAction(props) {
  return (
    <td>
      <Button variant="warning" onClick={() => props.voteUp(props.answer.id)}><i className="bi bi-arrow-up" /></Button>
      <Link to={`answers/${props.answer.id}/edit`} className="btn btn-primary mx-1"><i className="bi bi-pencil-square" /></Link>
      <Button variant="danger"><i className="bi bi-trash" onClick={() => props.deleteAnswer(props.answer.id)} /></Button>
    </td>
  );
}

export default Answers;