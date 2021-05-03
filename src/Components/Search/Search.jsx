import React from 'react'
import { DropdownButton, Dropdown, Form, Button, Row, Col } from 'react-bootstrap'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './Search.css'
import DatePicker from "react-datepicker";
import { connect } from 'react-redux'
import { setDropDownItems, changeSearchThunk, searchDateThunk, searchOrFilterThunk } from '../Redux/action'

const sortData = [
    {
        label: "A-Z",
        value: "a-z"
    },
    {
        label: "Z-A",
        value: "z-a"
    },
    {
        label: "Created Date Oldest",
        value: "creation_date_oldest"
    },
    {
        label: "Creation Date Newest",
        value: "creation_date_newest"
    },
    {
        label: "Completion Date Oldest",
        value: "completion_date_oldest"
    },
    {
        label: "Completion Date Newest",
        value: "completion_date_newest"
    },
    {
        label: "Reset",
        value: ""
    }
]

const sortStatus = [
    {
        label: "Done",
        value: "done"
    },
    {
        label: "Active",
        value: "active"
    },
    {
        label: "Reset",
        value: ""
    } 
]

const Search = (props) => {
    const {
        setDropDownItems, 
        changeSearchThunk,
        searchDateThunk,
        searchOrFilterThunk
    } = props  
    const { 
        sort, 
        search,
        status,
        create_lte,
        create_gte,
        complete_lte,
        complete_gte
    } = props.state
    const sortItems = sortData.map((item, index) => {
        return (
            <Dropdown.Item key={index} onClick={() => setDropDownItems("sort", item.value)}>
                {item.label}
            </Dropdown.Item>
        )
    })

    const statusItems = sortStatus.map((item, index) => {
        return (
            <Dropdown.Item key={index} onClick={() => setDropDownItems("status", item.value)}>
                {item.label}
            </Dropdown.Item>
        )
    })

    return (
        <>
            <Form className="search" onSubmit={e => e.preventDefault()}>
                <div className="search_wrapper">
                    <input type="checkbox" id="check" />
                    <Form.Group className="box">
                        <Form.Control 
                            name="search"
                            value={search}
                            type="search" 
                            placeholder="Search Here..."
                            onChange={e => changeSearchThunk(e.target)}
                        />
                        <Form.Label htmlFor="check">
                            <FontAwesomeIcon icon={faSearch} />
                        </Form.Label>
                    </Form.Group>
                </div>
            <div className="d-flex justify-content-center dropdown_items">
                <DropdownButton
                    title={sort ? sortData.find(i => i.value === sort).label : "Sort"} 
                    variant="info"
                >
                    {sortItems}
                </DropdownButton>
                <DropdownButton 
                    title={status ? sortStatus.find(i => i.value === status).label : "Status"} 
                    variant="info" 
                    className="ml-3"
                >
                    {statusItems}
                </DropdownButton>
            </div>
            <Row>
                <Col xs={12} md={12} sm={12}>
                    <Form.Group>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <h3 className="datepicker_title">
                                    Created Late
                                </h3>
                            </Col>
                            <Col xs={8} md={8} sm={8}>
                                <DatePicker
                                    className="datepicker_widget"
                                    placeholderText="Please select a date"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="HH:mm,d MMMM yyyy"
                                    selected={create_lte}
                                    onChange={date => searchDateThunk("create_lte", date)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col xs={12} md={12} sm={12}>
                    <Form.Group>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <h3 className="datepicker_title">
                                    Created Greater
                                </h3>
                            </Col>
                            <Col xs={8} md={8} sm={8}>
                                <DatePicker
                                    className="datepicker_widget"
                                    placeholderText="Please select a date"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="HH:mm,d MMMM yyyy"
                                    selected={create_gte}
                                    onChange={date => searchDateThunk("create_gte", date)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col xs={12} md={12} sm={12}>
                    <Form.Group>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <h3 className="datepicker_title">
                                    Completed Late
                                </h3>
                            </Col>
                            <Col xs={8} md={8} sm={8}>
                                <DatePicker
                                    className="datepicker_widget"
                                    placeholderText="Please select a date"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="HH:mm,d MMMM yyyy"
                                    selected={complete_lte}
                                    onChange={date => searchDateThunk("complete_lte", date)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col xs={12} md={12} sm={12}>
                    <Form.Group>
                        <Row>
                            <Col xs={4} md={4} sm={4}>
                                <h3 className="datepicker_title">
                                    Complete Greator
                                </h3>
                            </Col>
                            <Col xs={8} md={8} sm={8}>
                                <DatePicker
                                    className="datepicker_widget"
                                    placeholderText="Please select a date"
                                    showTimeSelect
                                    timeFormat="HH:mm"
                                    timeIntervals={60}
                                    dateFormat="HH:mm,d MMMM yyyy"
                                    selected={complete_gte}
                                    onChange={date => searchDateThunk("complete_gte", date)}
                                />
                            </Col>
                        </Row>
                    </Form.Group>
                </Col>
                <Col xs={12} md={12} sm={12} className="d-flex justify-content-center">
                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={() => searchOrFilterThunk(props.state)}>
                            Submit
                        </Button>
                    </Form.Group>
                </Col>
                
            </Row>
        </Form>
        </>
    )
}

const mapStateToProps = (state) => {
    return{ 
        state: state.searchState
    }
}

const mapDispatchToProps = {
    setDropDownItems,
    changeSearchThunk,
    searchDateThunk,
    searchOrFilterThunk
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
