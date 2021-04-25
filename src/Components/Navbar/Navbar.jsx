import React, {useEffect} from 'react'
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Nav } from 'react-bootstrap'
import About from '../About/About'
import Contact from '../Contact/Contact'
import ToDoList from '../ToDoList/ToDoList'
import NotFound from '../NotFound/NotFound'
import styles from './Navbar.module.css'
import SingleTask from '../SingleTask/SingleTask';
import SingleTaskProvider from '../Context/Provider/SingleTaskProvider';
import {connect} from 'react-redux'
import {ToastContainer, toast} from 'react-toastify'

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
const NavbarMenu = (props) => {
    const {errorMessage, successMessage} = props
    useEffect(() => {
        errorMessage && toast.error(`🦄 ${errorMessage}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }, [errorMessage])

    useEffect(() => {
        successMessage && toast.success(`🦄 ${successMessage}`, {
            position: "bottom-left",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
    }, [successMessage])

    const navItems = items.map((item, index) => {
        return(
            <Nav.Item className={styles.link} key={index}>
                <NavLink to={item.to}  className={styles.navbarLinks}>
                    {item.title}
                </NavLink>
            </Nav.Item>
        )
    })
    const routingItem = routingItems.map((item, index) => {
        if(item.path === "/task/:id"){
            return <Route 
                key={index} 
                path={item.path} 
                exact={item.exact}  
                render={(props) => (
                    <SingleTaskProvider {...props}>
                        <item.component {...props} />
                    </SingleTaskProvider>
                )} />
        }
    return (
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

            <ToastContainer />
        </>
    )
}

const mapStateToProps = (state) => ({
    errorMessage: state.globalState.errorMessage,
    successMessage: state.globalState.successMessage
})

export default connect(mapStateToProps, null)(NavbarMenu)
