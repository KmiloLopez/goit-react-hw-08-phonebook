import { clearError, clearFormError, setFormError} from "../../redux/auth/slice"; 
 import {register}  from "../../redux/auth/operations";
import { useEffect } from "react";
import toast, {Toaster} from "react-hot-toast"; 
import { useDispatch, useSelector } from "react-redux";

const Register = () => {
  const dispatch = useDispatch();
  const { formError, error, isLoading, token} = useSelector((state) => state.auth);
  const {name, email} = useSelector((state) => state.auth.user);

  const handleLogin = (e) => {
    e.preventDefault();
    const { email, password, name } = e.target.elements;
    const credentials = {
      name: name.value,
      email: email.value,
      password: password.value,
    };

     if (email.value && password.value && name.value) {
      console.log("credentials",credentials);
      dispatch(register(credentials));
    } else {
      dispatch(setFormError("Verify the provided info and try again."));
    } 
  };

   useEffect(() => {
    if (formError) {
      toast.error(formError);
      dispatch(clearFormError());
    }
  }, [dispatch, formError]);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [dispatch, error]); 
  const handleClick = ()=>{
    
    console.log("hep clicked",name, email, token);
  }
    return (<div>
      <h2>Register</h2>;
      <div
      style={{
        height: "calc(100vh - 50px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1>Register</h1>
      <form
        onSubmit={handleLogin}
        style={{
          display: "flex",
          flexDirection: "column",
          border: "1px solid black",
          padding: 15,
        }}
      >
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Name
          <input type="text" name="name" />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Email
          <input type="text" name="email" />
        </label>
        <label
          style={{ display: "flex", flexDirection: "column", marginTop: 10 }}
        >
          Password
          <input type="password" name="password" />
        </label>
        <button type="submit" style={{ marginTop: 20 }} disabled={isLoading}>
          {isLoading ? "Loading..." : "Send"}
          
        </button>
        
      </form>
      <Toaster/>
      <button onClick={handleClick}>show state user</button>
    </div>
    </div>

    )
  };
  export default Register;