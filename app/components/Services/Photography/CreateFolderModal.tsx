import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import PlusIcon from "@/public/assets/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import { createFolder } from "@/app/redux/actions/photographyReducerAction";
import ImageUpload from "../ImageUpload";
import ProgressBarComponent from "../../ProgressBar/ProgressBar";  
import CustomAlert from "../../Alert/Alert";

export default function CreateFolderModal({h,w}: {h:any,w:any}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [progressBarDisplay, setprogressBarDisplay] = useState(false);
  const [progress, setprogress] = useState(0)
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
    console.log(imageUrl)
  }, [imageUrl])
  
  const updateProgressDispatch=(progress:any)=>{
    setprogress(progress)
  }

  const createaFolderApi = async () => {
    try {
      const sendBody = {
        name: folderName,
        url: imageUrl,
      };
      const createdFolder = await fetch(
        "/api/routes/Photo/PhotoFolder/Create",
        {
          method: "POST",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sendBody),
        }
      );
      const res = await createdFolder.json();
      console.log(res.photoFolder);
      console.log("create folder",res);
      return res; // Return the created folder
    } catch (error) {
      console.log(error);
      throw new Error("Failed to create folder"); // Throw an error for better handling
    }
  };

  const createFolderFunc = async () => {
    if (typeof imageUrl === "string" && typeof folderName === "string") {
      try {
        setprogressBarDisplay(true)
        const response = await createaFolderApi();
        if (response.message === "Folder already exists.") {
          setImageUrl(null);
          setFolderName(null);
          setprogress(0);
          setprogressBarDisplay(false)
          return CustomAlert("Folder with the same name already exists.","error");
        } else {
          const createdPhotoFolder = response.photoFolder;
          console.log("createdPhotoFolder",createdPhotoFolder)
          dispatch(createFolder(createdPhotoFolder));
          console.log("createdPhotoFolder DISPATCHED")
          closeModal();
          setImageUrl(null);
          setFolderName(null);
          setprogress(0);
          setprogressBarDisplay(false)
        }
      } catch (error) {
        console.log(error);
        setprogress(0);
        setprogressBarDisplay(false)
      }
    } else {
      setprogress(0);
      setprogressBarDisplay(false)
      return CustomAlert("Please fill all the details","info");
    }
  };
  return (
    <>
      <div className=""> 
        <button
          onClick={openModal}
          className="flex items-center gap-3 text-white rounded-full  "
        >
          <PlusIcon h={h} w={w}/>
        </button>
      </div>

      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bg-black bg-opacity-30 inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex text-black items-center justify-center min-h-screen">
            <Dialog.Panel className="w-full max-w-md p-6 rounded-md bg-white shadow-xl sm: m-[12px]">
              <Dialog.Title className="text-xl text-gray-900 mb-4">
                <b className="uppercase">Create an Image Folder</b> 
              </Dialog.Title>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Folder Name<span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  onChange={(e: any) => setFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="rounded-sm border border-gray-300 py-2 px-3 w-full focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                 First Image<span className="text-red-600">*</span>
                </label>
                <input
                  onChange={async (e: any) => {
                    updateProgressDispatch(10)
                    setprogressBarDisplay(true);
                    updateProgressDispatch(30);
                    setImageUrl(
                      await ImageUpload(e, "DHEERAJ_PHOTO_POINT", "dnr7thjlu")
                    );
                    updateProgressDispatch(100);
                  }}
                  type="file"
                  className="rounded-sm text-gray-800 p-2 w-full border border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <div className={`${progressBarDisplay?"flex":"hidden"} flex-col px-1`}>
                <i className="text-sm mb-1">Uploading image</i>
                <ProgressBarComponent progress={progress} />
              </div>
              <div className="text-sm mt-6 font-semibold text-gray-800 mb-4">
                Are you sure you want to create this folder?
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={createFolderFunc}
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
