import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import Chekout from "../../Pages/Chekout/Chekout";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import Orders from "../../Pages/Orders/Orders";
import SignUp from "../../Pages/SignUp/SignUp";

const router = createBrowserRouter([
    {
      path:'/',
      element:<Main></Main>,
      children:[
        {
          path:'/',
          element:<Home></Home>
        },
        {
          path:'/login',
          element:<Login></Login>
        },
        {
          path:'/signup',
          element:<SignUp></SignUp>
        },
        {
          path:'/chekout/:id',
          element:<Chekout></Chekout>,
          loader: ({params}) => fetch(`http://localhost:5000/services/${params.id}`)
        },
        {
          path:'/orders',
          element:<Orders></Orders>
        }
      ]
    
    }
  ])

  export default router;