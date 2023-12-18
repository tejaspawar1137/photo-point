import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect, useState } from "react";
import AddImage from "@/public/assets/Icons/AddImage";
import { useDispatch, useSelector } from "react-redux"; 
import { uploadVideo } from "@/app/redux/actions/videoAction";

export default function UploadVideoModal({
  id,
  index,
}: {
  id: any;
  index: any;
}) {
  const dispatch = useDispatch();
  let [isOpen, setIsOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(""); 
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
    console.log(videoUrl);
    console.log(index);
  }, [videoUrl, index]);

  const uploadVideoApi = async () => {
    try {
      const sendBody = {
        url: videoUrl,
      };
      const createdFolder = await fetch(
        `/api/routes/Video/VideoFolder/Upload?id=${id}`,
        {
          method: "PUT",
          headers: {
            authtoken: authtoken,
          },
          body: JSON.stringify(sendBody),
        }
      );
      const res = await createdFolder.json(); 
      console.log(res);
      return res.videoFolder
    } catch (error) {
      throw new Error("Failed to create folder"); // Throw an error for better handling
    }
  };


  const uploadVideoFunc = async () => {
    const response=await uploadVideoApi();
    const temp = response.images;
    const uploadedVideo = temp[temp.length - 1];
    dispatch(uploadVideo({ UfId: id, Uurl: uploadedVideo }));
    closeModal();
  };
  return (
    <>
      <div onClick={openModal} className="flex items-center gap-2">
        <AddImage h={25} w={25}  fill="black" /> Add a video
      </div>
      <Transition show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed bg-black bg-opacity-10 inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="flex  text-black items-center justify-center min-h-screen">
            <Dialog.Panel className="w-full max-w-md p-6 rounded-md bg-white shadow-xl">
              <Dialog.Title className="text-xl font-semibold text-gray-900 mb-4">
                Upload video 
              </Dialog.Title>
              <div className="mb-6">
                <label htmlFor="" className="text-black text-opacity-60 text-sm">Enter the url of the video that you want to upload</label>
                 <input type="text" value={videoUrl} onChange={(e)=>{setVideoUrl(e.target.value)}} placeholder="URL" className="w-full outline-none border border-black border-opacity-60 my-2  text-black rounded-md p-2 placeholder:text-black placeholder:text-opacity-60 placeholder:text-sm" />
                </div>
              <div className="text-sm mt-6 font-semibold text-gray-800 mb-4">
                Are you sure you want to upload this video?
              </div>
              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={uploadVideoFunc}
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
