import { IconBrandFacebook, IconBrandInstagram, IconBrandX, IconBriefcase } from "@tabler/icons-react";
import { footerLinks } from "../../Data/data";
import { useLocation } from "react-router-dom";

const Footer = ()=>{
    const location = useLocation()

    return ( (location.pathname != "/signup" && location.pathname != "/login") ?
        <div className="font-['poppins'] pt-20 pb-5 flex gap-5 justify-around bg-mine-shaft-900">
            <div className="w-1/4 ml-10 flex flex-col gap-4 items-center text-center">
                
                <div className="flex gap-2 items-center">
                    <IconBriefcase stroke={2} className="h-10 w-10 text-white" />
                    <div className="text-4xl font-semibold text-bright-sun-500">
                        HireHub
                    </div>
                </div>

                <div className="text-sm text-mine-shaft-300">
                    Job portal with user profiles, skill updates, Certifications, work experience and admin job postings.
                </div>

                <div className="flex gap-3 text-bright-sun-400 [&>div]:bg-mine-shaft-800 [&>div]:p-2 [&>div]:rounded-full [&>div]:cursor-pointer hover:[&>div]:bg-mine-shaft-600">
                    <div><IconBrandFacebook /></div>
                    <div><IconBrandInstagram /></div>
                    <div><IconBrandX /></div>
                </div>
            </div>

            {
                    footerLinks.map((item, idx) => {
                        return (
                            <div key={idx}>
                                <div className="text-lg font-semibold mb-4 text-bright-sun-400">
                                    {item.title}
                                </div>
                                {
                                    item.links.map((linkname, id) => 
                                    <div key={id} className="text-mine-shaft-300 text-sm hover: text-bright-sun-400 cursor-pointer mb-1 hover:translate-x-2 transition duration-300 ease-in-out">
                                        {linkname}
                                    </div>)
                                }
                            </div>
                        )
                    })
                }

        </div> : <></>
    )
}

export default Footer; 