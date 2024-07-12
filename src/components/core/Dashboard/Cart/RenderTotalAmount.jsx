import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { BuyCourse } from "../../../../services/operations/studentFeaturesAPI"
import IconBtn from "../../IconBtn"

export default function RenderTotalAmount() {
  const { total, cart } = useSelector((state) => state.cart)
  const { token } = useSelector((state) => state.auth)
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleBuyCourse = () => {
    const courses = cart.map((course) => course._id)
    BuyCourse(token, courses, user, navigate, dispatch)
  }

  return (
    <div className="flex-col space-y-5 w-[220px] sm:w-[240px] max-w-11/12 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
      <p className="mb-1 text-sm font-medium text-richblack-300">Total: 
        <span className="text-yellow-100 text-3xl"> ₹ {total}</span>
      </p>
      
      <IconBtn
        text="Buy Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
  )
}
