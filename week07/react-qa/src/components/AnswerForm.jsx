import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import dayjs from "dayjs";

function AnswerForm(props) {
    // Each form field should be controlled by a state variable
    const [text, setText] = useState(props.answer ? props.answer.text : ""); // Set the default text to the answer text if editing
    const [email, setEmail] = useState(props.answer ? props.answer.email : "");
    const [date, setDate] = useState(props.answer ? props.answer.date.format("YYYY-MM-DD") : dayjs().format("YYYY-MM-DD")); // Set the default date to today

    // Form submission handler
    const handleSubmit = (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();
        // Create a new answer object (what is the new id?)
        const answer = { text, email, date }; // TODO: fields validation
        // Differentiate between add and edit mode
        if (props.mode === "edit") { // edit mode
            props.updateAnswer({ id: props.answer.id, ...answer });
        }
        else if (props.mode === "add") { // add mode
            props.addAnswer(answer);
        }
        else if (props.mode === "delete") { // delete mode
            props.deleteAnswer(props.answerId);
        }
    }

    // Form reset handler
    const handleReset = (event) => {
        // Prevent the default form reset behavior
        event.preventDefault();
        // Call the cancel function passed as a prop
        props.cancel();
    }

    return (
        <Form onSubmit={handleSubmit} onReset={handleReset}>
            {props.mode !== "delete" && <>
                <Form.Group className="mb-2">
                    <Form.Label>Text</Form.Label>
                    <Form.Control type="text" placeholder="Enter your answer" value={text} onChange={e => setText(e.target.value)} minLength={2} required />
                </Form.Group>
                <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Enter your email" value={email} onChange={e => setEmail(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control type="date" value={date} onChange={e => setDate(e.target.value)} required />
                </Form.Group>
            </>}
            {props.mode === "add" && <Button variant="success" type="submit" className="me-2">Submit answer</Button>}
            {props.mode === "edit" && <Button variant="primary" type="submit" className="me-2">Update answer</Button>}
            {props.mode === "delete" && <Button variant="outline-danger" type="submit" className="me-2">Delete answer</Button>}
            <Button variant="danger" type="reset">Cancel</Button>
        </Form>
    );
}

export default AnswerForm;