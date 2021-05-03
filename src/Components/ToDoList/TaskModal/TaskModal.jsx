import React, { useRef, useEffect } from 'react'
import { Modal, Form, FormControl, Button } from 'react-bootstrap'
import PropTypes from 'prop-types'
import DatePicker from 'react-datepicker'
import { connect } from 'react-redux'
import {changeModalInputThunk, changeModalDateThunk, editModalTaskThunk, resetModalTaskThunk} from '../../Redux/action'

const TaskModal = (props) => {
    const { 
        editTask, 
        changeModalInputThunk, 
        changeModalDateThunk, 
        editModalTaskThunk, 
        resetModalTaskThunk,
        onSubmit,
        onHide
    } = props

    const {
        title, 
        description, 
        date
    } = props.state

    const inputFocus = useRef(null)

    useEffect(() => {
        editTask && editModalTaskThunk(editTask)
        inputFocus.current.focus()
        return() => {
            resetModalTaskThunk()
        }
    }, [editModalTaskThunk, editTask,resetModalTaskThunk])

    const addHandler = (event) => {
        const {key, type} = event

        if(!title || !description || (type === "keypress" && key !== "Enter"))
            return
        
        const formData = {
            ...props.state,
            date: date.toISOString(date).slice(0, 10)
        }
        
        onSubmit(formData)
        onHide()
    }

    return (
        <Modal
            show={true}
            onHide={onHide}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    {editTask ? "Edit Task" : "Add Task"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <Form className="mb-3" onSubmit={e => e.preventDefault()}>
                <Form.Group>
                    <FormControl
                        name="title"
                        ref={inputFocus}
                        className="new-task"
                        placeholder="Add Title"
                        onKeyPress={addHandler}
                        onChange={(e) => changeModalInputThunk(e.target)}
                        value={title}
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Control 
                        name="description"
                        style={{resize: "none"}}
                        placeholder="Description"
                        onKeyPress={addHandler}
                        value={description}
                        onChange={(e) => changeModalInputThunk(e.target)}
                        as="textarea" 
                        rows={3} 
                    />
                </Form.Group>
                <Form.Group>
                    <DatePicker 
                        selected={date} 
                        onChange={date => changeModalDateThunk(date)}
                    />
                </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
            <Button onClick={(event) => onHide()} variant="secondary">Close</Button>
                <Button 
                    variant="primary"
                    onClick={addHandler}
                    disabled={!title || !description}
                >
                    {editTask ? "Save": "Add Task"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

TaskModal.propType = {
    onHide: PropTypes.func.isRequired,
    editTask: PropTypes.object,
    onSubmit: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
    return{
        state: state.taskModalState
    }
}

const mapStateToDispatch = {
    changeModalInputThunk,
    changeModalDateThunk,
    editModalTaskThunk,
    resetModalTaskThunk
}

export default connect(mapStateToProps, mapStateToDispatch)(TaskModal)
