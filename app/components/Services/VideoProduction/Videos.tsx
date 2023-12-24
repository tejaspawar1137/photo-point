import React, { useEffect, useState } from "react";
import DeleteVideoModal from "./DeleteVideoModal";  
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux"; 

interface VideoProps {
  videos: any[]; // Adjust this to the actual type of your videos array
  folderName: number; // Adjust this to the actual type of folderName
}
 
export const CircularLoader: React.FC = () => {
  return <div className="loader"></div>;
};

const Videos: React.FC<VideoProps> = ({ videos, folderName }) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [loading, setLoading] = useState(false);
  const isLoggedIn =
  typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  const userRoleFromRedux = useSelector(
    (state) => (state as any).userReducer.role
  );
  const [role, setRole] = useState<any>(""); 

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
    const userRole = getCookie("role");
    setRole(userRole);
  }, [userRoleFromRedux]);

  useEffect(() => {
    if (videos) {
      setLoading(false);
    }
    setLoading(false); 
  }, [videos]);

  return !loading ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 xs:gap-4 md:gap-8 xl:gap-14 lg:px-10 xl:px-20 w-full justify-center items-center">
      {(videos || []).length > 0
        ? videos
            .find((_, i) => i === folderName)
            ?.images.map((video: any, index: number) => {
              return (
                <div className="flex h-[14rem] xs:h-[17rem] sm:h-[14rem] md:h-[17rem] px-4 lg:px-0" key={video.url}>
                  <div className="relative h-[14rem] xs:h-[17rem] sm:h-[14rem] md:h-[17rem] w-full">
                    <div className="z-20">
                      <iframe
                        loading="lazy"
                        onLoadStart={() => {
                          setIsLoading(true);
                        }}
                        onLoad={(e) => {
                          setIsLoading(false);
                        }}
                        src={video.url}
                        className="cursor-pointer w-full  shadow-md object-cover h-[14rem] xs:h-[17rem] sm:h-[14rem] md:h-[17rem]"
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen;"
                      ></iframe>
                    </div>

                    {isLoading && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div>
                          <CircularLoader />
                        </div>
                      </div>
                    )}
                    {!isLoading && (
                      <div className="absolute right-2 top-2">
                        <div>
                          { role &&
                          (<DeleteVideoModal
                            id={videos.find((_, i) => i === folderName)?._id}
                            url={video.url}
                          />)}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
        : ""}
    </div>
  ) : (
    <div className="h-full bg-white">
      <Loader />
    </div>
  );
};

export default Videos;
