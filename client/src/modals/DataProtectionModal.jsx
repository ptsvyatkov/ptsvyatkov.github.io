import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function DataProtectionModal(props) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header className="bg-green-400">
                <Modal.Title id="contained-modal-title-vcenter">
                    Data Protection
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <p>
                    Privacy policy
                    Personal data (hereinafter referred to as "data" for the most part) are processed by us only as necessary and for the purpose of providing a functional and user-friendly website, including its content and the services offered there.<br/>
                    <br/>
                    In accordance with Art. 4 no. 1. of Regulation (EU) 2016/679, i.e. the General Data Protection Regulation (hereinafter referred to only as "GDPR"), "processing" shall mean any operation or set of operations which is performed upon personal data, whether or not by automated means, such as collection, recording, organization, arrangement, storage, adaptation or alteration, retrieval, consultation, use, disclosure by transmission, dissemination or otherwise making available, alignment or combination, restriction, erasure or destruction.<br/>
                    <br/>
                    With the following privacy policy, we inform you in particular about the nature, scope, purpose, duration and legal basis of the processing of personal data, insofar as we decide either alone or jointly with others on the purposes and means of processing. In addition, we inform you below about the third-party components used by us for optimization purposes as well as to increase the quality of use, insofar as third parties process data through this, again under their own responsibility.<br/>
                </p>
            </Modal.Body>
            <Modal.Footer>
                <Button className="bg-green-400 border-0 hover:bg-green-400" onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default DataProtectionModal;