import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
    'Free',
    'New to coding',
    'Most popular',
    'Skills paths',
    'Career paths'
];

function ExploreMore() {

    const [currentTab, setCurrentTab] = useState(tabsName[0]);
    const [courses, setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard, setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCard = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((course) => course.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


    return (
        <div className="w-full mt-24">
            <div className="text-2xl sm:text-4xl font-semibold text-center">
                Unlock the 
                <HighlightText text={" Power of Coding"} />
            </div>
            <p className="font-semibold text-center text-richblack-300 my-3 text-base sm:text-lg mb-10">
                Learn to build anything you can imagine
            </p>
            <div className="hidden sm:flex flex-row bg-richblack-800 rounded-full p-1 my-6 shadow-sm shadow-richblack-400 w-fit mx-auto">
                {
                    tabsName.map((element,index) => {
                        return (
                            <div key={index}
                            className={`text-[14px] md:text-[16px] text-richblack-200 font-semibold flex flex-row items-center gap-2 ${currentTab === element ? "bg-richblack-900 text-white " : "text-richblack-300 bg-richblack-800"} rounded-full transition-all duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-100 px-4 md:px-5 lg:px-7 py-1 md:py-2`}
                            onClick={() => setMyCard(element)}
                            >
                                {element}
                            </div>
                        )
                    })
                }
            </div>
            <div className="hidden lg:block lg:h-[230px]"></div>

            <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-11/12 lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-10 mb-7 lg:px-0 px-3">
                {
                    courses.map( (element,index) => {
                        return (
                            <CourseCard
                                key={index}
                                cardData={element}
                                currentCard={currentCard}
                                setCurrentCard={setCurrentCard}
                            />
                        )
                    })
                }
            </div>
        </div>
    );
}

export default ExploreMore