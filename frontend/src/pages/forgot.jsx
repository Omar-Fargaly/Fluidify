import { Link } from "react-router-dom";


function Forgot() {
  return (
    <>
        <div className="flex justify-center items-center p-4 my-[-20px] h-screen">
          <div className="pb-18 pt-16 px-7 bg-[#007AFF54]/60 border-1 border-white  rounded-3xl">
            <h1 className="text-7xl text-center font-bela text-white my-8">
             Forgot?
            </h1>
            <form action="" className="flex flex-col gap-2 text-white items-center">
              <input
                type="Email"
                className="px-8 py-1 point bg-[#424242BA] font-poppins font-light text-center rounded-full border-1 border-white"
                placeholder="Email with Account"
                name="email"
              />
              <Link to="/login" className="font-bela text-center font-extralight text-xs md:text-sm mt-2">Changed Your Mind?</Link>
              <button
                type="submit"
                className="mx-auto w-fit rounded-full mt-2"
              >
                <img src="./Forgot.svg" className="w-full rounded-full" alt="" />
              </button>
            </form>
          </div>
        </div>
    </>
  );
}

export default Forgot;
