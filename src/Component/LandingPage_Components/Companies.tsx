import Marquee from "react-fast-marquee";
import { companies } from "../../Data/data";

const Companies = ()=>{
    return (
        <div className="mt-20">
            <div className="text-4xl text-center font-semibold text-mine-shaft-100 mb-10">
                Trusted By <span className="text-bright-sun-400">1000+</span> Companies
            </div>

            <Marquee pauseOnHover={true}>
                {
                    companies.map((company,index)=>
                        <div key={index} className="mx-8 px-2 py-1 hover:bg-mine-shaft-800 rounded-xl cursor-pointer">
                            <img src={`/Company_Logo/${company}.png`} alt={company} className="h-16"/>
                        </div>)
                }
            </Marquee>
        </div>
    );
}

export default Companies

