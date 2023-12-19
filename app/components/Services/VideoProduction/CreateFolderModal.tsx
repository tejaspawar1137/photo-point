import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import PlusIcon from "@/public/assets/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux"; 
import { createVideoFolder } from "@/app/redux/actions/videoAction";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
export default function CreateFolderModal({}: {}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [folderName, setFolderName] = useState<any>(null);
  const [imageUrl, setImageUrl] = useState<any>(null);  
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
 

  const createaFolderApi = async () => {
    try {
      const sendBody = {
        name: folderName,
        url: imageUrl,
      };
      const createdFolder = await fetch(
        "/api/routes/Video/VideoFolder/Create",
        {
          method: "POST",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sendBody),
        }
      );
      const res = await createdFolder.json();
      console.log(res.videoFolder);
      return res.videoFolder; // Return the created folder
    } catch (error) {
      console.log(error);
      toast.error("Failed to create the folder, please try again.")
      throw new Error("Failed to create folder"); // Throw an error for better handling
    }
  };

  const createFolderFunc = async () => {
    if(typeof imageUrl === "string" && typeof folderName === "string"){
      const createdFolder=await createaFolderApi();  
      dispatch(createVideoFolder(createdFolder));
      closeModal(); 
    }else{
      return toast.error("Please fill both the details")
    }
  };
  return (
    <>
      <div className="">
        <ToastContainer></ToastContainer>
        <button
          onClick={openModal}
          className=" items-center gap-3 hidden md:flex text-white rounded-full  "
        >
          <PlusIcon h={35} w={35}/>
        </button>
      </div>
      <div className="">
        <button
          onClick={openModal}
          className="flex items-center gap-3 md:hidden text-white rounded-full  "
        >
          <PlusIcon h={25} w={25}/>
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
              <Dialog.Title className="text-xl text-gray-900 uppercase mb-4">
               Create a Video Folder  
              </Dialog.Title>
              <div className="mb-6">
                <label className="block text-sm  text-gray-800  ">
                  Folder Name 
                </label>
                <input
                  type="text"
                  onChange={(e: any) => setFolderName(e.target.value)}
                  placeholder="Enter folder name"
                  className="w-full outline-none border border-black border-opacity-60 my-2  text-black rounded-md p-2 placeholder:text-black placeholder:text-opacity-60 placeholder:text-sm"
                />
              </div>
              <div className="mb-6">
              <label className="block text-sm  text-gray-800  ">
                 First Video 
                </label>
                 <input type="text" value={imageUrl} onChange={(e)=>{setImageUrl(e.target.value)}} placeholder="URL" className="w-full outline-none border border-black border-opacity-60 my-2  text-black rounded-md p-2 placeholder:text-black placeholder:text-opacity-60 placeholder:text-sm" />
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
