
import {Routes, Route} from "react-router-dom"
import {lazy, useEffect} from "react";
import SharedLayout from "./SharedLayout";
import { PrivateRoute } from "./PrivateRoute";
import { RestrictedRoute } from "./RestrictedRoute";
import { useDispatch, useSelector } from "react-redux";
import { refreshUser } from "redux/auth/operations";



const Register = lazy(()=>import("pages/Register/Register"))
const Login = lazy(()=>import("pages/Login/Login"))
const Contacts = lazy(()=>import("pages/Contacts/Contacts"))


export const App = () => {
  const dispatch= useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(refreshUser(token));
    }
  }, [dispatch, token]);
  
  return (
    <div>
      <Routes>
        

        <Route path="/" element={<SharedLayout />}>
          <Route path="/register" element={
            <RestrictedRoute
              component={<Register/>}
              redirectTo="/contacts"
            />
          }/>
          <Route
          path="login"
          element={
            <RestrictedRoute
              component={<Login/>}
              redirectTo="/contacts"
            />
          }
        />
          <Route path="/contacts" element={
            <PrivateRoute redirectTo="/contacts" component={<Contacts />} />
          }/>
          
          <Route path="*" element={
            <RestrictedRoute
              component={<Contacts/>}
              redirectTo="/contacts"
            />
          }x />
        </Route>    
        
      </Routes>
    
    </div>
  );
};
