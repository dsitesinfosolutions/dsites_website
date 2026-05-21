import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { servicesData } from "../data/services"; // Import your services data

export function Navbar() {
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-white shadow-md relative z-50">
      {/* Company Logo - Made bigger and more visible */}
      <Link to="/" className="flex items-center gap-2">
        {/* If you have an image logo, uncomment and use the img tag below instead of the text: */}
        {/* <img src="/logo.png" alt="D-Sites Logo" className="h-14 w-auto" /> */}
        <span className="text-3xl font-extrabold text-blue-900 tracking-wider">D-SITES</span>
      </Link>

      {/* Navigation Links - Increased gap and text size */}
      <div className="flex gap-8 items-center text-lg">
        <Link to="/" className="hover:text-blue-600 font-medium">
          Home
        </Link>

        {/* Services Dropdown Trigger */}
        <div
          className="relative group"
          onMouseEnter={() => setIsServicesDropdownOpen(true)}
          onMouseLeave={() => setIsServicesDropdownOpen(false)}
        >
          <Link to="/services" className="hover:text-blue-600 font-medium">
            Services
          </Link>

          {/* The Dropdown Menu */}
          {isServicesDropdownOpen && (
            <div className="absolute left-0 mt-4 w-64 bg-white border border-gray-200 rounded-md shadow-lg">
              <ul className="flex flex-col py-2">
                {servicesData.map((service) => (
                  <li key={service.id}>
                    {/* Using @ts-expect-error as TanStack Router expects literal strings for 'to', but we are passing dynamic strings here */}
                    {/* @ts-expect-error */}
                    <Link
                      to={`/services/${service.id}`}
                      className="block px-4 py-3 text-base text-gray-700 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                      onClick={() => setIsServicesDropdownOpen(false)}
                    >
                      {service.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
