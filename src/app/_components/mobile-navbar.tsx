"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import useConfigStore from "~/store/config";
import { navigation } from "~/lib/constants/routes";

export default function MobileNavbar() {
  const { isMenuOpen, setConfig } = useConfigStore();
  return (
    <Transition.Root show={isMenuOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-40 lg:hidden"
        onClose={() => setConfig({ key: "isMenuOpen", value: false })}
      >
        <Transition.Child
          as={Fragment}
          enter="transition-opacity ease-linear duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="transition-opacity ease-linear duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-40 flex">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
              <div className="flex px-4 pb-2 pt-5">
                <button
                  type="button"
                  className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                  onClick={() => setConfig({ key: "isMenuOpen", value: false })}
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon className="size-6" aria-hidden="true" />
                </button>
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                {navigation.map((page) => (
                  <div key={page.name} className="flow-root">
                    <Link
                      href={page.href}
                      className="-m-2 block p-2 font-medium text-gray-900"
                    >
                      {page.name}
                    </Link>
                  </div>
                ))}
              </div>

              <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                <div className="flow-root">
                  <Link
                    href="/signup"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Create an account
                  </Link>
                </div>
                <div className="flow-root">
                  <Link
                    href="/login"
                    className="-m-2 block p-2 font-medium text-gray-900"
                  >
                    Sign in
                  </Link>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
