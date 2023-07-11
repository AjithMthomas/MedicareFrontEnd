import React, { useCallback, useEffect, useState } from 'react';
import { BASE_URL } from "../../Utils/config";
import { FaVideo } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useSocket } from '../SocketContext/SocketProvider';
import VideocallModal from './VideocallModal';

function MyDoctors({ appointment }) {
  const [doctor, setDoctor] = useState('');
  const [show, setShow] = useState(false);

  const currentTime = new Date();
  const currentHourAndMinute = `${currentTime.getHours()}:${currentTime.getMinutes() < 10 ? '0' : ''}${currentTime.getMinutes()}`;

  function handleClick(id) {
    setDoctor(id);
    setShow(true);
  }


  function formatTime(time) {
    const parts = time.split(':');
    let hours = parseInt(parts[0], 10);
    const minutes = parts[1];
    const ampm = hours >= 12 ? 'PM' : 'AM';

    hours %= 12;
    hours = hours || 12;

    return `${hours}:${minutes} ${ampm}`;
  }

  return (
    <div>
      {show && 
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
          <VideocallModal doctor={doctor} setShow={setShow}/> 
        </div>
      }
      <div className="container mt-3">
        <div className="flex flex-wrap -mx-4">
          <div className="w-full px-4">
            <div className="max-w-full overflow-x-auto">
              <table className="table-auto w-full">
                <thead className="bf">
                  <tr className="bg-blue-500 text-center">
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                      border-l border-transparent
                    ">
                      image
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                    ">
                      Doctor Name
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                    ">
                      Department
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                    ">
                      Time
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                    ">
                      Fee
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                      border-r border-transparent
                    ">
                      Duration
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                      border-r border-transparent
                    ">
                      Status
                    </th>
                    <th className="
                      w-1/6
                      min-w-[160px]
                      text-lg
                      font-semibold
                      text-white
                      py-4
                      lg:py-7
                      px-3
                      lg:px-4
                      border-r border-transparent
                    ">
                      Call
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {appointment?.length !== 0 && appointment?.map((item) => (
                    <tr>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-[#F3F6FF]
                        border-b border-[#E8E8E8]
                      ">
                        <img src={BASE_URL + item?.doctor?.user?.image} className="w-36 border-4 h-36 object-cover rounded-full" alt="Expert Profile" />
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-white
                        border-b border-[#E8E8E8]
                      ">
                        {item?.doctor?.user?.username}
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-[#F3F6FF]
                        border-b border-[#E8E8E8]
                      ">
                        {item?.doctor?.specialization?.name}
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-white
                        border-b border-[#E8E8E8]
                      ">
                        {formatTime(item?.slot?.start_time)} - {formatTime(item?.slot?.end_time)}
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-[#F3F6FF]
                        border-b border-[#E8E8E8]
                      ">
                        {item?.doctor?.fee}
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-white
                        border-b border-r border-[#E8E8E8]
                      ">
                        <a href="javascript:void(0)" className="
                          border border-primary
                          py-2
                          px-6
                          text-primary
                          inline-block
                          rounded
                          hover:bg-primary hover:text-white
                        ">
                          {item?.slot?.slot_duration} Minutes
                        </a>
                      </td>
                      <td className={`
                        text-center
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-white
                        border-b border-r border-[#E8E8E8]
                        ${item.status === 'pending' || item.status === 'rejected'? 'text-red-500' : 'text-green-500'}
                      `}>
                        <a href="javascript:void(0)" className={`
                          border border-primary
                          py-2
                          px-6
                          inline-block
                          rounded
                          hover:bg-primary hover:text-white
                          ${item.status === 'pending' || item.status === 'rejected' ? 'text-red-500' : 'text-green-500'}
                        `}>
                          {item?.status}
                        </a>
                      </td>
                      <td className="
                        text-center text-dark
                        font-medium
                        text-base
                        py-5
                        px-2
                        bg-[#F3F6FF]
                        border-b border-[#E8E8E8]
                      ">
                        {(item?.slot?.start_time.slice(0, 5) <= currentHourAndMinute && item?.slot?.end_time.slice(0, 5) >= currentHourAndMinute) ? (
                          <div>
                            <FaVideo onClick={() => handleClick(item?.slot?.doctor?.id)} className="mx-auto w-8 h-8" />
                          </div>
                        ) : (
                          <p>not yet</p>
                        )}
                      </td>
                    </tr>
                  ))}
                  
                </tbody>
               
              </table>
              {appointment?.length == 0 &&
                  <div className="flex justify-center w-full my-20 ">
                  <h1 className='text-lg font-serif text-red-500'>No appointments yet</h1>
                  </div>
                  }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MyDoctors;
