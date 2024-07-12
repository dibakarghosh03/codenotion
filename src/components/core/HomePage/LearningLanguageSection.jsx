import HighlightText from "./HighlightText";
import CTAButton from "./Button";
import pic1 from "../../../assets/Images/Know_your_progress.svg";
import pic2 from "../../../assets/Images/Compare_with_others.svg";
import pic3 from "../../../assets/Images/Plan_your_lessons.svg";


function LearningLanguageSection() {
    return (
        <div className="pb-8">
            <div className="w-11/12 mx-auto my-10">
                <div className="lg:w-[60%] mx-auto text-center space-y-5 font-inter ">
                    <h1 className="text-2xl sm:text-4xl font-semibold">Your swiss knife for <HighlightText text={"learning any language"} /></h1>
                    <p>
                    Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
                    </p>
                </div>
                <div className="xl:w-10/12 flex flex-col lg:flex-row items-center justify-center mx-auto relative">
                    <div className="mt-6 -mb-20 lg:m-0 lg:-mr-10">
                        <img src={pic1} className="z-0" />
                    </div>
                    <div className="-mb-20 -mt-10 lg:m-0 lg:-ml-20 lg:-mr-10">
                        <img src={pic2} className="z-10" />
                    </div>
                    <div className="-mt-20 lg:m-0 lg:-ml-20">
                        <img src={pic3} className=""/>
                    </div>
                </div>
                <div className="w-fit mx-auto">
                    <CTAButton active={true} linkedTo={"/signup"}>Learn More</CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LearningLanguageSection