import {React,useState,useEffect} from "react";
import { UpdateName } from "./Store/Slice";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate,useSearchParams } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { GoHeartFill } from "react-icons/go";
import { GoHome } from "react-icons/go";

import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./Sass/S.scss"

export const Detail=()=>{
    
    const[det,setDet]= useState([]);
    
    const state = useSelector((ram)=>ram.data)   // slice.js 
    console.log(state)
    
    let dispatch = useDispatch()
    const nav = useNavigate()

    const prodetail=(id)=>{
      nav(`/prodetail?id=${id}`)
       }
    
       let[param]=useSearchParams();
       let y = Number(param.get('id'));
       console.log(y)
   
       useEffect((id)=>{
           let b = state.arr.filter((v,i)=>{
               return v.id === y 
           })
           console.log(b)
           setDet(b);
       },[det])

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
                    <div className="logo-col" onClick={()=>nav('/')}> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3xOZrREto9WNjqxVOjZy4D7m7ByimftjKg&usqp=CAU" alt="logo"/>
                    </div>
                    <div className="nav-link">
                    <Link to="/fav"> <FaRegHeart /> </Link>
                    <Link to="/"> <GoHome /> </Link>
                    </div>
                   </div>
            </div>
        </div>

        <div className="container pt-5">
  <div className="row">
    {
    det.map((val, i) => {
      return (
        <div className="col-lg-12 pt-5" key={i}>
          <div className="d-lg-flex flex-wrap">
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-3 mb-lg-0">
              <div className="box">
                <img src={val.image} className="img-fluid" alt="veg" />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12" style={{ textAlign: "left", paddingLeft: "60px" }}>
              <div className="fresh">
                <p style={{ textDecoration: "underline", textAlign:"left"}}>Fresho</p>
              </div>
              <h2 style={{ paddingTop: "10px", paddingBottom: "5px" ,textAlign:"left"}}>{val.name}</h2>
              <p className="fresh" style={{textAlign:"left"}}>MRP: ₹109</p>
              <h5 className="price">Price: {val.price}</h5>
              <p className="off">You save: <b>{val.offer}</b></p>
              <p className="fresh"style={{textAlign:"left"}}>(inclusive of all taxes)</p>
              <div className="d-flex flex-wrap mt-3">
                <div className="col-2 border border-grey rounded p-2 mr-2" onClick={() => fav(val.id)}>
                  {val.isfav ? <FcLike /> : <FaRegHeart />}
                </div>
                {val.iscart ?
                  <div className="col-9 d-flex align-items-center border border-red rounded">
                    <button className="minus" style={{marginLeft:"20px"}} onClick={() => sub(val.id)}>-</button>
                    <p className="m-0 px-2 text-danger" style={{marginLeft:"20px"}}>{val.count}</p>
                    <button className="minus " style={{marginLeft:"20px"}} onClick={() => add(val.id)}>+</button>
                  </div> :
                  <div class="col-9">
                    <button className="cart-btn "style={{marginLeft:"20px"}} onClick={() => addToCart(val.id)}>Add to cart</button>
                  </div>
                }
              </div>
              <div className="pad-top">
                {val.weight1.map((v, ind) => {
                  return (
                    <div key={ind} className="bg-white">
                      <div className="xx">
                        <div className="style" style={{ border: v.isactive ? "1px solid green" : "1px solid grey" }}  onClick={() => show(v, ind, val.id)}>
                          <div className="kg">
                            <p></p>
                          </div>
                          <div className="d-flex justify-content-between p-2 ">
                            <div className="pl-3">
                              <p>{v.kg}</p>
                            </div>
                            <div className="text-right pr-3">
                              <p>{v.price} <span style={{ color: "green", fontWeight: "bold" }}>({v.offer})</span></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
            <div style={{paddingTop:"100px"}}>
              {/* <p>{val.details}</p> */}
              <h2 style={{ paddingTop: "10px", paddingBottom: "5px" ,textAlign:"left",marginLeft:"10px"}}>{val.name}-(Fresho)</h2>
              {  
              val.details.map((v,ind) => {
     return (
    <div key={ind} style={{ backgroundColor: "white",padding:"5px 0px" }}>
      <div className="weight" style={{ border: "solid 1px #D3D3D3" }}>
      
        <div className="justify-content-around" style={{padding:"8px 12px"}}>
          {console.log(v)}
          
          <p className="ptag">{v.title}</p>
            {
              v.def.map((x,y)=>{
                 return(
                  <div>
                     <li style={{textAlign:"left",fontSize:"13px",paddingLeft:"5px"}}>{x.li}</li> 
                    </div>
                 )
              })
            }
          {/* <p>{v.price}</p>
          <p>{v.offer}</p> */}
        </div>
      </div>
    </div>
  );
})}

            </div>
          </div>
        </div>
      )
    })} 
  </div>
</div>
        </div>
        </div>
    )
}