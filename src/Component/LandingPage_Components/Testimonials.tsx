import { Avatar, Rating } from "@mantine/core";
import { testimonials } from "../../Data/data";

const Testimonials = ()=>{
    return (
    <div className="mt-20 pb-5 justify-center">
        
        <div className="text-4xl text-center font-semibold mb-3 text-mine-shaft-100">
            What <span className="text-bright-sun-400">Users</span> Says About Us ? 
        </div>
        
        <div className="flex justify-evenly gap-3 px-2 mt-10 ">
                {
                    testimonials.map((data, idx) => {
                        return (
                            <div key={idx} className="h-50 flex flex-col w-[19%] border border-bright-sun-400 rounded-lg p-3">
                                <div className="flex gap-2 justify-items-center items-center">
                                    <Avatar className="!h-14 !w-14" src='/Avatar.png' alt="its me" />
                                    <div >
                                        <div className="text-lg font-semibold text-mine-shaft-200">{data.name}</div>
                                        <Rating value={data.rating} fractions={2} readOnly />

                                    </div>

                                </div>
                                <div className="font-semibold text-mine-shaft-400">
                                    {data.testimonial}
                                </div>
                            </div>
                        )
                    })
                }
            </div>
    </div>
    );
}

export default Testimonials;