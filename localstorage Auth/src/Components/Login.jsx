import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export const Login = () => {
  const history = useNavigate();

  const [inpval, setInpval] = useState({
    email: "",
    pass: "",
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

    const getuserArr = localStorage.getItem("userdata");
    console.log(getuserArr);

    const { email, pass } = inpval;
    if (email === "") {
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
      if (getuserArr && getuserArr.length) {
        const userdata = JSON.parse(getuserArr);
        const userlogin = userdata.filter((el, k) => {
          return el.email === email && el.pass === pass;
        });

        if (userlogin.length === 0) {
          alert("invalid details");
        } else {
          console.log("user login succesfulyy");

          localStorage.setItem("user_login", JSON.stringify(userlogin));

          history("/home");
        }
      }
    }
  };
  return (
    <div className="signup-container">
      <div className="signup-inner">
        <div className="heading1">
          <h2>Login</h2>
          <p>
            Don't have an account?<Link to="/">Signup</Link>
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
              type="password"
              name="pass"
              onChange={getdata}
              id="pass"
              placeholder="Password"
            />

            <button type="submit" onClick={addData}>
              Login
            </button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};
