import React, { useEffect, useRef, useState } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
import Cart from '../screens/Cart';
export default function Card(props) {
    let options = props.options;
    let priceOptions = Object.keys(options);
    let dispatch = useDispatchCart();
    const priceRef = useRef();
    let data = useCart();
    const [qty, setQty] = useState(1);
    const [size, setSize] = useState("");

    const handleAddtoCart = async () => {
        let food = []
        for (const item of data) {
          if (item.id === props.foodItem._id) {
            food = item;
    
            break;
          }
        }
        console.log(food)
        console.log(new Date())
        if (food.length !== 0) {
          if (food.size === size) {
            await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty })
            return
          }
          else if (food.size !== size) {
            await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
            console.log("Size different so simply ADD one more to the list")
            return
          }
          return
        }
    
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size })
    
    
        // setBtnEnable(true)
    
      }
    

    let finalPrice = qty * parseInt(options[size]);
    useEffect(() => {
        setSize(priceRef.current.value)
    }, [])

    return (
        <div>

            <div>
                <div className="card mt-3" style={{ "width": "18rem", "maxHeight": "360px" }}>
                    <img className="card-img-top" style={{ "width": "18rem", "objectFit": "cover", "maxHeight": "150px" }} src={props.foodItem.img} alt="Card image cap" />
                    <div className="card-body">
                        <h5 className="card-title">{props.foodItem.name}</h5>
                        <p className="card-text">It's Yummy.</p>
                        <div className='container w-100'>
                            <select className='m-2 h-100  be-success rounded' onChange={(e) => setQty(e.target.value)}>
                                {Array.from(Array(10), (e, i) => {
                                    return (
                                        <option key={i + 1} value={i + 1}> {i + 1} </option>
                                    )
                                })}
                            </select>
                            <select className='m-2 h-100  be-success rounded' ref={priceRef} onChange={(e) => setSize(e.target.value)}>
                                {priceOptions.map((data) => {
                                    return <option key={data} value={data}>{data}</option>
                                })}

                            </select>
                            <div className='d-inline h-100 fs-5'>
                                ₹{finalPrice}/-
                            </div>
                        </div>
                        <hr>

                        </hr>

                        <button className={`btn btn-success justtify-center ms-2`} onClick={handleAddtoCart}> Add to Cart </button>
                    </div>

                </div>
            </div>

        </div>
    )
}
