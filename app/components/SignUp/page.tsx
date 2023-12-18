"use client";
import { useState } from "react";
import NavBar from "../Navbar/page";
import Footer from "../Footer";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/navigation';
import Loader from "../Loader/Loader";


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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const sendBody = {
      formData,
    };
    try {
      setLoading(true)
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
        router.push("/components/Login")

      } else {
        // Handle error or display a message
        toast.error(res.message);
        console.log("API request failed:", res);
      }

      return res;

    } catch (error: any) {
      console.log(error.messages);
      toast.error(error.message);
    }
    finally {
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

  return (
    <section className="bg-gray-50 :bg-gray-900 signup-img">
      <NavBar></NavBar>
      {
            loading && (
              <Loader></Loader>
            )
          }
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 ">
      <ToastContainer></ToastContainer>
        <img
          className="mb-5"
          src="https://www.yourperfectweddingphotographer.co.uk/wp-content/themes/ypwphoto/img/logo3.png"
          alt="logo"
        />
        <a
          href="#"
          className="flex items-center mb-6 text-3xl font-semibold text-gray-900 text-white "
        >
          LET'S GET YOU SET UP.
        </a>
        <div className="w-full bg-white rounded-lg shadow :border md:mt-0 sm:max-w-md xl:p-0 :bg-gray-800 :border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl :text-white">
              CREATE YOUR ACCCOUNT.
            </h1>
            <form className="space-y-4 md:space-y-6" action="#" onSubmit={handleSubmit}>
              <div>
                <label
                  id="name"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Your Name
                </label>
                <input
                  type="name"
                  name="name"
                  required
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  id="email"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  placeholder="name@company.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  id="password"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 :bg-gray-700 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>

              <div>
                <label
                  id="PhoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 :text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  name="phoneNumber"
                  required
                  id="phoneNumber"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 placeholder-gray-400 text-black focus:ring-blue-500 focus:border-blue-500"
                  placeholder="639761XXXX"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                />
              </div>

              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 :bg-gray-700 :focus:ring-primary-600 :ring-offset-gray-800"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label
                    id="terms"
                    className="font-light text-gray-500 :text-gray-300"
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline :text-primary-500"
                      href="#"
                    >
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-primary-600 :hover:bg-primary-700 :focus:ring-primary-800 bg-blue-700"
              >
                Create an account
              </button>
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
      <Footer></Footer>
    </section>
  );
};

export default SignUp;
