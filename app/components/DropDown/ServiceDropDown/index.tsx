'use client'
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import PhotoIcon from "@/public/assets/Icons/photo";
import VideoIcon from "@/public/assets/Icons/video";
import ImageRetouchIcon from "@/public/assets/Icons/imageRetouch";

import Link from "next/link";

const ServiceDropDown=()=> {
  return (
    <div className=" text-black text-right">
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex text-black hover:text-blue-500 w-full justify-center rounded-md">
            Services
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute right-0 mt-2 min-w-[12rem] origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    href="/components/Services/Photography"
                    className={`${
                  active ? "bg-blue-500 bg-opacity-90 text-white" : "text-black"
                    } group flex w-full items-center gap-4 rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <PhotoIcon fill="white" />
                    ) : (
                      <PhotoIcon fill="black" />
                    )}
                    <span>Photography</span> 
                  </Link>
                )}
              </Menu.Item>
              <hr />
              <Menu.Item>
                {({ active }) => (
                  <Link
                  href="/components/Services/VideoProduction"
                    className={`${
                      active ? "bg-blue-500 bg-opacity-90 text-white" : "text-black"
                    } group flex w-full items-center gap-4 rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <VideoIcon fill="white" />
                    ) : (
                      <VideoIcon fill="black" />
                    )}
                    <span>Video Production</span>
                  </Link>
                )}
              </Menu.Item>
              {/* <hr /> */}
              {/* <Menu.Item>
                {({ active }) => (
                  <Link href="/components/Services/ImageRetouching"
                    className={`${
                      active ? "bg-blue-500 bg-opacity-90 text-white" : "text-black"
                    } group flex w-full items-center gap-4 rounded-md px-2 py-2 text-sm`}
                  >
                    {active ? (
                      <ImageRetouchIcon fill="white" />
                    ) : (
                      <ImageRetouchIcon fill="black" />
                    )}
                    <span>Image Retouching</span>
                  </Link>
                )}
              </Menu.Item> */}
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
}

export default ServiceDropDown;