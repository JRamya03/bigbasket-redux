import {React,useState,useEffect} from "react";
import { UpdateName } from "./Store/Slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { IoIosArrowDown } from "react-icons/io";
import { FaHome } from "react-icons/fa";

import {  FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./Sass/S.scss"
//state=> useSelector()
//dispatch => useDispatch()
export const Fav = ()=>{
  const state = useSelector((ram)=>ram.data)   // slice.js 
  //console.log(state)
  const[fav1,setfav1] = useState([])
  const nav = useNavigate()
  const prodetail=(id)=>{
   nav(`/prodetail?id=${id}`)
    }
  let dispatch = useDispatch()
    

  useEffect(()=>{
    let b = state.arr.filter((v,i)=>{
        return v.isfav===true
    })
    //console.log(b)
    setfav1(b)
},[fav1])
  const dropDown=(id)=>
  {
    let c=state.arr.map((v,i)=>{
     return v.id === id ? {...v,isweight:!v.isweight} : v
    })
    dispatch(UpdateName(c))
  } 
  const show=(v,ind,id)=>{
   let d=state.arr.map((e,l)=>{
    return e.id === id ? {...e, weight:v.kg, price:v.price, offer:v.offer, isweight:false,
      weight1:e.weight1.map((e1,l1)=>{return l1===ind?{...e1,isactive:true}:{...e1,isactive:false}})}: e
   })
   dispatch(UpdateName(d))
  } 

  const fav =(id)=>{
   //console.log(id)
   let a = state.arr.map((v,i)=>{
     return id===v.id?{...v,isfav:!v.isfav}:v
   })
   dispatch(UpdateName(a))
 }
 const addToCart=(id)=>{
   // console.log("cart")
   let b = state.arr.map((v,i)=>{
     return v.id===id?{...v,iscart:true}:v
   })
   dispatch(UpdateName(b))
 }
 const sub = (id) => {
   let updatedArr = state.arr.map((v) => {
     if (v.id === id && v.count > 1) {
       return { ...v, count: v.count - 1 };
     } else if (v.id === id && v.count<=1){
       return {...v,iscart:false}
     }else{
       return v
     }
   });
   dispatch( UpdateName(updatedArr) );
 };
 
   const add =(id)=>{
     // console.log("sub")
     let d= state.arr.map((v,i)=>{
       if( v.count>=10 ){
         alert("you cant add more than 10 items")
         return v
       } else{
       return (v.id === id) ? {...v,count:v.count+1 } : v  
       }
     })
     //console.log(d)
     dispatch(UpdateName(d))
   }
    return(
      <div>
      <div>
      <div className="nav-header">
      <div className="container">
             <div className="nav-row">
              <div className="logo-col" > 
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3xOZrREto9WNjqxVOjZy4D7m7ByimftjKg&usqp=CAU" alt="logo"/>
              </div>
              
              <div className="nav-link">
              {/* <Link to="/"> <FaRegHeart /> </Link> */}
              <Link to="/cart"> <TiShoppingCart /> </Link>
              <Link to="/"> <FaHome /> </Link>
              </div>
             </div>
             
      </div>
  </div>
      
      <div class="container pt-5">
      <h1 class="mt-5 text-danger">Wishlists</h1>
  <div class="row pt-3">
    {fav1.map((val, i) => {
      return (
        <div class="col-lg-3 col-md-4 col-sm-6 col-xs-12 mb-4" key={i}>
          <div class="card card2">
            <div onClick={() => prodetail(val.id)}>
              <img src={val.image} class="card-img-top" alt="veg" />
            </div>
            <div class="card-body" style={{position:"relative"}}>
              <h5 class="card-title">{val.name}</h5>
              <p onClick={() => dropDown(val.id)} class="card-text" style={{border: "solid 1px grey", boxShadow: "grey 0 0 10px", cursor: "pointer",justifyContent:"space-around"}}>
                {val.weight}
                <IoIosArrowDown />
                {/* <select  style={{border:"none"}}> </select> */}
              </p>
              {val.isweight ? (
                <div class="bg" style={{position:"absolute", zIndex:"10", width:"90%"}}>
                  {val.weight1.map((v, ind) => {
                    return (
                      <div style={{ backgroundColor: "white" }}>
                        <div class="weight" style={{ border: v.isactive ? "solid 2px green" : "solid 1px grey" }} onClick={() => show(v, ind, val.id)}>
                          <div class="d-flex justify-content-around">
                            <p>{v.kg}</p>
                            <p>{v.price}</p>
                            <p>{v.offer}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                ""
              )}
              <h5 class="card-text" style={{textAlign: "left", zIndex: "10"}}>{val.price}</h5>
              <h6 className="off"> Offer:  {val.offer}</h6>
              <div class="d-flex flex-wrap mt-3">
                <div class="col-2 btn btn-outline-secondary me-2 pe-md-4 pe-sm-4" style={{alignItems:"center"}} onClick={() => fav(val.id)}>
                  {val.isfav ? <FcLike /> : <FaRegHeart />}
                </div>
                {val.iscart ? (
                  <div class="col-8 d-flex align-items-center">
                    <button class="btn btn-outline-danger ms-3 ms-md-2 me-4" onClick={() => sub(val.id)}>-</button>
                    <p class="m-0">{val.count}</p>
                    <button class="btn btn-outline-danger ms-4" onClick={() => add(val.id)}>+</button>
                  </div>
                ) : (
                  <div class="col-8">
                    <button class="btn btn-outline-danger cart-btn" onClick={() => addToCart(val.id)}>Add to cart</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      );
    })}
  </div>
</div>
  </div>
  </div> 
    )
}