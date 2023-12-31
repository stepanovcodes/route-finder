import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-router-dom";
import { Fragment, useState, useRef, useEffect } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  MapPinIcon,
  Cog6ToothIcon,
  TruckIcon,
  ShoppingBagIcon,
  WrenchIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon /*PhoneIcon, PlayCircleIcon*/,
} from "@heroicons/react/20/solid";
import LoginButton from "../Auth/LoginButton";
import LogoutButton from "../Auth/LogoutButton";

const inputs = [
  {
    name: "Locations",
    description: "Set physical points that need to be visited",
    href: "/locations",
    icon: MapPinIcon,
  },
  {
    name: "Vehicles",
    description: "Set machines that travel between your locations",
    href: "/vehicles",
    icon: TruckIcon,
  },
  {
    name: "Services",
    description: "Set orders that do not consume capacity of vehicle",
    href: "/services",
    icon: WrenchIcon,
  },
  {
    name: "Shipments",
    description: "Set orders that need to be picked up and delivered",
    href: "/shipments",
    icon: ShoppingBagIcon,
  },
  {
    name: "Settings",
    description: "Setup vehicle capacities, capabilities, and breaks",
    href: "/settings",
    icon: Cog6ToothIcon,
  },
];
// const callsToAction = [
//   { name: 'Watch demo', href: '#', icon: PlayCircleIcon },
//   { name: 'Contact sales', href: '#', icon: PhoneIcon },
// ]

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Navigation() {
  const { isLoading, isAuthenticated } = useAuth0();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const popoverRef = useRef(null);

  function togglePopover() {
    setIsPopoverOpen(!isPopoverOpen);
  }

  function closePopover() {
    setIsPopoverOpen(false);
  }

  // Add an event listener to detect clicks outside of the Popover.Panel
  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        closePopover();
      }
    }

    if (isPopoverOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isPopoverOpen]);

  return (
    <>
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            {/* <a href="/" className="-m-1.5 p-1.5"> */}
            <span className="sr-only">Your Company</span>
            <img
              className="h-8 w-auto"
              src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
              alt=""
            />
            {/* </a> */}
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12">
          <Popover className="relative">
            <Popover.Button
              className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900"
              onClick={togglePopover}
            >
              Input
              <ChevronDownIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              show={isPopoverOpen}
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
              // onExited={closePopover}
            >
              <Popover.Panel
                ref={popoverRef}
                className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5"
              >
                <div className="p-4">
                  {inputs.map((item) => (
                    <div
                      key={item.name}
                      className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                    >
                      <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                        <item.icon
                          className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <Link
                          to={item.href}
                          className="block font-semibold text-gray-900"
                          onClick={togglePopover}
                        >
                          {/* <a href={item.href} className="block font-semibold text-gray-900"> */}
                          {item.name}
                          <span className="absolute inset-0" />
                          {/* </a> */}
                        </Link>
                        <p className="mt-1 text-gray-600">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                    >
                      <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                      {item.name}
                    </a>
                  ))}
                </div> */}
              </Popover.Panel>
            </Transition>
          </Popover>
          <Link
            to="/problems"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {/* <a href="/problems" className="text-sm font-semibold leading-6 text-gray-900"> */}
            Create Routing Problem
            {/* </a> */}
          </Link>
          <Link
            to="/solutions"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            {/* <a href="/solutions" className="text-sm font-semibold leading-6 text-gray-900"> */}
            View Routing Solutions
            {/* </a> */}
          </Link>
          {/* <a href="#" className="text-sm font-semibold leading-6 text-gray-900">
            Company
          </a> */}
        </Popover.Group>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {!isLoading ? (
              isAuthenticated ? (
                <LogoutButton />
              ) : (
                <LoginButton />
              )
            ) : null}
          </div>
          {/* <Link to="/" className="text-sm font-semibold leading-6 text-gray-900"> 
             <a href="#" className="text-sm font-semibold leading-6 text-gray-900"> 
             Log in <span aria-hidden="true">&rarr;</span> 
             </a>
             </Link>  */}
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              {/* <a href="/" className="-m-1.5 p-1.5"> */}
              <span className="sr-only">Your Company</span>
              <img
                className="h-8 w-auto"
                src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                alt=""
              />
              {/* </a> */}
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Disclosure as="div" className="-mx-3">
                  {({ open }) => (
                    <>
                      <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                        Input
                        <ChevronDownIcon
                          className={classNames(
                            open ? "rotate-180" : "",
                            "h-5 w-5 flex-none"
                          )}
                          aria-hidden="true"
                        />
                      </Disclosure.Button>
                      <Disclosure.Panel className="mt-2 space-y-2">
                        {[...inputs /*...callsToAction*/].map((item) => (
                          <Link to={item.href}>
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              // href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          </Link>
                        ))}
                      </Disclosure.Panel>
                    </>
                  )}
                </Disclosure>
                <Link
                  to="/problems"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {/* <a
                  href="/problems"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                > */}
                  Create Routing Problem
                  {/* </a> */}
                </Link>
                <Link
                  to="/solutions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {/* <a
                  href="/solutions"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                > */}
                  View Routing Solutions
                  {/* </a> */}
                </Link>
                {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  Company
                </a> */}
              </div>
              <div className="py-6">
                <Link
                  to="/"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                >
                  {/* <a
                  href="#"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                > */}
                  Log in
                  {/* </a> */}
                </Link>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
