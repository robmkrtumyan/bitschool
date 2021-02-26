import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import './Task.css'

function Task(props) {
    const {task} = props
    return (
        <Container>
            <Row>
                <Col>
                    <div className="box task-box">
                        <h3>{task}</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}

export default Task
