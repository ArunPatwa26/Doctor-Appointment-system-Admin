import React, { useEffect, useContext } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const AllAppointments = () => {
  const { aToken, appointments, getAllAppointments, cancelAppointment } = useContext(AdminContext);
  const { calculateAge, slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (aToken) {
      getAllAppointments();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">All Appointments</h1>
        <p className="text-gray-600">Manage all appointments in your clinic</p>
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Desktop Table */}
        <div className="hidden md:block">
          <div className="grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Patient</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-2">Date & Time</div>
            <div className="col-span-3">Doctor</div>
            <div className="col-span-1">Fees</div>
            <div className="col-span-1">Status</div>
          </div>

          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div key={index} className="grid grid-cols-12 gap-4 px-6 py-4 items-center border-t border-gray-200 hover:bg-gray-50">
                <div className="col-span-1 text-gray-600">{index + 1}</div>
                <div className="col-span-3 flex items-center">
                  <img
                    src={item.userData.image}
                    alt={item.userData?.name || "Patient"}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-900 truncate">
                    {item.userData?.name || "No Name"}
                  </span>
                </div>
                <div className="col-span-1 text-gray-600">{calculateAge(item.userData.dob)}</div>
                <div className="col-span-2 text-gray-600">
                  {slotdateFormate(item.slotDate)} {item.slotTime}
                </div>
                <div className="col-span-3 flex items-center">
                  <img
                    src={item.docData.image}
                    alt={item.docData?.name || "Doctor"}
                    className="h-10 w-10 rounded-full mr-3"
                  />
                  <span className="font-medium text-gray-900 truncate">
                    {item.docData.name}
                  </span>
                </div>
                <div className="col-span-1 text-gray-600">${item.docData.fees}</div>
                <div className="col-span-1">
                  {item.cancelled ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                      Completed
                    </span>
                  ) : (
                    <button
                      onClick={() => cancelAppointment(item._id)}
                      className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                      aria-label="Cancel appointment"
                    >
                      <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="px-6 py-12 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no appointments scheduled yet.
              </p>
            </div>
          )}
        </div>

        {/* Mobile List */}
        <div className="md:hidden">
          {appointments && appointments.length > 0 ? (
            appointments.map((item, index) => (
              <div key={index} className="p-4 border-t border-gray-200 hover:bg-gray-50">
                <div className="flex justify-between items-start">
                  <div className="flex items-center">
                    <img
                      src={item.userData.image}
                      alt={item.userData?.name || "Patient"}
                      className="h-12 w-12 rounded-full mr-3"
                    />
                    <div>
                      <h3 className="font-medium text-gray-900">{item.userData?.name || "No Name"}</h3>
                      <p className="text-sm text-gray-500">
                        Age: {calculateAge(item.userData.dob)}
                      </p>
                    </div>
                  </div>
                  <div>
                    {item.cancelled ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : item.isCompleted ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <button
                        onClick={() => cancelAppointment(item._id)}
                        className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                        aria-label="Cancel appointment"
                      >
                        <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="text-gray-900">
                      {slotdateFormate(item.slotDate)} {item.slotTime}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-500">Doctor</p>
                    <div className="flex items-center">
                      <img
                        src={item.docData.image}
                        alt={item.docData?.name || "Doctor"}
                        className="h-6 w-6 rounded-full mr-1"
                      />
                      <p className="truncate">{item.docData.name}</p>
                    </div>
                  </div>
                  <div>
                    <p className="text-gray-500">Fees</p>
                    <p className="text-gray-900">${item.docData.fees}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-6 text-center">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No appointments</h3>
              <p className="mt-1 text-sm text-gray-500">
                There are no appointments scheduled yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AllAppointments;