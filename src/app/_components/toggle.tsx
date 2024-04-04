"use client";

import { Bars3Icon } from "@heroicons/react/24/outline";
import useConfigStore from "~/store/config";

export default function Toggle() {
  const setConfig = useConfigStore((state) => state.setConfig);
  return (
    <button
      type="button"
      className="-ml-2 rounded-md bg-white p-2 text-gray-400"
      onClick={() => setConfig({ key: "isMenuOpen", value: true })}
    >
      <span className="sr-only">Open menu</span>
      <Bars3Icon className="size-6" aria-hidden="true" />
    </button>
  );
}
