import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import AddImage from "@/public/assets/Icons/AddImage";
import { useDispatch, useSelector } from "react-redux";
import { 
  uploadPhoto,
} from "@/app/redux/actions/photographyReducerAction";
import ImageUpload from "../ImageUpload";
import ProgressBarComponent from "../../ProgressBar/ProgressBar";
import ImageUploadTwo from "../ImageUploadTwo"; 
import CustomAlert from "../../Alert/Alert";

export default function UploadPhotoModal({
  id,
  index,
  setloading,
}: {
  id: any;
  index: any;
  setloading: any;
}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [imageUrl, setImageUrl] = useState<any>(null);
  const [progressBarDisplay, setprogressBarDisplay] = useState(false);
  const [progress, setprogress] = useState(0);
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
 
  useEffect(() => {
    console.log(imageUrl);
  }, [imageUrl]);

  const uploadImageApi = async () => {
    try {
      const sendBody = {
        url: imageUrl,
      };
      const createdFolder = await fetch(
        `/api/routes/Photo/PhotoFolder/Upload?id=${id}`,
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
      throw new Error("Failed to create folder"); // Throw an error for better handling
    }
  };

  const uplaodImageHelper = async (
    index: any,
    e: any,
    uploadPreset: any,
    cloudname: any,
    apiKey: any
  ) => {
    setprogressBarDisplay(true);
    if (index === 0 || index === 1 || index === 2 || index >= 6) {
      setprogressBarDisplay(true);
      setprogress(10);
      setprogress(30);
      let tempUrl;
      try {
        tempUrl = await ImageUpload(e, uploadPreset, cloudname);
        setprogress(100);
      } catch (error) { 
        CustomAlert("Error uploading image, please try again.","error");
      }
      if (tempUrl === "Error") {
        CustomAlert("Error uploading image, please try again.","error");
        setprogressBarDisplay(false);
      } else if (tempUrl === "File size exceeds the maximum limit of 20 MB.") {
        {
         CustomAlert(`${tempUrl}`,"error");
          setprogressBarDisplay(false);
        }
      } else {
        setImageUrl(tempUrl);
      }
    } else {
      setprogressBarDisplay(true);
      setprogress(10);
      setprogress(30);
      let tempUrl = await ImageUploadTwo(e, `${apiKey}`);
      setprogress(100);
      if (tempUrl === "Error") {
        CustomAlert("Error uploading image, please try again.","error");
        setprogressBarDisplay(false);
      } else if (tempUrl === "File size exceeds the maximum limit of 10 MB.") {
        {
          CustomAlert(`${tempUrl}`,"error");
          setprogressBarDisplay(false);
        }
      } else {
        setImageUrl(tempUrl);
      }
    }
  };

  const uploadImageFunc = async () => {
    if (typeof imageUrl === "string") {
      try {
        setloading(true);
        const response = await uploadImageApi();
        if (response.message === "Image already exists") {
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
          setloading(false);
          return CustomAlert("This image already exists.","info");
        } else {
          const temp = response.photoFolder.images;
          const uploadedImage = temp[temp.length - 1];
          dispatch(uploadPhoto({ UfId: id, Uurl: uploadedImage }));
          CustomAlert("Success","success")
          closeModal();
          setImageUrl(null);
          setprogress(0);
          setprogressBarDisplay(false);
          setloading(false);
        }
      } catch (error) {
        console.log(error);
        setprogress(0);
        setprogressBarDisplay(false);
        setloading(false);
      }
    } else {
      setprogress(0);
      setprogressBarDisplay(false);
      setloading(false);
      return CustomAlert("Please fill all the details","error");
    }
  };
  return (
    <>
      <div onClick={openModal} className="flex items-center gap-2">
        <AddImage h={25} w={25} fill="black" /> Add a photo
      </div>
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
                    let newIndex = index % 7;
                    if (newIndex === 0) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "ds5fdn2yu",
                        "ss"
                      ); 
                    } else if (index === 1) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnr7thjlu",
                        "ss"
                      );
                    } else if (index === 2) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dimv7myy9",
                        "ss"
                      );
                    } else if (index === 3) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO",
                        "dimv7y9",
                        "4ff3af5727bbcad03796"
                      );
                    } else if (index === 4) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO",
                        "dimv7y9",
                        "25df74b02bcfa20387fd"
                      );
                    } else if (index === 5) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO",
                        "dimv7y9",
                        "f172a9bfe4613bd3df39"
                      );
                    } else if (index === 6) {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnsydvkyd",
                        "ss"
                      );
                    } else {
                      uplaodImageHelper(
                        newIndex,
                        e,
                        "DHEERAJ_PHOTO_POINT",
                        "dnsydvkyd",
                        "ss"
                      );
                    }
                  }}
                  type="file"
                  className="rounded-sm text-gray-800 p-2 w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div
                className={`${
                  progressBarDisplay ? "flex" : "hidden"
                } flex-col px-1`}
              >
                <i className="text-sm mb-1">
                  {progress === 100 ? "UPLOADED" : "Uploading image..."}
                </i>
                <ProgressBarComponent progress={progress} />
              </div>
              <div className="text-sm mt-6 font-semibold text-gray-800 mb-4">
                Are you sure you want to add this image?
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={uploadImageFunc}
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
