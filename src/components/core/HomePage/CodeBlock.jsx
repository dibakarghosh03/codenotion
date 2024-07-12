import CTAButton from "./Button"
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";


function CodeBlock({
    position,heading,subheading,ctabtn1, ctabtn2, codeblock, codeColor, gradient
}) {
    return (
        <div className={` flex flex-col ${position} mt-24 mx-auto justify-between gap-y-10`}>
            {/*Section1*/}
            <div className="lg:w-1/2 flex flex-col gap-8">
                {heading}
                <div className="text-richblack-300 font-bold sm:text-lg text-base ">
                    {subheading}
                </div>
                <div className="flex gap-7 mt-7">
                    <CTAButton active={ctabtn1.active} linkedTo={ctabtn1.linkedTo} customClasses={"text-sm sm:text-[16px] px-[18px] py-[10px] sm:py-3 sm:px-6"}>
                        <div className="flex items-center gap-2">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkedTo={ctabtn2.linkedTo} customClasses={"text-sm sm:text-[16px] px-[18px] py-[10px] sm:py-3 sm:px-6"}>
                        {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/*Section 2*/ }
            <div className="lg:w-[40%] flex py-5 relative code-border">
                {/*BG gradient*/}
                <div className={`${gradient}`}></div>

                <div className="text-center flex flex-col w-[10%] text-richblack-300 font-inter font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2 text-sm sm:text-base`}>
                    <TypeAnimation
                        sequence={[codeblock, 3000, ""]}
                        repeat={Infinity}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }
                        omitDeletionAnimation
                    />
                </div>
            </div>
        </div>
    )
}

export default CodeBlock