import React from 'react'
import { Link } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/Button";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from '../components/core/HomePage/CodeBlock';
import TimelineSection from '../components/core/HomePage/TimelineSection';
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection';
import ExploreMore from '../components/core/HomePage/ExploreMore';
import Footer from '../components/common/Footer';
import instructor from "../assets/Images/Instructor.png"
import "../App.css";
import ReviewSlider from '../components/common/ReviewSlider';

function Home() {
    return (
        <div>
            {/* Section 1 */}
            <div className='relative mx-auto flex flex-col w-11/12 items-center justify-between text-white'>
                <Link to={"/signup"}>
                    <div className='group p-1 mt-16 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95'>
                        <div className='flex items-center gap-2 rounded-full px-6 sm:px-10 py-[7px] transition-all duration-200 group-hover:bg-richblack-900 shadow-sm shadow-richblack-500  text-sm sm:text-lg '>
                            <p>Become an Instructor</p>
                            <FaArrowRight />
                        </div>
                    </div>
                </Link>

                <div className='my-4 font-semibold text-center text-2xl sm:text-[2.2rem] font-inter'>
                    <h1>Empower Your Future with <HighlightText text={"Coding Skills"} /> </h1>
                </div>

                <div className='sm:w-5/6 mb-4'>
                    <p className='text-center text-richblack-300 font-semibold text-[1rem] sm:text-[1.2rem]'>With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.</p>
                </div>

                <div className='flex flex-row gap-7 my-10'>
                    <CTAButton active={true} linkedTo={"/signup"} customClasses={"text-sm sm:text-[16px] px-[18px] py-[10px] sm:py-3 sm:px-6"}>Learn more</CTAButton>
                    <CTAButton active={false} linkedTo={"/login"} customClasses={"text-sm sm:text-[16px] px-[18px] py-[10px] sm:py-3 sm:px-6"}>Book a demo</CTAButton>
                </div>

                <div className='w-5/6 shadow-[10px_-5px_50px_-5px] shadow-blue-200 mx-3 my-7 '>
                    <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    src={Banner}
                    className='shadow-[20px_20px_rgba(255,255,255)]'
                    >
                    </video>
                </div>

                {/* Code Section 1 */}
                <div className='mx-auto sm:w-10/12'>
                    <CodeBlocks

                        position={"lg:flex-row"}
                        heading={
                            <div className='text-2xl sm:text-4xl font-semibold'>
                                Unlock your <HighlightText text={"coding potential"} /> with our online courses.
                            </div>
                        }
                        subheading={
                            "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                        }
                        ctabtn1={{
                            btnText: "Try it Yourself",
                            linkedTo: "/signup",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkedTo: "/login",
                            active: false
                        }}
                        codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav><a href="one">One</a></nav>\n</body>\n</html>`}
                        codeColor={"text-yellow-25"}
                        gradient={"codeblock1"}
                    />
                </div>

                {/* Code Section 2 */}
                <div className='mx-auto sm:w-10/12'>
                    <CodeBlocks

                        position={"lg:flex-row lg:flex-row-reverse"}
                        heading={
                            <div className='text-2xl sm:text-4xl font-semibold'>
                                Start <HighlightText text={"coding in seconds"} />
                            </div>
                        }
                        subheading={
                            "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                        }
                        ctabtn1={{
                            btnText: "Continue Lessons",
                            linkedTo: "/login",
                            active: true
                        }}
                        ctabtn2={{
                            btnText: "Learn More",
                            linkedTo: "/signup",
                            active: false
                        }}
                        codeblock={`Import React from "react";\n Import CTAButton from "./Button";\nimport { FaArrowRight } from "react-icons/fa";\nimport {TypeAnimation} from "react-type-animation";\n\nconst Home = () => {\nreturn ( <div>Home</div> )\n}\nexport default Home;`}
                        codeColor={"text-white"}
                        gradient={"codeblock2"}
                    />
                </div>

                <ExploreMore/>

            </div>

            {/* Section 2 */}
            <div className='bg-pureGreys-5 text-richblack-700'>
                <div className='homepage_bg h-[150px] sm:h-[300px]'>
                    <div className='w-11/12 pt-10 max-w-maxContent mx-auto items-center gap-5 flex-col'>
                        <div className='hidden sm:block h-[150px]'></div>
                        <div className='w-fit flex flex-row gap-7 text-white mx-auto'>
                            <CTAButton active={true} linkedTo={"/signup"} customClasses={"px-[14px] sm:px-[24px] text-[15px]"}>
                                <div className='flex items-center gap-1 sm:gap-2'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkedTo={"/login"} customClasses={"px-[14px] sm:px-[24px] text-[15px]"}>
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>

                <div className='w-11/12 max-w-maxContent mt-10 mx-auto flex flex-col items-center justify-between gap-7'>
                    <div className='w-full flex flex-col lg:flex-row gap-5 justify-between'>
                        <div className='font-semibold text-2xl sm:text-4xl lg:w-[45%]'>
                            Get the skills you need for a <HighlightText text={"job that is in demand"} />
                        </div>
                        <div className='lg:w-[45%]'>
                            <div className='tex-base sm:text-lg'>
                            The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.
                            </div>
                            <div className='w-fit my-10'>
                                <CTAButton active={true} linkedTo={"/signup"}>Learn More</CTAButton>
                            </div>
                        </div>
                    </div>
                    
                </div>
                <div><TimelineSection/></div>
                <LearningLanguageSection/>
            </div>
            {/* Section 3 */}
            <div className='w-11/12 max-w-maxContent mx-auto text-white'>
                <div className='flex flex-col items-center md:flex-row gap-x-20 gap-y-10 py-16'>
                    <div >
                        <img className='shadow-[-20px_-20px_rgba(255,255,255)]' src={instructor}/>
                    </div>
                    <div className='md:w-[45%] flex flex-col justify-center gap-10'>
                        <h1 className='text-2xl sm:text-4xl font-semibold'>
                            Become an<br/>
                            <HighlightText text={" instructor"} />
                        </h1>
                        <p className='lg:font-semibold text-base sm:text-lg font-inter text-richblack-300'>
                        Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
                        </p>
                        <div className='w-fit'>
                            <CTAButton active={true} linkedTo={"/signup"}>
                                <div className='flex items-center gap-2 '>
                                    Start Teaching Today
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                        </div>
                    </div>
                </div>
            </div>
            {/* Section 4 */}
            <div className='flex flex-col w-10/12 text-white mx-auto'>
                <div >
                    <h1 className='text-2xl sm:text-4xl font-semibold text-center'>Review from other learners</h1>
                </div>
                <div>
                    <ReviewSlider/>
                </div>
            </div>
            {/* Footer */}
            <Footer/>
        </div>
    )
}

export default Home