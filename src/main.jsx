import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import { ProductDetails } from './Component/ProductDetails.jsx'
// import './ProductDetails'
import store from './store.jsx'
import {Provider} from "react-redux"

ReactDOM.createRoot(document.getElementById('root')).render(

 // <React.StrictMode>
 
<Provider store={store}>

<App/>

</Provider>




  // <ProductDetails/>

  //</React.StrictMode>,
)
