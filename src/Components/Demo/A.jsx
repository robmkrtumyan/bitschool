import React from 'react'
import {connect} from 'react-redux'


const A = (props) => {
    const {counter, plus, minus} = props
    return (
        <div>
            <div style={{color: "red"}}>
                {counter}
            </div>
            <button onClick={plus}>+</button>
            <button onClick={minus}>-</button>
        </div>
    )
}

const mapStateToProps = (state) => {
    return{
        counter: state.counter
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        plus: () => {
            dispatch({type: "plus"})
        },
        minus: () => {
            dispatch({type: 'minus'})
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(A);
