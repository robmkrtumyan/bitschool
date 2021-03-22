import React from 'react'
import { BrowserRouter, Route, NavLink, Switch } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import About from '../About/About'
import Contact from '../Contact/Contact'
import ToDoList from '../ToDoList/ToDoList'
import styles from './Navbar.module.css'

function NavbarMenu() {
    return (
        <BrowserRouter>
            <>
            <Nav className="justify-content-center" activeKey="/home">
                <Nav.Item className={styles.link}>
                    <NavLink to="/">Home</NavLink>
                </Nav.Item>
                <Nav.Item className={styles.link}>
                    <NavLink to="/about">About</NavLink>
                </Nav.Item>
                <Nav.Item className={styles.link}>
                    <NavLink to="/contact">Contact</NavLink>
                </Nav.Item>
            </Nav>
            </>
            <Switch>
                <Route path='/' exact component={ToDoList} />
                <Route path="/about" exact component={About}  />
                <Route path="/contact" exact component={Contact}  />
            </Switch>
        </BrowserRouter>
    )
}

export default NavbarMenu
