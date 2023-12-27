"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Footer from "../Footer";
import NavBar from "../Navbar/page";
import { useRouter } from "next/navigation"; 
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { updateUserRole } from "@/app/redux/actions/userAction";
import CustomAlert from "../Alert/Alert";

type formDataType = {
  email: any | null;
  password: any | null;
};
const Login: React.FC = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState<formDataType>({
    email: null,
    password: null,
  });
  const [textload, setTextload] = useState(false);
  const [formLoad, setFormLoad] = useState(false);
  const [loading, setLoading] = useState(false);

  const setCookie = (name: any, value: any, days: any) => {
    if (typeof document !== "undefined") {
      let expires = "";
      if (days) {
        let date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = "; expires=" + date.toUTCString();
      }
      document.cookie = name + "=" + value + expires + "; path=/";
    }
    return null;
  };

  const getCookie = (name: any) => {
    if (typeof document !== "undefined") {
      let nameEQ = name + "=";
      let cookies = document.cookie.split(";");
      for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i];
        while (cookie.charAt(0) === " ") {
          cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
          return cookie.substring(nameEQ.length, cookie.length);
        }
      }
      return null;
    }
    return null;
  };

  useEffect(() => {
    setFormLoad(true);
    const timeout = setTimeout(() => {
      setTextload(true);
    }, 500);
    return () => clearTimeout(timeout);
  }, []);

  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (
      typeof formData.email !== "string" &&
      typeof formData.password !== "string"
    ) {
      return CustomAlert("Fill the credentials","info");
    } else {
      setLoading(true);
      try {
        const response = await fetch("/api/routes/User/Login", {
          method: "GET",
        });
        const res = await response.json();
        const users = res.users;
        if (response.ok) {
          const foundUser = users.find(
            (e: any, index: any) =>
              e.email === formData.email && e.password === formData.password
          );
          if (foundUser) {
            CustomAlert("Welcome Back","success");
            const role = foundUser.role;
            setCookie("role", role, 1);
            let storedRole = getCookie("role");
            dispatch(updateUserRole(storedRole));
            console.log(storedRole);
            router.push("/");
          } else {
            CustomAlert("Incorrect email or password","error");
          }
        } else {
          CustomAlert("Incorrect email or password","error");
        }
        return res;
      } catch (error: any) {
        CustomAlert("Server error, please try again","error");
      } finally {
        setLoading(false);
      }
    }
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
    <>
      <section className="login-img pt-24 bg-gray-500 ">
        <NavBar content={"white"}></NavBar>
        <div className="flex flex-col items-baseline justify-center sm:ml-0 px-6 py-8 mx-auto md:h-screen lg:py-0 lg:ml-20"> 
          {/* Your existing contact form JSX */}
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900"
          >
            <motion.p
              className="font-bold text-6xl opacity-70 text-white font-sans mt-10 mb-5"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: textload ? 1 : 0, y: textload ? 0 : -20 }}
              whileHover={{ scale: 1.1, transition: { duration: 0.3 } }}
              onClick={() => setTextload(!textload)}
            >
              Dheeraj Photo Point
            </motion.p>
          </a>
          <motion.div
            className="w-full bg-gray-200 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: formLoad ? 1 : 0, y: formLoad ? 0 : 20 }}
            transition={{ duration: 0.6 }}
          >
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
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
                    className="bg-white border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                    value={formData.password}
                    onChange={handleChange}
                  />
                </div> 
                <button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-blue-700 "
                  onClick={handleSubmit}
                >
                  Login
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default Login;
