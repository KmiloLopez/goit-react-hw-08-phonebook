
import {Routes, Route} from "react-router-dom"
import {lazy} from "react";
import SharedLayout from "./SharedLayout";



const Register = lazy(()=>import("pages/Register/Register"))
const Login = lazy(()=>import("pages/Login/Login"))
const Contacts = lazy(()=>import("pages/Contacts/Contacts"))


export const App = () => {
  
  return (
    <div>
      <Routes>
        

        <Route path="/" element={<SharedLayout />}>
          <Route path="/register" element={<Register />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/contacts" element={<Contacts />}/>
          
          <Route path="*" element={<SharedLayout/>} />
        </Route>    
        
      </Routes>
    
    </div>
  );
};
