import React, { useState } from 'react'
import {contactContext} from '../context'
import { isRequire, max, min, emailValidation } from '../../utils/validators'
import { withRouter } from 'react-router-dom'
const API_HOST = "http://localhost:3001"

const maxLength30 = max(30)
const minLength3 = min(3)

const ContactProvider = (props) => {
    const[formData, setFormData] = useState({
        email: {
            valid: false,
            error: null,
            value: ""
        },
        name: {
            valid: false,
            error: null,
            value: ""
        },
        message: {
            valid: false,
            error: null,
            value: ""
        }
    })

    const[loading, setLoading] = useState(false)
    
    const changeHandler = (event) => {
        const {name, value} = event.target
        let valid = true
        let error = isRequire(value) || maxLength30(value) || minLength3(value) || (name === "email" && emailValidation(value));
        if(error){
            valid = false
        }

        setFormData({
            ...formData,
            [name]: {
                valid: valid,
                error: error,
                value: value
            }
        })
    }

    const sendFormHandler = () => {
        const formDetails = {...formData}
        for(let key in formDetails){
            if(typeof formDetails[key] === "object" && formDetails[key].hasOwnProperty("value")){
                formDetails[key] = formDetails[key].value
            } else{
                delete formDetails[key]
            }
        }

        setLoading(true)

        fetch(`${API_HOST}/form`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formDetails)
        })
        .then(res=>res.json())
        .then(data=>{
            if(data.error)
                throw data

            props.history.push('/')
        })
        .catch(error=>{
            setLoading(false)
            console.log(error)
        })
    }

    return <contactContext.Provider
                value={{
                    formData: formData,
                    changeHandler: changeHandler,
                    sendFormHandler: sendFormHandler,
                    loading: loading
                }}
            >
                {props.children}
            </contactContext.Provider>
}

export default withRouter(ContactProvider)
