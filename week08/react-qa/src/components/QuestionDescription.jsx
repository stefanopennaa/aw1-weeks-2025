import { Outlet, useParams } from 'react-router';
import { Col, Row } from 'react-bootstrap';

function QuestionDescription(props) {
  const { questionId } = useParams();
  const question = props.questions[questionId - 1];

  return (
    <>{question ?
      <>
        <Row>
          <Col md={6} as='p'>
            <strong>Question #{questionId}:</strong>
          </Col>
          <Col md={6} as='p' className='text-end'>
            Asked by <span className='badge rounded-pill text-bg-secondary'>{question.email}</span>
          </Col>
        </Row>
        <Row>
          <Col as='p' className='lead'>{question.text}</Col>
        </Row>
        <Outlet />
      </>
      : <p>ERROR: Domanda non trovata.</p>}</>
  );
}

export default QuestionDescription;