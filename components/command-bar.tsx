"use client";
import React, { useState, useEffect, Fragment } from "react";
import { Dialog, Combobox, Transition } from "@headlessui/react";
import { Product } from "@/type";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSearch } from "@/hooks/use-search";
import NoResults from "./ui/no-results";

interface CommandBarProps {
  items: Product[];
  valueKey?: string;
}

const CommandBar: React.FC<CommandBarProps> = ({ 
  items
}) => {
  const [query, setQuery] = useState("");

  const toggle = useSearch((store) => store.toggle);
  const isOpen = useSearch((store) => store.isOpen);
  const onClose = useSearch((store) => store.onClose);

  const router = useRouter();

  const filterProducts = query
    ? items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  useEffect(() => {
    const onKeyDown = (event: any) => {
      if (event.key === "/" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault();
        toggle();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [toggle]);

  return (
    <Transition.Root
      show={isOpen}
      as={Fragment}
      afterLeave={() => setQuery("")}
    >
      <Dialog
        onClose={onClose}
        className="fixed inset-0 overflow-y-auto p-4 pt-[25vh]"
      >
        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Dialog.Overlay className=" fixed inset-0 bg-gray-500/70 backdrop-blur-sm" />
        </Transition.Child>

        <Transition.Child
          enter="duration-300 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-200 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Combobox
            as="div"
            className=" overflow-hidden relative rounded-xl shadow-2xl divide-y divide-gray-200 bg-white mx-auto max-w-xl"
            onChange={(item) => {
              toggle();
              {filterProducts.map((item) => (
                router.push(`/product/${item.id}`)
              ))}
            }}
          >
            <div className="flex justify-center items-center">
              <Search size={20} className=" text-gray-400 ml-2" />
              <Combobox.Input
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                className=" w-full py-3 px-2 bg-transparent border-0 focus:outline-none focus:ring-0"
                placeholder="Search..."
              />
            </div>

            {filterProducts.length > 0 && (
              <Combobox.Options
                static
                className="group max-h-96 overflow-x-hidden truncate overflow-y-auto py-4"
              >
                {filterProducts.map((item) => (
                  <Combobox.Option key={item.id} value={item}>
                    {({ active }) => (
                      <div
                        className={`space-x-1 py-2 px-2 ${
                          active ? "bg-blue-600" : "bg-white"
                        }`}
                      >
                        <span
                          className={`py-2 px-2 ${
                            active ? "text-white" : "text-gray-700"
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                    )}
                  </Combobox.Option>
                ))}
              </Combobox.Options>
            )}
            {query && filterProducts.length === 0 && <NoResults />}
          </Combobox>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
};

export default CommandBar;
