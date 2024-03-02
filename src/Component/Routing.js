import React from 'react';
import{BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './Home'
import {Fav} from './Fav'
import { Cart } from './Cart';
import { Detail } from './Detail';
import {useSelector} from 'react-redux'
import {Login} from './Login'

export const Routing = ()=>{
    const state = useSelector((ram)=>ram.data)
    console.log(state)
    return(
        <div>
            <BrowserRouter>
            {state.isAuth ?  <Routes>
                <Route path="/" element={<Home/>}></Route>
                <Route path="/fav" element={<Fav/>}></Route>
                <Route path="/cart" element={<Cart/>}></Route>
                <Route path="/prodetail" element={<Detail/>}></Route>
            </Routes> : <Routes> <Route path="/" element={<Login/>}> </Route> </Routes>}
            </BrowserRouter>
        </div>
    )
}