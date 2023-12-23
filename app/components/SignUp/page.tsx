"use client";
import { useState, useEffect } from "react";
import NavBar from "../Navbar/page";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import Loader from "../Loader/Loader";
import { motion } from "framer-motion";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  const router = useRouter();
  const [loading, setLoading] = useState(false); // Added loading state
  const [textload, setTextload] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const sendBody = {
      name:formData.name,
      email:formData.email,
      password:formData.password,
      phone:formData.phoneNumber
    };
    try {
      console.log("creds",formData)
      setLoading(true);
      const response = await fetch("/api/routes/User/Create", {
        method: "POST",
        headers: {
          authtoken: authtoken,
        },
        body: JSON.stringify(sendBody),
      });

      const res = await response.json();
      // Return the created folder

      // Check if the response indicates success (you may need to adjust this based on your API)
      if (response.ok) {
        // Navigate to the homepage
        router.push("/components/Login");
      } else {
        // Handle error or display a message
        toast.error(res.message);
        console.log("API request failed:", res);
      }

      return res;
    } catch (error: any) {
      console.log(error.messages);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
    // Optionally, reset the form
    setFormData({
      name: "",
      email: "",
      phoneNumber: "",
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

  useEffect(() => {
    // Set textload to true after a delay or any other condition you prefer
    const timeout = setTimeout(() => {
      setTextload(true);
    }, 500); // Change the delay as needed

    // Cleanup the timeout to avoid memory leaks
    return () => clearTimeout(timeout);
  }, []);

  const formVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <>
      <section className="signup-img ">
        <NavBar></NavBar>
        {loading && <Loader></Loader>}
        <div className="flex flex-col px-6 py-8 mx-auto md:h-screen lg:py-0 mt-20 ml-10 ">
          <ToastContainer></ToastContainer>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: textload ? 1 : 0, y: textload ? 0 : -20 }}
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            className=" font-bold text-6xl opacity-30  text-white font-sans mt-3 mb-5"
          >
            Abhay Studio
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: textload ? 1 : 0, y: textload ? -20 : 0 }}
            whileHover={{ scale: 1, transition: { duration: 0.3 } }}
            className="flex items-center mb-6 text-3xl font-semibold text-white "
          >
            LET'S GET YOU SET UP.
          </motion.p>
          <div className="w-full bg-gray-200 rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
                CREATE YOUR ACCCOUNT.
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    id="name"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Your Name
                  </label>
                  <motion.input
                    variants={inputVariants}
                    type="name"
                    name="name"
                    required
                    id="name"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    id="email"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Your Email
                  </label>
                  <motion.input
                    type="email"
                    name="email"
                    required
                    id="email"
                    variants={inputVariants}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    placeholder="name@company.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    id="password"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Password
                  </label>
                  <motion.input
                    type="password"
                    name="password"
                    required
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    value={formData.password}
                    variants={inputVariants}
                    onChange={handleChange}
                  />
                </motion.div>

                <motion.div
                  variants={formVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <label
                    id="PhoneNumber"
                    className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                  >
                    Phone Number
                  </label>
                  <motion.input
                    type="text"
                    name="phoneNumber"
                    required
                    id="phoneNumber"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                    placeholder="639761XXXX"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    variants={inputVariants}
                  />
                </motion.div>

                <motion.button
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800 bg-blue-700"
                >
                  Create an account
                </motion.button>
                <p className="text-sm font-light text-gray-500 :text-gray-400">
                  Already have an account?{" "}
                  <a
                    href="/components/Login"
                    className="font-medium text-primary-600 hover:underline :text-primary-500"
                  >
                    Login here
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
};

export default SignUp;
