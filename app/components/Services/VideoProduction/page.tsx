"use client";
import React, { useEffect, useState } from "react";
import NavBar from "../../Navbar/page";
import Footer from "../../Footer";
import { useDispatch, useSelector } from "react-redux";
import SettingPopover from "./SettingsPopover";
import CreateFolderModal from "./CreateFolderModal";
import Videos from "@/app/components/Services/VideoProduction/Videos";
import Loader from "../../Loader/Loader";
import { inititalizeVideography } from "@/app/redux/actions/videoAction";
import { motion } from "framer-motion"; 

const Videography = () => { 
  const [folderName, setFolderName] = useState(0);
  const [loading, setloading] = useState(false);
  const videos = useSelector((state) => (state as any).videosReducer?.videos);
  const dispatch = useDispatch(); 
   const userRoleFromRedux=useSelector((state)=>(state as any).userReducer.role)
  const [role, setRole ] = useState<any>("")

  

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
    const userRole=getCookie("role");
    setRole(userRole);
  }, [userRoleFromRedux]);

  useEffect(() => {
    setloading(true);
    const fetchVideosForInitialization = async () => {
      try {
        setloading(true);
        const response = await fetch("/api/routes/Video/VideoFolder/FindAll", {
          method: "GET",
        });
        const resVideos = await response.json(); 
        if (
          Array.isArray(resVideos.videoFolder) &&
          resVideos.videoFolder.length > 0
        ) {
          dispatch(inititalizeVideography(resVideos.videoFolder));
          setloading(false);
        }
      } catch (error) {
        console.error("Error");
        setloading(false);
      }
    };
    fetchVideosForInitialization();
  }, []);


  return !loading ? (
    <div>
    <NavBar content={"black"}/>
      <div className="bg-white text-black  pt-[8rem] pb-6  min-h-[100vh]">
        <motion.h1
          className="font-sans flex justify-center text-4xl md:text-5xl font-bold tracking-wide"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          Videography
        </motion.h1>
        {/* Header  */}
        <div className="flex justify-between items-center px-2 py-8">
          <div className="block"></div>
          <div className="flex justify-between items-center px-4 py-4 overflow-x-auto  lg:text-sm xl:text-base  text-[0.8rem] whitespace-nowrap mx-5   space-x-4 lg:space-x-6 list-none font-light">
          {(videos as any).length > 0
              ? videos.map((e: any, i: any) => {
                  return (
                    <div
                      className="hover:cursor-pointer "
                      key={i + 69}
                      onClick={() => {
                        setFolderName(i);
                      }}
                    >
                      <div className=" flex items-center gap-2">
                        <span
                          className={`hover:text-blue-400 text-xs sm:text-sm md:text-base uppercase transition ${
                            folderName === i
                              ? "border-b border-blue-400 text-blue-400"
                              : ""
                          }
            `}
                        >
                          {e.name}
                        </span>{" "}
                        {role && (
                          <SettingPopover
                            index={folderName}
                            fId={e._id}
                            setFoldername={setFolderName}
                          />
                        )}
                      </div>
                    </div>
                  );
                })
              : ""}
          </div>
          <div className="pr-6 hover:scale-[1.05] transition">
            {role  && <CreateFolderModal />}
          </div>
        </div>
        {/* Photos  */}
        <Videos videos={videos} folderName={folderName} />
        {/* Header  */}
      </div>
      <Footer />
    </div>
  ) : (
    <div className="h-full bg-white">
      <Loader />
    </div>
  );
};

export default Videography;
