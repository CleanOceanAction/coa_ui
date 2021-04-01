import "./Popup.css"
import React, {useState} from 'react';
import { Button, Modal, ToggleButton } from 'react-bootstrap';

function Popup({
    show, onHide, title, body,
    showSubmit = true, submitDisabled = false, submitText, onSubmit,
    showAddAnother = false, defaultAddAnother = false}) {
    const [addAnother, setAddAnother] = useState(!!defaultAddAnother);

    const onSubmitClicked = () => {
        onSubmit(!addAnother);
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
                {showSubmit ? 
                    <Button disabled={submitDisabled} variant="primary" onClick={onSubmitClicked}>
                        {submitText}
                    </Button>
                : ""}
                <Button variant="secondary" onClick={onHide}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
  
function PopupWarning({show, warning, onHide}) {
    return(
        <Popup
            show={show}
            title="Warning"
            body={warning}
            onHide={onHide}
            showSubmit={false}
        />
    );
}

export {
    Popup as default,
    Popup,
    PopupWarning
};

