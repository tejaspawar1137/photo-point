import React, { useEffect, useState } from "react";
import MyModal from "./DeleteImageModal";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import DownloadIcon from "@/public/assets/Icons/DownloadIcon";
import Loader from "../../Loader/Loader";
import { useSelector } from "react-redux"; 

interface PhotoProps {
  photos: any[];
  folderName: number;
}

export const CircularLoader: React.FC = () => {
  return <div className="loader"></div>;
};

interface FullScreenImageModalProps {
  imageUrl: string;
  onClose: () => void;
}

const FullScreenImageModal: React.FC<FullScreenImageModalProps> = ({
  imageUrl,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="max-w-3xl max-h-3/4">
        <button
            style={{ textShadow: "2px 2px 4px rgba(0, 0, 0, 0.5)",zIndex:100 }} 
          className="absolute top-2 right-2 text-white text-4xl"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={imageUrl} alt="Full Screen" className="w-full scale-110" />
      </div>
    </div>
  );
};

const Photos: React.FC<PhotoProps> = ({ photos, folderName }) => {
  const [isLoading, setIsLoading] = useState<any>(false);
  const [fullScreenImage, setFullScreenImage] = useState<string | null>(null);
  const [loading, setloading] = useState(false); 
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
    if (photos) {
      setloading(false);
    }
    setloading(false);
    console.log(photos);
    console.log("thos os", isLoading);
  }, [photos]);

  const downloadImage = (url: string, index: number) => {
    fetch(url)
      .then((res) => res.blob())
      .then((blob) => {
        const imageUrl = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = `image_${index}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((error) => console.error("Error downloading image:", error));
  };

  const openFullScreenImage = (imageUrl: string) => {
    setFullScreenImage(imageUrl);
  };

  const closeFullScreenImage = () => {
    setFullScreenImage(null);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };
  return !loading ? (
    <div className="min-h-[80vh]  ">
      <div className="flex w-full justify-center px-5 lg:px-10 xl:px-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-5 lg:gap-10 xl:gap-14 w-full justify-center items-center">
          {(photos || []).length > 0
            ? photos
                .find((_, i) => i === folderName)
                ?.images.map((image: any, index: number) => {
                  return (
                    <div
                      className="sm:h-[18rem]  md:h-[23rem] xl:h-[23rem]  border-red-500 flex justify-center"
                      key={image.url}
                    >
                      <div className="relative h-full ">
                        <div className="z-20 h-full ">
                          <LazyLoadImage
                            src={image.url}
                            effect="blur"
                            beforeLoad={() => {
                              setIsLoading(true);
                            }}
                            onLoad={handleImageLoad}
                            className="cursor-pointer shadow-md object-cover sm:h-[18rem] md:h-[23rem] xl:h-[23rem] "
                            alt={`Image ${index}`}
                            onClick={() => openFullScreenImage(image.url)}
                          />
                        </div>

                        {isLoading && (
                          <div className=" absolute inset-0 flex items-center justify-center">
                            <div>
                              <CircularLoader />
                            </div>
                          </div>
                        )}
                        {!isLoading && (
                          <div className="absolute right-2 top-2">
                            {role && (
                              <div>
                                <MyModal
                                  id={
                                    photos.find((_, i) => i === folderName)?._id
                                  }
                                  url={image.url}
                                />
                              </div>
                            )}
                          </div>
                        )}
                      </div>

                      {fullScreenImage === image.url && (
                        <FullScreenImageModal
                          imageUrl={image.url}
                          onClose={closeFullScreenImage}
                        />
                      )}
                    </div>
                  );
                })
            : ""}
        </div>
      </div>
    </div>
  ) : (
    <div className="h-full bg-white">
      <Loader />
    </div>
  );
};

export default Photos;
