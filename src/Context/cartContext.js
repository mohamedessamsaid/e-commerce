import axios from "axios";
import { createContext, useState } from "react";

export let cartContext = new createContext()

export default function CartContextProvider(props) {
    let [cartprod, setCartProd] = useState(null)
    const [cartNum, setcartNum] = useState(0)
    let myToken = localStorage.getItem('token')
    let headers = {
        token: myToken
    }
    function cashPayment(value, id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`, { shippingAddress: value },
            { headers }).then((res) => res).catch((err) => err)
    }
    function onlinePayment(value, id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=http://localhost:3000`, { shippingAddress: value }, {
            headers
        })
            .then((res) => res).catch((err) => err)

    }
    function addToCart(Id) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`
            , {
                productId: Id
            },
            {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }

    function showCart() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`
            , {
                headers: headers
            }).then((response) => response).catch((error) => error)
    }
    function deletCart(Id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, {
            headers: headers
        }).then((response) => response).catch((err) => err)
    }
    function upDateCount(Id, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${Id}`, {
            count
        }, {
            headers
        }).then((response) => response).catch((err) => err)
    }
    function clearCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        }).then((response) => response).catch((err) => err)
    }

    function heart(value) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, { productId: value }, {
            headers
        }).then((response) => response).catch((err) => err)
    }
    function showWishList() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        }).then((response) => response).catch((err) => err)
    }
    function delWishList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
            headers
        }).then((response) => response).catch((err) => err)
    }
    return <cartContext.Provider value={{
        addToCart, showCart, deletCart, upDateCount, clearCart, delWishList
        , cartNum, setcartNum, cartprod, setCartProd, onlinePayment, cashPayment, heart, showWishList
    }}>
        {props.children}
    </cartContext.Provider>
}