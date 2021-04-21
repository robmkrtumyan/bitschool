import types from '../actionTypes'

const initialState = {
    tasks: [],
    deleteLoader: null,
    openToggleModal: false,
    openToggleConfirm: false,
    selectedTasks: new Set(),
    oneSelectedTask: null,
    editTask: null
}

const todoReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.SET_TASKS: {
            return {
                ...state,
                tasks: action.data
            }
        }

        case types.DELETE_ONE_TASK: {
            let tasks = [...state.tasks]
            tasks = tasks.filter(task => task._id !== action._id)
            return {
                ...state,
                tasks
            }
        }

        case types.DELETE_LOADER_SPINNER: {
            return {
                ...state,
                deleteLoader: action._id
            }
        }

        case types.TOGGLE_OPEN_TASK_MODAL: {
            return {
                ...state,
                openToggleModal: !state.openToggleModal
            }
        }

        case types.ADD_TASK: {
            const tasks = [...state.tasks]
            tasks.push(action.data)
            return {
                ...state,
                tasks,
                openToggleModal: false
            }
        }

        case types.OPEN_TOGGLE_CONFIRM: {
            const {
                selectedTasks,
                tasks
            } = state
            let oneSelectedTask = null
            if (selectedTasks.size === 1) {
                oneSelectedTask = tasks.find(task => task._id === Array.from(selectedTasks)[0])
            }

            return {
                ...state,
                oneSelectedTask,
                openToggleConfirm: !state.openToggleConfirm
            }
        }

        case types.TOGGLE_SELECTED_TASKS: {
            const {
                _id
            } = action
            let selectedTasks = new Set(state.selectedTasks)
            if (!selectedTasks.has(_id)) {
                selectedTasks.add(_id)
            } else {
                selectedTasks.delete(_id)
            }
            return {
                ...state,
                selectedTasks
            }
        }

        case types.DELETE_CHECKED_TASKS: {
            let tasks = [...state.tasks]
            tasks = tasks.filter(task => !state.selectedTasks.has(task._id))
            return {
                ...state,
                selectedTasks: new Set(),
                tasks
            }
        }

        case types.CHECK_ALL: {
            const {
                tasks
            } = state
            let selectedTasks = new Set(state.selectedTasks)
            if (tasks.length === selectedTasks.size) {
                selectedTasks.clear()
            } else {
                tasks.forEach(task => {
                    selectedTasks.add(task._id)
                })
            }
            return {
                ...state,
                selectedTasks
            }
        }

        case types.SET_EDIT_TASK: {
            return{
                ...state,
                editTask: action.editableTask ?? null
            }
        }

        case types.EDIT_TASK: {
            const {data} = action
            const tasks = [...state.tasks]
            const index = tasks.findIndex(task => task._id === data._id)
            tasks[index] = data
            return {
                ...state,
                tasks,
                editTask: null
            }
        }
        default:
            return state
    }
}

export default todoReducer;