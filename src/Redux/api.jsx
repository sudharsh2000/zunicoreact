


export const homeapi=process.env.NODE_ENV === 'production'?'https://zunico.onrender.com/':'http://localhost:8000/'

export const signupapi=homeapi+'api/signup/'
export const signinapi=homeapi+'signin'
export const refreshapi=homeapi+'Refresh/'
export const Logoutapi=homeapi+'logout/'
export const bannerapi=homeapi+'api/banners/'
export const CartApi=homeapi+'api/cart/'
export const categoryapi=homeapi+'api/categories/'
export const productapi=homeapi+'api/products/'
export const usersapi=homeapi+'api/users/'
export const CartItemApi=homeapi+'api/cartitem/'
export const AddressApi=homeapi+'api/addAdress/'
export const OrderApi=homeapi+'api/orders/'

