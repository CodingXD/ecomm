import Link from "next/link";
import MobileNavbar from "./mobile-navbar";
import {
  MagnifyingGlassIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";
import Toggle from "./toggle";
import NavItem from "./nav-item";
import { navigation, topNavigation } from "~/lib/constants/routes";

export default function Navbar() {
  return (
    <div className="bg-white">
      {/* Mobile menu */}
      <MobileNavbar />

      <header className="relative">
        <nav aria-label="Top">
          {/* Top navigation */}
          <div>
            <div className="mx-auto flex h-10 max-w-7xl items-center justify-end px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                {topNavigation.map((item) => (
                  <NavItem key={item.href} {...item} />
                ))}
              </div>
            </div>
          </div>

          {/* Secondary navigation */}
          <div className="bg-white">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className="border-b border-gray-200">
                <div className="flex h-16 items-center justify-between">
                  {/* Logo (lg+) */}
                  <div className="hidden lg:flex lg:flex-1 lg:items-center">
                    <Link href="/" className="font-bold lg:text-3xl">
                      ECOMMERCE
                    </Link>
                  </div>

                  {/* Mobile menu and search (lg-) */}
                  <div className="flex flex-1 items-center lg:hidden">
                    <Toggle />
                  </div>

                  {/* Logo (lg-) */}
                  <Link href="/" className="font-bold lg:hidden lg:text-2xl">
                    ECOMMERCE
                  </Link>

                  <div className="hidden lg:flex lg:gap-x-12">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="text-sm font-semibold leading-6 text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>

                  <div className="flex flex-1 items-center justify-end">
                    <div className="flex items-center lg:ml-8">
                      <a href="#" className="group -m-2 flex items-center p-2">
                        <MagnifyingGlassIcon
                          className="size-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                          aria-hidden="true"
                        />
                      </a>
                      {/* Cart */}
                      <div className="ml-4 flow-root lg:ml-8">
                        <a
                          href="#"
                          className="group -m-2 flex items-center p-2"
                        >
                          <ShoppingCartIcon
                            className="size-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                            aria-hidden="true"
                          />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
