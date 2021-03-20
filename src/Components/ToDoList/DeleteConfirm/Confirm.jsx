import {Modal, Button} from 'react-bootstrap'
import PropTypes from 'prop-types'

const Confirm = (props) => {
    const { onHide, deleteConfirm, taskCountOrTitle } = props
    const deleteConfirmed = () => {
        deleteConfirm()
        onHide()
    }
    return(
        <Modal show={true} onHide={onHide} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Do you want to delete selected {taskCountOrTitle} of Tasks?</Modal.Title>
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

Confirm.propTypes = {
    onHide: PropTypes.func.isRequired,
    deleteConfirm: PropTypes.func.isRequired,
    taskCountOrTitle: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}

export default Confirm