import React, { useCallback, useState } from 'react'
import {singleTaskContext} from '../context'

const API_HOST = "http://localhost:3001"

const SingleTaskProvider = (props) => {
    const[singleTask, setSingleTask] = useState(null)
    const[editTask, toggleEditTask] = useState(false)
    const[loading, setLoading] = useState(false)

    const editSingleTask = useCallback((editTask) => {
        setLoading(true)
        fetch(`${API_HOST}/task/${editTask._id}`, {
            method: "PUT",
            body: JSON.stringify(editTask),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error) throw data.error
            
            toggleEditTask(false)
            setSingleTask(data)
        })
        .catch(error => {
            console.log("Error", error)
        })
        .finally(() => {
            setLoading(false)
        })
    }, [])

    const deleteSingleTask = useCallback(() => {
        setLoading(true)
        const {_id} = singleTask
        fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            props.history.push("/")
        })
        .catch(error => {
            setLoading(false)
            console.log("Error", error)
        })      
    }, [singleTask, props.history])

    const getSingleTask = useCallback(() => {
        const {id} = props.match.params
        fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            setSingleTask(data)
        })
        .catch(error => {
            console.log("single task error", error)
            props.history.push(`/error/${error.status}`, error.message)
        })
    },[props.match.params, props.history])

    return (
        <singleTaskContext.Provider
            value={{
                singleTask,
                editTask,
                loading,
                editSingleTask,
                toggleEditTask,
                deleteSingleTask,
                getSingleTask
            }}
        >
            {props.children}
        </singleTaskContext.Provider>
    )
}

export default SingleTaskProvider
