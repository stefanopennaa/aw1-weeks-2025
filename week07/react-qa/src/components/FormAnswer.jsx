import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function FormAnswer() {
    // Each form field should be controlled by a state variable
    const [text, setText] = useState("");
    const [email, setEmail] = useState("");
    const [date, setDate] = useState("");

    // Form submission handler
    const handleSubmit = () => {
        // something
    }

    // Form reset handler
    const handleReset = () => {
        setText("");
        setEmail("");
        setDate("");
    }

    return (
        <Form onSubmit={handleSubmit} onReset={handleReset}>
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
            <Button variant="primary" type="submit" className="me-2">Add</Button>
            <Button variant="danger" type="reset">Cancel</Button>
        </Form>
    );
}

export default FormAnswer;