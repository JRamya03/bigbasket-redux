import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateAuth } from "./Store/Slice";

export const Login = ()=>{
    
    const state = useSelector((ram)=>ram.data)
    console.log(state)
    let dispatch = useDispatch()
    const submit =()=>{
        dispatch(UpdateAuth(true))
    }
    return (
        <div>
            <form>
                <p class="auth">Authentication</p>
                <div className="username">
                <input classtype="text" placeholder="username"/>
                </div>
                <div className="username">
                <input type="text" placeholder="password"/>
                </div>
                <button class="auth-btn" onClick={submit}>submit </button>
                <p style={{paddingTop:"20px",color:"red", fontWeight:"bold"}}> Enter username & password = 12</p>
            </form>
        </div>
    )
}