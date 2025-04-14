import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router';

function Questions(props) {
    return (
        <>
            <Row>
                <Col>
                    <h1>Welcome to HeapOverrun!</h1>
                    <p>We have {props.questions.length} questions.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <dl>
                        {props.questions.map((question) => (
                            <dd key={question.id}>
                                <Link to={`/questions/${question.id}`}>
                                    {question.text}
                                </Link>
                            </dd>
                        ))}
                    </dl>
                </Col>
            </Row>
        </>
    );
}

export default Questions;