import Grid from '@mui/material/Grid';
import React, { useState, useEffect, useContext } from 'react';
import DeleteForeverOutlinedIcon from '@material-ui/icons/DeleteForeverOutlined';
import { Link } from "react-router-dom"
import CartContext from '../context/cartContext';

export default function CartProductModal(props) {

    const [products, setProducts] = useState([])

    const { cartItem, addItem, showId, removeItem, countCart } = useContext(CartContext);

    const getProducts = () => {
        return new Promise((resolve, reject) => {
            return resolve(cartItem)
        })
    }

    useEffect(() => {
        const timer = setTimeout(() => {
            setProducts([])
            getProducts().then((products) => {
                setProducts(products)
            }).finally(() => {
                console.log("Cargaron los items")
            })
        }, 120);
        return () => clearTimeout(timer);
    }, [cartItem])

    console.log(cartItem)

    return (
        <Grid container spacing={2}>
            <Grid item xs={12}>
                {
                    products.map((product) => {
                        const { id, img, alt, title, price, cant } = product;
                        const total = price * cant;
                        const removeToCart = (e) => {
                            e.stopPropagation();
                            removeItem(id);
                        }
                        if (!showId.includes(id)) {
                            return (<div></div>)
                        } else {
                            return (
                                <div className="cartItemContainerModal display-table" key={id}>
                                    <div className="col-4 table-cell imgContainer"><img src={img} alt={alt} className="w-80" /></div>
                                    <div className="col-4 table-cell">
                                        <p className="title">{title}</p>
                                        <p className="price">${price}</p>
                                        <p className="price">Cantidad: {cant}</p>
                                        <p className="price"><b>Total: ${total}</b></p></div>
                                    <div className="col-4 table-cell black"><DeleteForeverOutlinedIcon onClick={removeToCart} /></div>
                                </div>
                            )
                        }
                    })
                }
                <Link to={"/cart"}><p className="button">Finalizar compra</p></Link>
            </Grid>
        </Grid>
    )

}