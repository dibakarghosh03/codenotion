import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"

import { formattedDate } from "../../../utils/dateFormatter"
import IconBtn from "../../common/IconBtn"
import ProfilePhoto from "./ProfilePhoto"

export default function MyProfile() {
  const { user } = useSelector((state) => state.profile)
  const [profileOpen, setProfileOpen] = useState(false)
  
  const navigate = useNavigate()


  return (
    <div >
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        My Profile
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12 space-y-4 sm:space-x-0">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-x-4 gap-y-2" >
          <div 
            className="flex justify-center sm:justify-start"
            onClick={() => {setProfileOpen(true); console.log("clicked")}}
          >
          <img
            src={user?.image}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] md:w-[78px] rounded-full cursor-pointer object-cover"
            
          />
          </div>
          <div className="space-y-1">
            <p className="text-lg text-center sm:text-start font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm text-center sm:text-start text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <IconBtn
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
          
        >
          <RiEditBoxLine />
        </IconBtn>
      </div>
      <div className="my-10 flex flex-col gap-y-6 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
            
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >
          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-6 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-base sm:text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
        </div>
        <div className="flex max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600">First Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
            </div>
            <div className=" sm:hidden">
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div className=" sm:hidden">
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
            <div className=" sm:hidden">
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.DOB) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className="hidden sm:block">
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div className="hidden sm:block">
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div className="hidden sm:block">
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.DOB) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>
      
        {
          profileOpen && (
            <ProfilePhoto user={user} setProfileOpen={setProfileOpen}/>
          )
        }
      
    </div>
  )
}
