import types from './actionTypes'
const API_HOST = process.env.REACT_APP_API_URL


export function setTasksThunk(dispatch) {
    dispatch({
        type: types.TURN_ON_OFF_LOADING,
        isLoading: true
    })
    fetch(`${API_HOST}/task`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error

            dispatch({
                type: types.SET_TASKS,
                data
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })
        .finally(() => {
            dispatch({
                type: types.TURN_ON_OFF_LOADING,
                isLoading: false
            })
        })
}

export const addTaskThunk = (dispatch, formData) => {
    dispatch({
        type: types.TURN_ON_OFF_LOADING,
        isLoading: true
    })
    fetch(`${API_HOST}/task`, {
            method: "POST",
            body: JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({
                type: types.ADD_TASK,
                data
            })
            dispatch({
                type: types.SUCCESS_MESSAGE,
                successMessage: "Task was added successfully"
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })
        .finally(() => {
            dispatch({
                type: types.TURN_ON_OFF_LOADING,
                isLoading: false
            })
        })
}

export const deleteTaskThunk = (_id, history = null) => async (dispatch) => {
    try {
        dispatch({
            type: types.DELETE_LOADER_SPINNER,
            _id
        })
        const response = await fetch(`${API_HOST}/task/${_id}`, {
            method: "DELETE"
        })

        const data = await response.json()

        if (data.error) throw data.error

        if (history) {
            history.push('/')
        } else {
            dispatch({
                type: types.DELETE_ONE_TASK,
                _id
            })
            dispatch({
                type: types.SUCCESS_MESSAGE,
                successMessage: "Tasks was deleted successfully"
            })
        }
    } catch (error) {
        dispatch({
            type: types.SET_ERROR_MESSAGE,
            error: error.message
        })
    } finally {
        dispatch({
            type: types.DELETE_LOADER_SPINNER,
            _id: null
        })
    }
}

export const deleteCheckedHandlerTasksThunk = (dispatch, selectedTasks) => {
    dispatch({
        type: types.TURN_ON_OFF_LOADING,
        isLoading: true
    })
    fetch(`${API_HOST}/task`, {
            method: "PATCH",
            body: JSON.stringify({
                tasks: Array.from(selectedTasks)
            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({
                type: types.DELETE_CHECKED_TASKS
            })
            dispatch({
                type: types.SUCCESS_MESSAGE,
                successMessage: "Checked Task were removed successfully"
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })
        .finally(() => {
            dispatch({
                type: types.TURN_ON_OFF_LOADING,
                isLoading: false
            })
        })
}


export const editTaskHandlerThunk = (editTask, page = "todo") => (dispatch) => {
    (async () => {
        dispatch({
            type: types.TURN_ON_OFF_LOADING,
            isLoading: true
        })
        try {
            const {
                _id
            } = editTask
            const response = await fetch(`${API_HOST}/task/${_id}`, {
                method: "PUT",
                body: JSON.stringify(editTask),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if (data.error)
                throw data.error

            if (page === "todo") {
                dispatch({
                    type: types.EDIT_TASK,
                    data
                })
                dispatch({
                    type: types.SUCCESS_MESSAGE,
                    successMessage: "Task was edited successfully"
                })
            } else if (page === "singleTask") {
                dispatch({
                    type: types.SET_SINGLE_TASK,
                    data
                })
                dispatch({
                    type: types.SUCCESS_MESSAGE,
                    successMessage: "Task was edited successfully"
                })
            } else {
                throw new Error("Error from Edit Task")
            }

        } catch (error) {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        } finally {
            dispatch({
                type: types.TURN_ON_OFF_LOADING,
                isLoading: false
            })
        }
    })()
}

export const setSingleTaskThunk = (id, history) => (dispatch) => {
    fetch(`${API_HOST}/task/${id}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({
                type: types.SET_SINGLE_TASK,
                data
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
            history.push(`/error/${error.status}`, error.message)
        })
}

export const toggleSingleTaskEdit = () => (dispatch) => {
    dispatch({
        type: types.TOGGLE_SINGLE_TASK_EDIT
    })
}

export const changeContactFormHandlerThunk = (target) => (dispatch) => {
    dispatch({
        type: types.CONTACT_FORM_CHANGE_HANDLER,
        target
    })
}

export const sendFormHandlerThunk = (formData, history) => (dispatch) => {
    const formDetails = {
        ...formData
    }
    for (let key in formDetails) {
        if (typeof formDetails[key] === "object" && formDetails[key].hasOwnProperty("value")) {
            formDetails[key] = formDetails[key].value
        } else {
            delete formDetails[key]
        }
    }

    dispatch({
        type: types.TURN_ON_OFF_LOADING,
        isLoading: true
    })

    fetch(`${API_HOST}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDetails)
        })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data

            dispatch({
                type: types.SUCCESS_MESSAGE,
                successMessage: "Form was sent successfully"
            })
            history.push('/')
        })
        .catch(error => {
            dispatch({
                type: types.TURN_ON_OFF_LOADING,
                isLoading: false
            })
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })
}

export const toggleStatusThunk = (task) => (dispatch) => {
    const status = task.status === "done" ? "active" : "done"
    fetch(`${API_HOST}/task/${task._id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                status
            })
        })
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error
            dispatch({
                type: types.EDIT_TASK,
                data
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })
}

export const setDropDownItems = (dropDown, value) => (dispatch) => {
    dispatch({
        type: types.SET_DROPDOWN_VARIANT,
        dropDown,
        value
    })

}

export const changeSearchThunk = (target) => (dispatch) => {
    dispatch({
        type: types.SEARCH_VALUE,
        target
    })
}

export const searchDateThunk = (name, date) => (dispatch) => {
    dispatch({
        type: types.SEARCH_DATE,
        name,
        date
    })
}

export const searchOrFilterThunk = (formData) => (dispatch) => {
    let formDataFilter = {...formData}
    window.formDataFilter = formDataFilter
    let query = "?"
    for(let key in formDataFilter){
        if(!formDataFilter[key]) delete formDataFilter[key]
        else{
            query += key + "=" + formDataFilter[key] + "&"
        }
    }

    if(Object.keys(formDataFilter).length){
        fetch(`${API_HOST}/task${query.slice(0, query.length - 1)}`)
        .then(res => res.json())
        .then(data => {
            if (data.error)
                throw data.error

            dispatch({
                type: types.SET_TASKS,
                data
            })
            dispatch({
                type: types.SEARCH_RESET
            })
        })
        .catch(error => {
            dispatch({
                type: types.SET_ERROR_MESSAGE,
                error: error.message
            })
        })        
    }
}

export const changeModalInputThunk = (target) => (dispatch) => {
    dispatch({type: types.CHANGE_MODAL_INPUT, target})
}

export const changeModalDateThunk = (date) => (dispatch) => {
    dispatch({type: types.CHANGE_MODAL_DATE, date})
}

export const editModalTaskThunk = (editTask) => (dispatch) => {
    dispatch({ type: types.EDIT_MODAL_TASK, editTask })
}

export const resetModalTaskThunk = () => (dispatch) => {
    dispatch({ type: types.RESET_MODAL_TASK })
}