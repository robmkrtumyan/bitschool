import {Modal, Button} from 'react-bootstrap'

const Confirm = (props) => {
    const { onHide, deleteConfirm, count } = props
    const deleteConfirmed = () => {
        deleteConfirm()
        onHide()
    }
    return(
        <Modal show={true} onHide={onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete selected {count} of Tasks?</Modal.Title>
            </Modal.Header>
            <Modal.Footer>
                <Button variant="secondary" onClick={onHide}>
                    Cancel
                </Button>
                <Button variant="danger" onClick={deleteConfirmed}>
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default Confirm