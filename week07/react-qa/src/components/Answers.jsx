import "bootstrap-icons/font/bootstrap-icons.css";
import { Row, Col, Table, Button } from "react-bootstrap";
import AnswerForm from "./AnswerForm";
import { useState } from "react";

function Answers(props) {
  const [mode, setMode] = useState("view");
  const [editableAnswer, setEditableAnswer] = useState();
  const [deleteId, setDeleteId] = useState();

  const handleEdit = (answer) => {
    setEditableAnswer(answer);
    setMode("edit");
  }

  const handleDelete = (answerId) => {
    setDeleteId(answerId);
    setMode("delete");
  }

  return (
    <>
      <Row>
        <Col as="h2">Answers:</Col>
      </Row>
      <Row>
        <Col lg={10} className="mx-auto">
          <AnswerTable answers={props.answers} voteUp={props.voteUp} handleEdit={handleEdit} handleDelete={handleDelete} />
          {mode === "view" && <Button variant="success" onClick={() => setMode("add")}>Submit a new answer</Button>}
          {mode === "add" && <AnswerForm addAnswer={(answer) => { props.addAnswer(answer); setMode("view"); }} cancel={() => setMode("view")} mode={mode} />}
          {mode === "edit" && <AnswerForm key={editableAnswer.id} answer={editableAnswer} updateAnswer={(answer) => { props.updateAnswer(answer); setMode("view"); }} cancel={() => setMode("view")} mode={mode} />}
          {mode === "delete" && <AnswerForm key={deleteId} answerId={deleteId} deleteAnswer={(answerId) => { props.deleteAnswer(answerId); setMode("view"); }} cancel={() => setMode("view")} mode={mode} />}
        </Col>
      </Row>
    </>
  );
}

function AnswerTable(props) {
  const [sortOrder, setSortOrder] = useState();

  const sortedAnswers = [...props.answers];
  if (sortOrder === "asc") {
    sortedAnswers.sort((a, b) => a.score - b.score);
  }
  else if (sortOrder === "desc") {
    sortedAnswers.sort((a, b) => b.score - a.score);
  }

  const handleSort = () => {
    if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortOrder("asc");
    } else {
      setSortOrder("asc");
    }
  }

  return (
    <Table striped>
      <thead>
        <tr>
          <th>Date</th>
          <th>Text</th>
          <th>Author</th>
          <th>Score<Button variant="link" className="text-dark" onClick={() => handleSort()}><i className="bi bi-funnel"></i></Button></th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {sortedAnswers.map((ans) => <AnswerRow key={ans.id} answer={ans} voteUp={props.voteUp} handleEdit={props.handleEdit} handleDelete={props.handleDelete} />)}
      </tbody>
    </Table>
  );
}

function AnswerRow(props) {
  return (
    <tr><AnswerData answer={props.answer} /><AnswerAction answer={props.answer} voteUp={props.voteUp} handleEdit={props.handleEdit} handleDelete={props.handleDelete} /></tr>
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
      <Button variant="primary" onClick={() => props.handleEdit(props.answer)} className="mx-1"><i className="bi bi-pencil-square" /></Button>
      <Button variant="danger" onClick={() => props.handleDelete(props.answer.id)}><i className="bi bi-trash" /></Button>
    </td>
  );
}

export default Answers;