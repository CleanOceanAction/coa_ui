import "./Popup.css"
import React, {useState} from 'react';
import { Button, Modal, ToggleButton } from 'react-bootstrap';

export default function Popup({
    show, onHide, title, body,
    submitDisabled, submitText, onSubmit,
    showAddAnother = false, defaultAddAnother = false}) {
    const [addAnother, setAddAnother] = useState(!!defaultAddAnother);

    const onSubmitClicked = () => {
        onSubmit();
        if (!addAnother) {
            onHide();
        }
    }

    return(
        <Modal show={show} onHide={onHide}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {body}
            </Modal.Body>
            <Modal.Footer>
                {showAddAnother ?
                <ToggleButton
                    type="checkbox"
                    variant="primary"
                    checked={addAnother}
                    value="1"
                    onChange={(e) => setAddAnother(e.currentTarget.checked)}
                >Add Another</ToggleButton>
                : ""}
                <Button disabled={submitDisabled} variant="primary" onClick={onSubmitClicked}>
                    {submitText}
                </Button>
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
  
