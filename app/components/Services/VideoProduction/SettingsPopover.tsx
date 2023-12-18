import { Dialog, Transition } from "@headlessui/react"; 
import { Fragment, useState } from "react";
import SettingIcon from "@/public/assets/Icons/settingIcon";
import DeleteFolderModal from "./DeleteFolderModal";
import ChangeFolderNameModal from "./ChangeFolderNameModal";
import UploadPhotoModal from "./UploadVideoModal";
 


export default function SettingPopover({fId,setFoldername,index}:{fId:any,setFoldername:any,index:any}) {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="">
        <button
          type="button"
          onClick={openModal}
          className="outline-none self-center items-center "
        >
          <SettingIcon h={15} w={15} fill="black" />
        </button>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="shadow-xl text-black  bg-white rounded-md px-2 py-2 flex flex-col gap-1">
                <div className="flex hover:bg-gray-200 p-2 focus:bg-gray-200  rounded-lg items-center gap-2"><UploadPhotoModal index={index} id={fId}/></div>    
                  <hr />             
                  <div className=" hover:bg-gray-200 focus:bg-gray-200 p-2  rounded-lg "><DeleteFolderModal setFoldername={setFoldername} fId={fId}/></div>  
                  <hr /> 
                  <div className=" hover:bg-gray-200 focus:bg-gray-200  p-2  rounded-lg  "><ChangeFolderNameModal changeNameFid={fId}/></div>               

                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
