import React from 'react'
import { BASE_URL } from "../../Utils/config";
import { FaVideo } from 'react-icons/fa'
import { isAfter } from 'date-fns';
import { Link } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function MyDoctors({appointment}) {
  console.log(appointment,'dfsdjajfds')
  const navigate = useNavigate()
  const currentTime = new Date();
  const currentHourAndMinute = `${currentTime.getHours()}:${currentTime.getMinutes() < 10 ? '0' : ''}${currentTime.getMinutes()}`
  const expireHandle = (end_time) => {

    // Split the time string into hours, minutes, and seconds
    const [hours, minutes, seconds] = end_time?.split(':');
    
    // Create a new Date object with the current date and the desired time
    const EndDate = new Date();
    EndDate.setHours(hours);
    EndDate.setMinutes(minutes);
    EndDate.setSeconds(seconds);
    return isAfter(EndDate, new Date())
  }
  return (
<div>
  <div className="container mt-3">
    <div className="flex flex-wrap -mx-4">
      <div className="w-full px-4">
        <div className="max-w-full overflow-x-auto">
          <table className="table-auto w-full">
            <thead className='bf'>

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
                 Action
                </th>
              </tr>
            </thead>
            <tbody>
              {appointment.length!==0&& appointment.map((item)=>{
              return (
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
                  <img  src={BASE_URL+item?.doctor?.user?.image} className="w-36 border-4 h-36 object-cover rounded-full" alt="Expert Profile" />
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
                  {item?.slot?.start_time }-{item?.slot?.end_time }
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
                <td className="
                   text-center text-dark
                   font-medium
                   text-base
                   py-5
                   px-2
                   bg-[#F3F6FF]
                   border-b border-[#E8E8E8]
                   ">
                    {/* {expireHandle(item?.slot?.end_time) ?<div onClick={()=>{
                      navigate('/videoCall/')
                    }}><FaVideo className="mx-auto w-8 h-8"/></div>: <p>Time Over</p>} */}
                    {(item.slot.start_time.slice(0,5)<=currentHourAndMinute && item.slot.end_time.slice(0,5)>=currentHourAndMinute) ? <div onClick={()=>{
                      navigate('/videoCall/')
                    }}><FaVideo className="mx-auto w-8 h-8"/></div>: <p>not yet</p> }
                 
                </td>
              </tr>
              )
              })}
              
            
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</div>

  )
}

export default MyDoctors