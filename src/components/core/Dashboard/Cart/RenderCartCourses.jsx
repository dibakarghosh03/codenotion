import { FaStar } from "react-icons/fa"
import { RiDeleteBin6Line } from "react-icons/ri"
import ReactStars from "react-rating-stars-component"
import { useDispatch, useSelector } from "react-redux"

import { removeFromCart } from "../../../../slices/cartSlice"
import GetAvgRating from "../../../../utils/avgRating"

export default function RenderCartCourses() {
  const { cart } = useSelector((state) => state.cart)
  const dispatch = useDispatch()
  return (
    <div className="flex flex-1 flex-col mx-auto sm:mx-0">
      {cart.map((course, indx) => (
        <div
          key={course._id}
          className={`flex w-full flex-col sm:flex-row sm:items-start justify-center sm:justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover"
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5">
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex flex-col sm:flex-row items-start gap-1">
                <div className="flex gap-x-2 items-center">
                  <span className="text-yellow-5">{GetAvgRating(course.ratingAndReview)}</span>
                  <ReactStars
                    count={5}
                    value={course?.ratingAndReview?.length}
                    size={20}
                    edit={false}
                    activeColor="#ffd700"
                    emptyIcon={<FaStar />}
                    fullIcon={<FaStar />}
                  />
                </div>
                <span className="text-richblack-400">
                  {course?.ratingAndReview?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end space-y-2">
            <p className="text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
            <button
              onClick={() => dispatch(removeFromCart(course._id))}
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-3 px-[12px] text-pink-200 mb-6 "
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            
          </div>
        </div>
      ))}
    </div>
  )
}
