import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { UpdateName } from "./Store/Slice";
import { Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import "./Sass/S.scss";
import { IoIosArrowDown } from "react-icons/io";

//state=> useSelector()
//dispatch => useDispatch()
export const Home = ()=>{
    const state = useSelector((ram)=>ram.data)   // slice.js 
    console.log(state)
    const nav = useNavigate()
    const prodetail=(id)=>{
     nav(`/prodetail?id=${id}`)
      }
    let dispatch = useDispatch()
    // const update = (i)=>{
    //   //console.log("hi")
    //   let x = state.arr.map((v,ind)=>{
    //     return ind === i ? {...v,name:"redux"} : v
    //   })
    //   dispatch(UpdateName(x))
    // }
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
          <div className="nav-header">
          <div className="container">
                   <div className="nav-row">
                    <div className="logo-col" onClick={()=>nav('/')}> 
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3xOZrREto9WNjqxVOjZy4D7m7ByimftjKg&usqp=CAU" alt="logo"/>
                    </div>
                    <div className="nav-link">
                    <Link to="/fav"> <FaRegHeart /> </Link>
                    <Link to="/cart"> <TiShoppingCart /> </Link>
                    </div>
                   </div>
            </div>
        </div>
        
        {/* <div >
          <Link to="/cart"> </Link>
            <div style={{width:"70%",margin:"auto"}}>
            <div style={{display:"flex",flexWrap:"wrap",width:"100%",paddingTop:"10%",justifyContent:"center"}}>
            {
          state.arr.map((val,i)=>{
          return(
            <div style={{width:"25%", height:"500px", padding:"7px"}}  key={i}>
              <div style={{border:"solid 1px #fff",borderRadius:"7px", padding:"15px", boxShadow: "grey 0 0 10px"}} >
              <div onClick={()=>prodetail(val.id)}>
               <img  src={val.image} style={{width:"80%",height:"200px",justifyContent:"center"}} alt="veg"/>
              </div>
              <h3 className="name2">{val.name}</h3>
              <div className="menu">
              <p onClick={()=>dropDown(val.id)} className="dd" style={{border:"solid 1px grey",boxShadow: "grey 0 0 10px"}}>{val.weight} 
              <dropdown style={{marginLeft:"100px",border:"none"}}>
                <select style={{border:"none"}}>
                  </select>
              </dropdown> 
              </p>
              <div className="select">
              {
              val.isweight ? 
              <div className="bg"> {
                val.weight1.map((v,ind)=>{
                return(
                  <div  style={{backgroundColor:"white"}}>
                   <div  className="weight" style={{border : v.isactive? "solid 2px green" : "solid 1px grey"}} onClick={()=>show(v,ind,val.id)} >
                   <div style={{display:"flex",justifyContent:"space-around"}}>
                     <p>{v.kg} </p>
                     <p>{v.price}</p>
                     <p>{v.offer}</p>
                      </div>
                    </div>
                    </div>
                )
              })}
              </div>
               : ""
            }
                </div>
                </div>

            <h5 className="weight" style={{textAlign:"left",zIndex:"10"}}>{val.price}</h5>
            <h6>{val.offer}</h6>
              <div style={{display:"flex", flexWrap:"wrap" ,marginTop:"30px"}}>
              <div style={{border:"solid 1px grey", borderRadius:"5px" ,width:"18%",height:"30%",padding:"7px 7px"}} onClick={()=>fav(val.id)}>  
              {
               val.isfav ? <FcLike /> : <FaRegHeart />
              }
              </div>
              {
                val.iscart ? 
                <div style={{display:"flex",flexWrap:"wrap", marginLeft:"20px",border:"solid 1px red"}}>
                  <button className="minus"  onClick={()=>sub(val.id)}>-</button>
                  <p style={{marginLeft:"8px",marginRight:"20px", marginTop:"5px",fontSize:"15px",color:"red"}}>{val.count}</p>
                  <button className="minus" onClick={()=>add(val.id)}>+</button>
                </div> :
                <div >
                <button className="cart-btn" onClick={()=>addToCart(val.id)}>Add to cart</button>
                </div>
              }
              </div>
          
              {/* <FaRegHeart /> */}
              {/* <button onClick={()=>uprice(i)}>update Price</button> 
            </div>
            </div>
          )
        })
        
      }
      
      </div>
            </div>
          </div> */}

          <div class="container pt-5">
  <div class="row pt-5">
    {state.arr.map((val, i) => {
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
                  <div class="col-9 d-flex align-items-center">
                    <button class="btn btn-outline-danger ms-3 ms-md-2 me-4" onClick={() => sub(val.id)}>-</button>
                    <p class="m-0">{val.count}</p>
                    <button class="btn btn-outline-danger ms-4" onClick={() => add(val.id)}>+</button>
                  </div>
                ) : (
                  <div class="col-9">
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
          
    )
}





