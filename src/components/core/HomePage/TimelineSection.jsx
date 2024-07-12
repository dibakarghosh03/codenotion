import logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        logo: logo1,
        heading: "Leadership",
        description: "Fully commited to the success company"
    },
    {
        logo: logo2,
        heading: "Responsibility",
        description: "Students will always be our top priority"
    },
    {
        logo: logo3,
        heading: "Flexibility",
        description: "The ability to switch is an important skills"
    },
    {
        logo: logo4,
        heading: "Solve the problem",
        description: "Code your way to a solution"
    },
]

function TimelineSection() {
    return (
        <div className="overflow-y-hidden py-20">
            <div className="max-w-maxContent lg:pl-10 flex flex-col lg:flex-row gap-10 items-center mx-auto">
                <div className="lg:w-[40%] flex flex-col ">
                    {
                        timeline.map((element, index) => {
                            return (
                                <div className="flex flex-col lg:gap-3" key={index}>
                                    <div className="flex flex-row gap-6" key={index}>
                                        <div className="w-[60px] h-[60px] flex justify-center items-center bg-white rounded-full">
                                            <img src={element.logo} />
                                        </div>
                                        <div className="">
                                            <h2 className="text-xl sm:text-2xl font-semibold">{element.heading}</h2>
                                            <p className="text-richblack-500 text-sm sm:text-base">{element.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        {
                                            index !== timeline.length - 1 ? (
                                                <div className="hidden lg:block  h-14 border-dotted border-r border-richblack-400 w-[26px]"></div>
                                            ) : (<div></div>)
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="relative max-w-[90%] shadow-[0px_-5px_50px_5px] shadow-blue-200">
                    <img src={timelineImage} className="shadow-white shadow-[20px_20px_0px_0px] object-cover  max-h-[400px] lg:h-[500px]" />
                    <div className="hidden sm:absolute bg-caribbeangreen-700 sm:flex flex-row text-white uppercase p-8 mx-auto left-20 -bottom-10">
                        <div className="flex flex-row border-r items-center gap-5 border-caribbeangreen-50 pr-5">
                            <h1 className="text-3xl font-bold">10</h1>
                            <p className=" text-caribbeangreen-200 text-sm">Years Experience</p>
                        </div>
                        <div className="flex flex-row items-center gap-5 pl-5">
                            <h1 className="text-3xl font-bold">10</h1>
                            <p className=" text-caribbeangreen-200 text-sm">Types of courses</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TimelineSection