import React, { useContext, useEffect } from 'react';
import { DoctorContext } from '../../context/DoctorContext';
import { AppContext } from '../../context/AppContext';
import { assets } from '../../assets/assets_admin/assets';

const DoctorAppointments = () => {
  const { dToken, appointments, getAppointments, cancelAppointment, completeAppointment } = useContext(DoctorContext);
  const { calculateAge, slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getAppointments();
    }
  }, [dToken, getAppointments]);

  return (
    <div className="bg-gray-50 min-h-screen pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-6 pb-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage all your upcoming and past appointments
          </p>
        </div>

        {/* Appointment Cards */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Desktop Table Header */}
          <div className="hidden md:grid grid-cols-12 gap-4 bg-gray-50 px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">#</div>
            <div className="col-span-3">Patient</div>
            <div className="col-span-1">Payment</div>
            <div className="col-span-1">Age</div>
            <div className="col-span-3">Date & Time</div>
            <div className="col-span-1">Fees</div>
            <div className="col-span-2">Status</div>
          </div>

          {appointments && appointments.length > 0 ? (
            [...appointments].reverse().map((appointment, index) => (
              <div
                key={appointment._id}
                className="border-t border-gray-200 hover:bg-gray-50 transition-colors duration-150"
              >
                {/* Desktop View */}
                <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-1 text-gray-600">{index + 1}</div>
                  <div className="col-span-3 flex items-center">
                    <img
                      src={appointment.userData.image}
                      alt={appointment.userData.name}
                      className="h-10 w-10 rounded-full mr-3"
                    />
                    <span className="font-medium text-gray-900">
                      {appointment.userData.name}
                    </span>
                  </div>
                  <div className={`col-span-1 ${appointment.payment ? 'text-green-600' : 'text-yellow-600'}`}>
                    {appointment.payment ? 'Online' : 'Cash'}
                  </div>
                  <div className="col-span-1 text-gray-600">
                    {calculateAge(appointment.userData.dob)}
                  </div>
                  <div className="col-span-3 text-gray-600">
                    {slotdateFormate(appointment.slotDate)} at {appointment.slotTime}
                  </div>
                  <div className="col-span-1 text-gray-600">${appointment.amount}</div>
                  <div className="col-span-2">
                    {appointment.cancelled ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        Cancelled
                      </span>
                    ) : appointment.isCompleted ? (
                      <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                        Completed
                      </span>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => cancelAppointment(appointment._id)}
                          className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                          title="Cancel Appointment"
                        >
                          <img src={assets.cancel_icon} alt="Cancel" className="h-5 w-5" />
                        </button>
                        <button
                          onClick={() => completeAppointment(appointment._id)}
                          className="p-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                          title="Complete Appointment"
                        >
                          <img src={assets.tick_icon} alt="Complete" className="h-5 w-5" />
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Mobile View */}
                <div className="md:hidden p-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center">
                      <img
                        src={appointment.userData.image}
                        alt={appointment.userData.name}
                        className="h-12 w-12 rounded-full mr-3"
                      />
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.userData.name}</h3>
                        <p className="text-sm text-gray-500">
                          Age: {calculateAge(appointment.userData.dob)}
                        </p>
                      </div>
                    </div>
                    <div>
                      {appointment.cancelled ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                          Cancelled
                        </span>
                      ) : appointment.isCompleted ? (
                        <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                          Completed
                        </span>
                      ) : (
                        <div className="flex space-x-1">
                          <button
                            onClick={() => cancelAppointment(appointment._id)}
                            className="p-1 rounded-md bg-red-50 text-red-600 hover:bg-red-100"
                            title="Cancel"
                          >
                            <img src={assets.cancel_icon} alt="Cancel" className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => completeAppointment(appointment._id)}
                            className="p-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100"
                            title="Complete"
                          >
                            <img src={assets.tick_icon} alt="Complete" className="h-5 w-5" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <p className="text-gray-500">Date & Time</p>
                      <p className="text-gray-900">
                        {slotdateFormate(appointment.slotDate)} at {appointment.slotTime}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Payment</p>
                      <p className={appointment.payment ? 'text-green-600' : 'text-yellow-600'}>
                        {appointment.payment ? 'Online' : 'Cash'}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500">Fees</p>
                      <p className="text-gray-900">${appointment.amount}</p>
                    </div>
                  </div>
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
                You don't have any appointments scheduled yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorAppointments;