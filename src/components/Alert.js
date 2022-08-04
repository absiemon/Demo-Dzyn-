import React from 'react'

export const Alert= (props)=> {
  return (

    props.alert && 
        <div id ="my-alert" className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
            <strong>{props.alert.type}</strong> : {props.alert.msg}
            
        </div>

  )
}
