import { IoMdClose } from 'react-icons/io'

export default function ProfilePhoto({ user, setProfileOpen }) {
    
    return (
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
            <div className="w-11/12 relative max-w-[450px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <div className='absolute cursor-pointer top-4 right-3' onClick={() => {setProfileOpen(false)}}>
                    <IoMdClose color='grey' size={30} />
                </div>
                <div className='h-10'></div>
                <img 
                    src={user?.image}
                    height={"200px"}
                    className='rounded-md'
                />
            </div>
        </div>
    )
}