import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Cog6ToothIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaBlog, FaUserEdit, FaFileAlt, FaUsers, FaCalendarPlus, FaTags, FaWallet } from "react-icons/fa";
import { Link, Outlet, useLocation } from "react-router-dom";
import { userProfileAPI } from "../../APIServices/users/usersAPI";
import { useQuery } from "@tanstack/react-query";



function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function UserDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["userProfile"],
    queryFn: userProfileAPI,
  });

  const baseNavigation = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "Create New Post", href: "/dashboard/create-post", icon: FaUserEdit },
    { name: "My Posts", href: "/dashboard/posts", icon: FaFileAlt },
    { name: "My Followers", href: "/dashboard/my-followers", icon: FaUsers },
    { name: "My Followings", href: "/dashboard/my-followings", icon: FaUsers },
    //{ name: "Add Category", href: "/dashboard/add-category", icon: FaTags },
    { name: "My Earnings", href: "/dashboard/my-earnings", icon: FaWallet },
  ];

  // Add admin links if user is admin
  const navigation = [...baseNavigation];
  if (data?.user?.role === "admin") {
    navigation.push(
      { name: "Add Category", href: "/dashboard/add-category", icon: FaTags },
      { name: "Create Plan", href: "/dashboard/create-plan", icon: FaCalendarPlus },
      { name: "Users", href: "/dashboard/users", icon: FaUsers }
    );
  }

  const renderNavigation = () => (
    <ul className="-mx-2 space-y-1">
      {navigation.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <li key={item.name}>
            <Link
              to={item.href}
              className={classNames(
                isActive
                  ? "bg-gray-50 text-orange-600"
                  : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
              )}
            >
              <item.icon
                className={classNames(
                  isActive
                    ? "text-orange-600"
                    : "text-gray-400 group-hover:text-orange-600",
                  "h-6 w-6 shrink-0"
                )}
                aria-hidden="true"
              />
              {item.name}
            </Link>
          </li>
        );
      })}
    </ul>
  );

  return (
    <>
      {/* Mobile Sidebar */}
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                  <button
                    type="button"
                    className="-m-2.5 p-2.5"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4">
                  <div className="flex h-16 shrink-0 items-center">
                    <Link to="/">
                      <FaBlog className="h-8 w-auto text-orange-500" />
                    </Link>
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul className="flex flex-1 flex-col gap-y-7">
                      <li>{renderNavigation()}</li>
                      <li className="mt-auto">
                        <Link
                          to="/dashboard/settings"
                          className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                        >
                          <Cog6ToothIcon
                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                            aria-hidden="true"
                          />
                          Settings
                        </Link>
                      </li>

                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Desktop Sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <Link to="/">
              <FaBlog className="h-8 w-auto text-orange-500" />
            </Link>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul className="flex flex-1 flex-col gap-y-7">
              <li>{renderNavigation()}</li>
              <li className="mt-auto">
                <Link
                  to="/dashboard/settings"
                  className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                >
                  <Cog6ToothIcon
                    className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                    aria-hidden="true"
                  />
                  Settings
                </Link>
              </li>
            </ul>

          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="lg:pl-72">
        <div className="px-4 py-6">
          <Outlet />
        </div>
      </main>
    </>
  );
}
