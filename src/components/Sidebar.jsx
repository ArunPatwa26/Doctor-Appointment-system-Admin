import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { assets } from '../assets/assets_admin/assets';
import { AdminContext } from '../context/AdminContext';
import { DoctorContext } from '../context/DoctorContext';

const Sidebar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button (only visible on small screens) */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-md bg-indigo-600 text-white focus:outline-none"
          aria-label="Toggle menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMobileMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed lg:static inset-y-0 left-0 transform ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-64 bg-white shadow-lg flex flex-col`}
      >
        {/* Sidebar Content */}
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between px-4 lg:hidden">
            <h2 className="text-xl font-semibold text-gray-800">
              {aToken ? 'Admin' : 'Doctor'} Menu
            </h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 rounded-md hover:bg-gray-100 focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="mt-5 flex-1 px-2 space-y-1">
            {aToken && (
              <>
                <NavLink
                  to="/admin-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.home_icon} alt="Home" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Dashboard</span>
                </NavLink>

                <NavLink
                  to="/all-appointments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Appointments</span>
                </NavLink>

                <NavLink
                  to="/add-doctor"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.add_icon} alt="Add Doctor" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Add Doctor</span>
                </NavLink>

                <NavLink
                  to="/doctor-list"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.people_icon} alt="Doctor List" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Doctor List</span>
                </NavLink>
              </>
            )}

            {dToken && (
              <>
                <NavLink
                  to="/doctor-dashboard"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.home_icon} alt="Dashboard" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Dashboard</span>
                </NavLink>

                <NavLink
                  to="/doctor-appointments"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.appointment_icon} alt="Appointments" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Appointments</span>
                </NavLink>

                <NavLink
                  to="/doctor-profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group flex items-center px-2 py-3 text-sm font-medium rounded-md transition-colors ${
                      isActive
                        ? 'bg-indigo-100 text-indigo-700 border-r-4 border-indigo-600'
                        : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-700'
                    }`
                  }
                >
                  <img src={assets.people_icon} alt="Profile" className="w-5 h-5 mr-3" />
                  <span className="flex-1">Profile</span>
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>

      {/* Overlay for mobile (only visible when menu is open) */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;