import React, { useContext, useEffect } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets_admin/assets";

const DoctorDashboard = () => {
  const {
    dashData,
    dToken,
    getDashData,
    cancelAppointment,
    completeAppointment,
  } = useContext(DoctorContext);
  const { slotdateFormate } = useContext(AppContext);

  useEffect(() => {
    if (dToken) {
      getDashData();
    }
  }, [dToken, getDashData]);

  if (!dashData) return <div className="flex justify-center items-center h-screen">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Doctor Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here's your overview</p>
      </div>

      {/* Stats Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        {/* Earnings Card */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl shadow-md p-4 md:p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-blue-400 bg-opacity-30 mr-4">
              <img src={assets.earning_icon} alt="Earnings" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-80">Total Earnings</p>
              <p className="text-2xl md:text-3xl font-bold">${dashData.earnings}</p>
            </div>
          </div>
        </div>

        {/* Appointments Card */}
        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl shadow-md p-4 md:p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-purple-400 bg-opacity-30 mr-4">
              <img src={assets.appointments_icon} alt="Appointments" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-80">Total Appointments</p>
              <p className="text-2xl md:text-3xl font-bold">{dashData.appointments}</p>
            </div>
          </div>
        </div>

        {/* Patients Card */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl shadow-md p-4 md:p-6 text-white hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center">
            <div className="p-3 rounded-lg bg-green-400 bg-opacity-30 mr-4">
              <img src={assets.patients_icon} alt="Patients" className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium opacity-80">Total Patients</p>
              <p className="text-2xl md:text-3xl font-bold">{dashData.patients}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Appointments Section */}
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="p-2 rounded-lg bg-indigo-100 mr-3">
                <img src={assets.list_icon} alt="Appointments" className="w-5 h-5" />
              </div>
              <h2 className="text-lg md:text-xl font-semibold text-gray-800">Latest Appointments</h2>
            </div>
            <button className="text-sm font-medium text-indigo-600 hover:text-indigo-800">
              View All
            </button>
          </div>
        </div>

        <div className="divide-y divide-gray-200">
          {dashData.latestAppointments.map((item, index) => (
            <div 
              key={index} 
              className="p-4 md:p-5 hover:bg-gray-50 transition-colors duration-200"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between">
                <div className="flex items-center mb-3 sm:mb-0">
                  <img
                    src={item.userData.image}
                    alt={item.userData.name}
                    className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-white shadow-sm"
                  />
                  <div>
                    <p className="font-semibold text-gray-800">{item.userData.name}</p>
                    <div className="flex items-center text-sm text-gray-500 mt-1">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{slotdateFormate(item.slotDate)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center">
                  {item.cancelled ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                      Cancelled
                    </span>
                  ) : item.isCompleted ? (
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      Completed
                    </span>
                  ) : (
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => cancelAppointment(item._id)}
                        className="p-2 rounded-full bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
                        aria-label="Cancel appointment"
                        title="Cancel Appointment"
                      >
                        <img src={assets.cancel_icon} alt="Cancel" className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => completeAppointment(item._id)}
                        className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors"
                        aria-label="Complete appointment"
                        title="Complete Appointment"
                      >
                        <img src={assets.tick_icon} alt="Complete" className="w-5 h-5" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorDashboard;