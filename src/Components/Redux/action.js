import types from './actionTypes'
const API_HOST = "http://localhost:3001"


export function setTasksThunk(dispatch){
    dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: true })
    fetch(`${API_HOST}/task`)
    .then(res => res.json())
    .then(data => {
        if(data.error)
            throw data.error

        dispatch({ type: types.SET_TASKS, data })
    })
    .catch(error => {
        console.log("Error", error)
    })
    .finally(() => {
        dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: false })
    })
} 

export const addTaskThunk = (dispatch, formData) => {
        dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: true })
        fetch(`${API_HOST}/task`, {
            method:"POST",
            body:JSON.stringify(formData),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            dispatch({type: types.ADD_TASK, data})
        })
        .catch(error => {
            console.log("Error", error)
        })
        .finally(() => {
            dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: false })
        })
}

export const deleteTaskThunk = (dispatch, _id) => {
        (async () => {
            dispatch({ type: types.DELETE_LOADER_SPINNER, _id})
            try{
                const response = await fetch(`${API_HOST}/task/${_id}`, {
                    method: "DELETE"
                })

                const data = await response.json()

                if(data.error) throw data.error
                
                dispatch({ type: types.DELETE_ONE_TASK, _id })
            }
            catch(error){
                console.log("Error request", error)
            }
            finally{
                dispatch({ type: types.DELETE_LOADER_SPINNER, _id: null})
            }
        })()
}

export const deleteCheckedHandlerTasksThunk = (dispatch, selectedTasks) => {
        dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: true })
        fetch(`${API_HOST}/task`, {
            method:"PATCH",
            body:JSON.stringify({ tasks: Array.from(selectedTasks) }),
            headers: {
                "Content-Type": "application/json"
            }
        })
        .then(res => res.json())
        .then(data => {
            if(data.error)
                throw data.error
            dispatch({ type: types.DELETE_CHECKED_TASKS })
        })
        .catch(error=>{
            console.log("Error", error)
        })
        .finally(() => {
            dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: false })
        })
}


export const editTaskHandlerThunk = (dispatch, editTask) => {
    (async () => {
        dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: true })
        try{
            const { _id } = editTask
            const response = await fetch(`${API_HOST}/task/${_id}`, {
                method: "PUT",
                body: JSON.stringify(editTask),
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await response.json()
            if(data.error)
                throw data.error
            dispatch({ type: types.EDIT_TASK, data })
        }
        catch(error) {
            console.log("Error", error)
        }
        finally{
            dispatch({ type: types.TURN_ON_OFF_LOADING, isLoading: false })
        }            
    })()
}