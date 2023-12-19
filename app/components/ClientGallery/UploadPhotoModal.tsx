import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import AddImage from "@/public/assets/Icons/AddImage";
import { useDispatch, useSelector } from "react-redux";
import ImageUpload from "../Services/ImageUpload";
import ImageUploadTwo from "../Services/ImageUploadTwo";
import ProgressBarComponent from "../ProgressBar/ProgressBar";
import { uploadPhotoClientGallery } from "@/app/redux/actions/clientGalleryAction";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UploadPhotoModal({
  id,
  index,
  sethitRedux
}: {
  id: any;
  index: any;
  sethitRedux:any
}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [progressBarDisplay, setprogressBarDisplay] = useState(false);
  const [progress, setprogress] = useState(0);
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  function closeModal() {
    setprogressBarDisplay(false);
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const updateProgressDispatch = (progress: any) => {
    setprogress(progress);
  };

  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const uploadImageApi = async () => {
    try {
      const sendBody = {
        url: imageUrl,
      };
      const createdFolder = await fetch(
        `/api/routes/Photo/ClientGallery/Upload?id=${id}`,
        {
          method: "PUT",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sendBody),
        }
      );
      const res = await createdFolder.json();
      return res; // Return the created folder
    } catch (error) {
      console.log(error); // Throw an error for better handling
    }
  };

  const uplaodImageHelper = async (
    index: any,
    e: any,
    uploadPreset: any,
    cloudname: any, 
  ) => {
    if (index === 0 || index === 1 || index === 2 || index >= 6) {
      updateProgressDispatch(0);
      setprogressBarDisplay(true);
      updateProgressDispatch(30);
      let tempUrl = await ImageUpload(e, `${uploadPreset}`, `${cloudname}`); 
      updateProgressDispatch(100);
      if (tempUrl === "Error") {
        setprogressBarDisplay(false);
        toast.error("Error uploading image, please try again.");
      } else if (tempUrl === "File size exceeds the maximum limit of 5 MB.") {
        {
          setprogressBarDisplay(false);
          toast.error(`${tempUrl}`);
        }
      } else { 
        setImageUrl(tempUrl); 
      }
    } 
  };

  const uploadImageFunc = async () => {
    if (typeof imageUrl === "string") {
      try { 
        const response = await uploadImageApi();
        if (response.message === "Image already exists") {
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
          return toast.error("This image already exists.");
        } else {
          setprogressBarDisplay(true);
          const temp = response.clientGallery.images;
          const uploadedImage = temp[temp.length - 1];
          console.log(uploadedImage);
          dispatch(uploadPhotoClientGallery({ UfId: id, Uurl: uploadedImage }));
          closeModal();
          sethitRedux((prev:any)=>prev+1);
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
        }
      } catch (error) {
        console.log(error);
        setprogress(0);
        setprogressBarDisplay(false);
      }
    } else {
      setprogress(0);
      setprogressBarDisplay(false);
      return toast.error("Please fill all the details");
    }
  };
  return (
    <>

      <button
        onClick={openModal}
        className="flex w-full   text-lg text-black items-end gap-1"
      >
               <ToastContainer></ToastContainer>
        <AddImage h={27} w={27} fill="black" />
        <span className=" translate-y-1">Add a photo</span>
      </button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bg-black bg-opacity-10 inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex  text-black items-center justify-center min-h-screen">
            <Dialog.Panel className="w-full max-w-md p-6 rounded-md bg-white shadow-xl sm:m-[12px]">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                <b className="uppercase">Upload image</b>
              </Dialog.Title>
              <div className="mb-6">
                <label className="block text-sm font-semibold uppercase text-gray-800 mb-1">
                  image <span className="text-red-600">*</span>
                </label>
                <input
                  onChange={async (e: any) => {
                    if (index === 0) {
                      uplaodImageHelper(
                        0,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "ds5fdn2yu", 
                      );

                      updateProgressDispatch(100);
                    }
                    if (index === 1) {
                      uplaodImageHelper(
                        1,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnr7thjlu", 
                      );
                    }
                    if (index === 2) {
                      uplaodImageHelper(
                        2,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dimv7myy9", 
                      );
                    }
                    if (index === 3) {
                      uplaodImageHelper(
                        3,
                        e,
                        "DHEERAJ_PHOTO",
                        "dimv7y9", 
                      );
                    }
                    if (index === 4) {
                      uplaodImageHelper(
                        4,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "ds5fdn2yu", 
                      );
                    }
                    if (index === 5) {
                      uplaodImageHelper(
                        5,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnr7thjlu", 
                      );
                    }
                    if (index === 6) {
                      uplaodImageHelper(
                        6,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dimv7myy9", 
                      );
                    } else {
                      uplaodImageHelper(
                        7,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnsydvkyd", 
                      );
                    }
                  }}
                  type="file"
                  className="rounded-sm text-gray-800 p-2 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            {progressBarDisplay && <div
                className="flex flex-col px-1"
              >
                <i className="text-sm mb-1">
                  {progress === 100 ? "UPLOADED" : "Uploading image..."}
                </i>
                <ProgressBarComponent progress={progress} />
              </div> } 
              <div className="text-sm mt-6 font-semibold text-gray-800 mb-4">
                Are you sure you want to add this image?
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={()=>{uploadImageFunc(); }}
                  className="flex-1 rounded-md bg-blue-500 hover:bg-blue-600 text-white py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={closeModal}
                  className="flex-1 rounded-md bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  No
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
