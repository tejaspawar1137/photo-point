import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Dustbin from "@/public/assets/Icons/dustbin";
import { useDispatch, useSelector } from "react-redux"; 
import { deleteAPhotoClientGallery } from "@/app/redux/actions/clientGalleryAction";

export default function DeleteImageModal({ id, url,sethitRedux }: { id: any; url: any,sethitRedux:any }) {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  const dispatch = useDispatch();
  const authtoken = useSelector(
    (state) => (state as any).userReducer?.authtoken
  );

  const deleteImageApi = async () => {
    try {
      const sentBody = {
        url: url,
      };
      const deletedImage = await fetch(
        `/api/routes/Photo/ClientGallery/DeleteImage?id=${id}`,
        {
          method: "PUT",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sentBody),
        }
      );
      const res = await deletedImage.json();
      sethitRedux((prev:any)=>prev+1);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  const deletePhoto = () => {
    dispatch(deleteAPhotoClientGallery({ id, url }));
    deleteImageApi();
  };

  return (
    <>
      <div className="text-black">
        <button type="button" onClick={openModal} className="bg-blue-500  bg-opacity-60 flex justify-center  w-[2.5rem] px-2 py-2 rounded-sm">
          <Dustbin w={20} h={20} fill="white" />
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
                    Are you sure you want to delete this image?
                  </Dialog.Title>

                  <div className="mt-8 gap-2 flex justify-center">
                    <button
                      type="button"
                      className="inline-flex min-w-[4rem] justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={() => {
                        closeModal();
                        deletePhoto();
                        sethitRedux((prev:any)=>prev+1);
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
