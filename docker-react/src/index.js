// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import App from "./ECBT/App.js";

// // Context providers
// import { AuthProvider } from "./ECBT/ecommerce/context/AuthContext";
// import { CartProvider } from "./ECBT/ecommerce/context/CartContext";
// import { OrderHistoryProvider } from "./ECBT/ecommerce/context/OrderHistoryContext";
// import { ProductsProvider } from "./ECBT/ecommerce/context/ProductsContext";
// import { WishlistProvider } from "./ECBT/ecommerce/context/WishlistContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//     <React.StrictMode>
//         <BrowserRouter>
//         <AuthProvider>
//             <CartProvider>
//             <WishlistProvider>
//                 <OrderHistoryProvider>
//                 <ProductsProvider>
//                     <App />
//                 </ProductsProvider>
//                 </OrderHistoryProvider>
//             </WishlistProvider>
//             </CartProvider>
//         </AuthProvider>
//         </BrowserRouter>
//     </React.StrictMode>
// );

import ReactDOM from "react-dom/client";
// import App from "./CCS112_Midterm-Lab-Exam_G10/App";
// import App from "./Practice/App";
// import "bootstrap/dist/css/bootstrap.min.css";
import App from "./AppTensorFlow.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);


