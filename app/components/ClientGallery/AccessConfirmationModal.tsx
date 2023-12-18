"use client"
import { Dialog, Transition } from '@headlessui/react'
import { useRouter } from 'next/navigation'
import { Fragment, useEffect, useState } from 'react'

export default function AccessConfirmationModal({photos,index,isAccessConfirmationModalOpen,setisAccessConfirmationModalOpen}:{photos:any,index:any,isAccessConfirmationModalOpen:boolean,setisAccessConfirmationModalOpen:any}) {
  let [isOpen, setIsOpen] = useState(false)
  const [password, setpassword] = useState("")
  const router=useRouter();
  const decideAccess=()=>{
  if(password===photos?.password){
    router.push(`/components/ClientGallery/Photos?id=${photos?._id}&index=${index}`);
  }else{
  return alert("Access denied. Incorrect password");
  }
}
  
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }

  const getPassword=(e:any)=>{
    setpassword(e.target.value)
  }
  
  useEffect(() => {
   if(isAccessConfirmationModalOpen){
    setIsOpen(true)
    setisAccessConfirmationModalOpen(false);
   }
  }, [isAccessConfirmationModalOpen])
  

  return (
  <div className='z-50'>

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
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Enter the password
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                      You will be given access to the gallery once you have entered the correct <b>password</b> provided to you.
                    </p>
                  </div>
                  <div className='pt-3'>
                    <input value={password} onChange={(e)=>getPassword(e)} type="text" placeholder='Enter the password' className='w-full text-sm focus:outline-none placeholder:text-sm p-2 text-black  rounded-md border border-black border-opacity-50'/>
                  </div>
                  <div className="mt-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={()=>{closeModal(); decideAccess();}}
                    >
                     Enter
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  )
}
