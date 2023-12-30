import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Dustbin from "@/public/assets/Icons/dustbin";
import { useDispatch, useSelector } from "react-redux";
import { deleteAFolder } from "@/app/redux/actions/photographyReducerAction";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomAlert from "../../Alert/Alert";
export default function DeleteFolderModal({
  fId,
  setFoldername,
  setloading
  
}: {
  fId: any;
  setFoldername: any;
  setloading:any;
}) {
  let [isOpen, setIsOpen] = useState(false);
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();

  const deleteFolderApi = async () => {
    try {
      const deletedFolder = await fetch(
        `/api/routes/Photo/PhotoFolder/DeleteFolder?id=${fId}`,
        {
          method: "PUT",
          headers: {
            authtoken: authtoken,
          },
        }
      );
      const res = await deletedFolder.json(); 
      CustomAlert("Photography Folder Deleted Successfully","success")
    } catch (error) {
      CustomAlert("Error, try again","error")
      console.log("error");
    }
  };

  const deleteFolder = async () => {
    setloading(true);
    dispatch(deleteAFolder(fId));
    setFoldername(0);
    deleteFolderApi();
    setloading(false);
  };

  return (
    <>
      <div className="">
        <button
          onClick={() => {
            openModal();
          }}
          className="flex  items-center gap-3"
        >
          <Dustbin h={21} w={21} fill="black" /> Delete Folder
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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Are you sure you want to delete this folder?
                  </Dialog.Title>

                  <div className="mt-8 gap-2 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex min-w-[4rem] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        deleteFolder();
                      }}
                    >
                      Yes
                    </button>
                    <button
                      type="button"
                      className="inline-flex min-w-[4rem] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      No
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
