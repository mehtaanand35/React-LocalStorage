import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Signup = () => {
  const history = useNavigate();
  const [inpval, setInpval] = useState({
    Fname: "",
    Lname: "",
    email: "",
    pass: "",
    Cpass: "",
  });

  const [data, setData] = useState([]);
  console.log(inpval);

  const getdata = (e) => {
    // console.log(e.target.value);

    const { value, name } = e.target;
    // console.log(value,name);

    setInpval(() => {
      return {
        ...inpval,
        [name]: value,
      };
    });
  };
  const addData = (e) => {
    e.preventDefault();

    const { name, email, pass, Cpass } = inpval;

    if (name === "") {
      toast.error("name field is requred!", {
        position: "top-center",
      });
    } else if (email === "") {
      toast.error("email field is requred", {
        position: "top-center",
      });
    } else if (!email.includes("@")) {
      toast.error("plz enter valid email addres", {
        position: "top-center",
      });
    } else if (pass === "") {
      toast.error("password field is requred", {
        position: "top-center",
      });
    } else if (pass.length < 5) {
      toast.error("password length greater five", {
        position: "top-center",
      });
    } else {
      console.log("data added succesfully");
      history("/login");
      localStorage.setItem("userdata", JSON.stringify([...data, inpval]));
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-inner">
        <div className="heading1">
          <h2>Create Account</h2>
          <p>
            Already have an account?<Link to="/login">Signin</Link>
          </p>
        </div>
        <div className="input">
          <form>
            <input
              type="email"
              name="email"
              onChange={getdata}
              id="email"
              placeholder="Email"
            />
            <input
              type="text"
              name="Fname"
              onChange={getdata}
              id=""
              placeholder="First Name"
            />
            <input
              type="text"
              name="Lname"
              onChange={getdata}
              id=""
              placeholder="Last Name"
            />
            <input
              type="password"
              name="pass"
              onChange={getdata}
              id="pass"
              placeholder="Password"
            />
            <input
              type="password"
              name="Cpass"
              onChange={getdata}
              id="pass"
              placeholder="Confirm Password"
            />
            <button type="submit" onClick={addData}>
              Sign up
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
