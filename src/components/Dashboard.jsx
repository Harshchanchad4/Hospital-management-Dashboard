import React, { useContext, useEffect, useState } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { GoCheckCircleFill } from "react-icons/go";
import { AiFillCloseCircle } from "react-icons/ai";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [totalAppointment, setTotalAppointment] = useState(0);
  const [totalDoctors, setTotalDoctors] = useState(0);

  useEffect(() => {
    const fetchCountAppointmet = async () => {

      try {
        const response = await axios.get(BASE_URL + "/appointment/totalappointment",
          { withCredentials: true },
        )

        setTotalAppointment(response.data.total);
        console.log("RESPONSE OF TOTAL APPOINTMENT ", response.data.total);


      } catch (error) {
        console.log(error);
      }
    }
    fetchCountAppointmet();
  }, []);

  useEffect(() => {
    const fetchCountDoctors = async () => {

      try {
        const response = await axios.get(BASE_URL + "/user/doctor/totaldoctors",
          { withCredentials: true },
        )

        setTotalDoctors(response.data.doctorCount);
        console.log("RESPONSE OF TOTAL Doctors ", response.data.doctorCount);


      } catch (error) {
        console.log(error);
      }
    }
    fetchCountDoctors();
  }, []);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await axios.get(
          BASE_URL + "/appointment/getall",
          { withCredentials: true }
        );
        setAppointments(data.appointments);
      } catch (error) {
        setAppointments([]);
      }
    };
    fetchAppointments();
  }, []);

  const handleUpdateStatus = async (appointmentId, status) => {
    try {
      const { data } = await axios.put(
        BASE_URL + `/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );
      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );
      toast.success(data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const { isAuthenticated, user } = useContext(Context);
  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
    <>
      <section className='dashboard page'>
        <div className='banner'>
          <div className='firstBox'>
            <img src="/doc.png" alt="docImg" />
            <div className='content'>
              <div>
                <p>Hello</p>
                <h5 className="text-[28px]">
                  {
                    user && `${user.firstName} ${user.lastName}`
                  }
                </h5>
              </div>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt minus recusandae quod, debitis animi est obcaecati neque </p>
            </div>

          </div>

          <div className="secondBox">
            <p>Total Appointments</p>
            <h3>

              {totalAppointment}
            </h3>

          </div>
          <div className="thirdBox">
            <p>Registered Doctors</p>
            <h3>{totalDoctors}</h3>

          </div>


        </div>
        <div className="banner ">
          <h5>Appointments</h5>
          <div className=''>
           
            <div className='grid gap-5 grid-cols-1 sm:grid-cols-2  '>
              {
                appointments.length > 0 ? (
                  appointments.map((appointment, index) => {
                    return (

                      <div key={index} className='flex justify-center gap flex-col bg-[#F4F4F9] rounded-md p-4'>

                        <div className='w-full flex items-center gap-3'>

                          <span className='font-semibold'>Patient : </span>
                          <div>
                            {appointment.firstName}  {appointment.lastName}
                          </div>
                        </div>
                        <div className='w-full flex items-center gap-3'>

                          <span className='font-bold'>Date : </span>
                          <div>
                            {appointment.appointment_date.substring(0, 10)}
                          </div>
                        </div>
                        <div className='w-full flex items-center gap-3'>

                          <span className='font-semibold'>Doctor : </span>
                          <div>
                            {appointment.doctor.firstName}  {appointment.doctor.lastName}
                          </div>
                        </div>
                        <div className='w-full flex items-center gap-3'>

                          <span className='font-semibold'>Department : </span>
                          <div>
                            {appointment.department}
                          </div>
                        </div>


                        <div className='w-full flex items-center '>
                          <span className='font-semibold'>Status :</span>
                          <select
                            className={`${appointment.status === "Pending" ? "value-pending" : appointment.status === "Rejected" ? "value-rejected" : "value-accepted"} ml-2 bg-[#F4F4F9]`}

                            value={appointment.status}
                            onChange={(e) => handleUpdateStatus(appointment._id, e.target.value)}
                          >
                            <option value="Pending" className='value-pending'>Pending</option>
                            <option value="Rejected" className='value-rejected'>Rejected</option>
                            <option value="Accepted" className='value-accepted'>Accepted</option>

                          </select>
                        </div>

                        <div className='w-full flex items-center gap-3'>
                          <span className='font-semibold'>Visited :</span>
                          {appointment.hasVisited === true ? <GoCheckCircleFill className='text-green-600' /> : <AiFillCloseCircle className='text-red-600' />}
                        </div>

                      </div>
                    )
                  }))

                  : (<div>No Appointments</div>)
              }
            </div>
          </div>
        </div>


      </section>

    </>
  );
};

export default Dashboard;


