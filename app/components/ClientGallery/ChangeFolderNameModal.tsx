import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import WritingIcon from "@/public/assets/Icons/Writing";
import { useDispatch, useSelector } from "react-redux";
import { changeFolderNameClientGallery } from "@/app/redux/actions/clientGalleryAction";


const ChangeFolderNameModal = ({changeNameFid}:{changeNameFid:any}) => {
    let [isOpen, setIsOpen] = useState(false);
    const authtoken = useSelector(
        (state) => (state as any).userReducer?.authtoken
        );
        
        const photos = useSelector((state) => (state as any).clientGalleryReducer?.photos);
        const [newFolderName, setNewFolderName] = useState(photos.find((e:any)=>e._id===changeNameFid).name);
        const [newFolderGDriveLink, setNewFolderGDriveLink] = useState(photos.find((e:any)=>e._id===changeNameFid).link);
    function closeModal() {
      setIsOpen(false);
    }
  
    function openModal() {
      setIsOpen(true);
    }
  
    const dispatch = useDispatch();
  
    const changeFolderNameApi = async () => {
      try {
        const sentBody={
            name:newFolderName,
            link:newFolderGDriveLink
        }
        const updatedFolder = await fetch(
          `/api/routes/Photo/ClientGallery/ChangeFolderName?id=${changeNameFid}`,
          {
            method: "PUT",
            headers: {
              authtoken: authtoken,
            },
            body:JSON.stringify(sentBody)
          }
        );
        const res = await updatedFolder.json();
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
  
    const changeFolderNameFunc = async () => {
      dispatch(changeFolderNameClientGallery({changeNameFid,newFolderName})); 
      changeFolderNameApi();
    };
  return (
    <>
    <div className="">
      <button
        onClick={() => {
          openModal();
        }}
        className="flex w-full text-black items-center gap-3"
      >
        <WritingIcon h={21} w={21} fill="black" /> Change Folder Info
      </button>
    </div>

    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={closeModal}>
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
              <Dialog.Panel className="w-full  max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  Are you sure you want to change the name of this folder?
                </Dialog.Title>
                 <div className="w-full mt-8">
                  <input type="text" value={newFolderName} onChange={(e)=>setNewFolderName(e.target.value)} name="" className="border rounded-md p-2 w-full text-black" placeholder="Enter the new folder name" id="" />
                 </div>
                 <div className="w-full mt-8">
                  <input type="text" value={newFolderGDriveLink} onChange={(e)=>setNewFolderGDriveLink(e.target.value)} name="" className="border rounded-md p-2 w-full text-black" placeholder="Enter the new folder G Drive Link" id="" />
                 </div>
                <div className="mt-8 gap-2 flex justify-center">
                  <button
                    type="button"
                    className="inline-flex min-w-[4rem] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                    onClick={() => {
                      closeModal();
                      changeFolderNameFunc();
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
  )
}

export default ChangeFolderNameModal