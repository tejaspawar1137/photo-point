"use client";
import { useState } from "react";
import Footer from "../Footer";
import NavBar from "../Navbar/page";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loader from "../Loader/Loader";
import { time } from "console";

 const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  const router = useRouter();

  const [loading, setLoading] = useState(false); // Added loading state

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Do something with the email and password values (e.g., send them to a server)
    console.log("Email:", formData.email);
    console.log("Password:", formData.password);
    const sendBody = {
      formData,
    };
    setLoading(true)
    try {
      const response = await fetch("/api/routes/User/Login", {
        method: "POST",
        headers: {
          authtoken: authtoken,
        },
        body: JSON.stringify(sendBody),
      });

      const res = await response.json();
      console.log(res);

      if (response.ok) {
        // Navigate to the homepage
        router.push("/");
        localStorage.setItem("authToken", authtoken);
      } else {
        // Handle error or display a message
        console.log("API request failed:", res);
        toast.error("Incorrect email or password");
      }
      return res; // Return the created folder
    } catch (error: any) {
      console.log(error.messages);
    }
    finally {
      // Set loading to false after the email is sent (whether successful or not)
      setLoading(false);
    }
    // Optionally, reset the form
    setFormData({
      email: "",
      password: "",
    });
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 login-img  backdrop-blur-2xl">
      <NavBar></NavBar>
      <div className="flex flex-col items-baseline justify-center sm:ml-0 px-6 py-8 mx-auto md:h-screen lg:py-0 lg:ml-20">
        <ToastContainer></ToastContainer>
          {/* Your existing contact form JSX */}
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
        >
          <img
            className="w-8 h-8 mr-2"
            src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
            alt="logo"
          />
          Login
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Login in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" action="#">
              <div>
                <label
                  id="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div>
                <label
                  id="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="remember"
                      aria-describedby="remember"
                      type="checkbox"
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label id="remember" className="text-gray-500 ">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline "
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 "
                onClick={handleSubmit}
              >
                Login
              </button>
              <p className="text-sm font-light text-gray-500 ">
                Don’t have an account yet?{" "}
                <a
                  href="/components/SignUp"
                  className="font-medium text-primary-600 hover:underline text-black"
                >
                  Sign up
                </a>
              </p>
            </form>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </section>
  );
};

export default Login;
