


export const homeapi=process.env.NODE_ENV === 'production'?'http://127.0.0.1:8000/':'https://zunico.onrender.com/'
export const signupapi=homeapi+'api/signup/'
export const signinapi=homeapi+'signin'
export const refreshapi=homeapi+'Refresh/'
export const Logoutapi=homeapi+'logout/'
export const bannerapi=homeapi+'api/banners/'
export const CartApi=homeapi+'api/cart/'
export const categoryapi=homeapi+'api/categories/'
export const productapi=homeapi+'api/products/'
export const usersapi=homeapi+'api/users/'