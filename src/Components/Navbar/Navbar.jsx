import React from 'react'
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import About from '../About/About'
import Contact from '../Contact/Contact'
import ToDoList from '../ToDoList/ToDoList'
import NotFound from '../NotFound/NotFound'
import styles from './Navbar.module.css'
import SingleTask from '../SingleTask/SingleTask';

const routingItems = [
    {
        path: '/',
        component: ToDoList,
        exact: true
    },
    {
        path: '/about',
        component: About,
        exact: true
    },
    {
        path: '/contact',
        component: Contact,
        exact: true
    },
    {
        path: '/task/:id',
        component: SingleTask,
        exact: true
    },
    {
        path: '/404',
        component: NotFound,
        exact: true
    },
]

const items = [
    {
        to: '/',
        title: 'Home'
    },
    {
        to: '/about',
        title: 'About'
    },
    {
        to: '/contact',
        title: 'Contact'
    }
]
function NavbarMenu() {
    const navItems = items.map((item, index) => {
        return(
            <Nav.Item className={styles.link} key={index}>
                <NavLink to={item.to}>
                    {item.title}
                </NavLink>
            </Nav.Item>
        )
    })
    const routingItem = routingItems.map((item, index) => {
        return(
            <Route key={index} path={item.path} exact={item.exact}  component={item.component} />
        )        
    })
    return (
            <>
                <Nav className="justify-content-center" activeKey="/home">
                    {navItems}
                </Nav>
                <Switch>
                    {routingItem}
                    <Redirect to="/404" component={NotFound} />
                </Switch>
            </>
    )
}

export default NavbarMenu
