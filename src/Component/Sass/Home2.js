import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { UpdateName } from "./Store/Slice";
import { Link, useNavigate } from "react-router-dom";
import { FcLike } from "react-icons/fc";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Card, Button, Dropdown, DropdownButton } from "react-bootstrap";
import "./Sass/S.scss";

export const Home = () => {
  const state = useSelector((ram) => ram.data);
  console.log(state);
  const nav = useNavigate();
  const prodetail = (id) => {
    nav(`/prodetail?id=${id}`);
  };
  const dispatch = useDispatch();

  const dropDown = (id) => {
    let c = state.arr.map((v, i) => {
      return v.id === id ? { ...v, isweight: !v.isweight } : v;
    });
    dispatch(UpdateName(c));
  };

  const show = (v, ind, id) => {
    let d = state.arr.map((e, l) => {
      return e.id === id
        ? {
            ...e,
            weight: v.kg,
            price: v.price,
            offer: v.offer,
            isweight: false,
            weight1: e.weight1.map((e1, l1) => {
              return l1 === ind
                ? { ...e1, isactive: true }
                : { ...e1, isactive: false };
            }),
          }
        : e;
    });
    dispatch(UpdateName(d));
  };

  const fav = (id) => {
    let a = state.arr.map((v, i) => {
      return id === v.id ? { ...v, isfav: !v.isfav } : v;
    });
    dispatch(UpdateName(a));
  };

  const addToCart = (id) => {
    let b = state.arr.map((v, i) => {
      return v.id === id ? { ...v, iscart: true } : v;
    });
    dispatch(UpdateName(b));
  };

  const sub = (id) => {
    let updatedArr = state.arr.map((v) => {
      if (v.id === id && v.count > 1) {
        return { ...v, count: v.count - 1 };
      } else if (v.id === id && v.count <= 1) {
        return { ...v, iscart: false };
      } else {
        return v;
      }
    });
    dispatch(UpdateName(updatedArr));
  };

  const add = (id) => {
    let d = state.arr.map((v, i) => {
      if (v.count >= 10) {
        alert("you cant add more than 10 items");
        return v;
      } else {
        return v.id === id ? { ...v, count: v.count + 1 } : v;
      }
    });
    dispatch(UpdateName(d));
  };

  return (
    <div>
      <div className="nav-header">
        <div className="container">
          <div className="nav-row">
            <div className="logo-col" onClick={() => nav("/")}>
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr3xOZrREto9WNjqxVOjZy4D7m7ByimftjKg&usqp=CAU"
                alt="logo"
              />
            </div>
            <div className="nav-link">
              <Link to="/fav" className="nav-icon">
                <FaRegHeart />
              </Link>
              <Link to="/cart" className="nav-icon">
                <TiShoppingCart />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row justify-content-center">
          {state.arr.map((val, i) => (
            <div key={i} className="col-md-6 col-lg-4 mb-4">
              <Card style={{ height: "100%" }}>
                <Card.Body>
                  <div onClick={() => prodetail(val.id)}>
                    <Card.Img
                      src={val.image}
                      className="img-fluid"
                      alt="veg"
                    />
                  </div>
                  <Card.Title className="text-center mt-3 mb-3">
                    {val.name}
                  </Card.Title>
                  <div className="menu">
                    <p
                      onClick={() => dropDown(val.id)}
                      className="dd text-center"
                    >
                      {val.weight}{" "}
                      <DropdownButton
                        id="dropdown-basic-button"
                        title=""
                        className="dropdown-button"
                      >
                        <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                      </DropdownButton>
                    </p>
                    <div className="select">
                      {val.isweight && (
                        <div className="bg">
                          {val.weight1.map((v, ind) => (
                            <div
                              key={ind}
                              className="weight"
                              onClick={() => show(v, ind, val.id)}
                            >
                              <div className="text-center">
                                <p>{v.kg}</p>
                                <p>{v.price}</p>
                                <p>{v.offer}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="weight">{val.price}</p>
                    <p>{val.offer}</p>
                    <div className="d-flex justify-content-center">
                      <div
                        className="fav-icon mr-3"
                        onClick={() => fav(val.id)}
                      >
                        {val.isfav ? <FcLike /> : <FaRegHeart />}
                      </div>
                      {val.iscart ? (
                        <div className="d-flex align-items-center">
                          <Button
                            variant="danger"
                            className="minus mr-2"
                            onClick={() => sub(val.id)}
                          >
                            -
                          </Button>
                          <p className="mr-2">{val.count}</p>
                          <Button
                            variant="success"
                            className="minus"
                            onClick={() => add(val.id)}
                          >
                            +
                          </Button>
                        </div>
                      ) : (
                        <Button
                          variant="primary"
                          className="cart-btn"
                          onClick={() => addToCart(val.id)}
                        >
                          Add to cart
                        </Button>
                      )}
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
