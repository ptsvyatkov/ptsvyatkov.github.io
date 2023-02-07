import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function AboutUsModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-green-400">
                <Modal.Title id="contained-modal-title-vcenter">
                    About Us
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                    About us
                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry’s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-green-400 border-0 hover:bg-green-400" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AboutUsModal;