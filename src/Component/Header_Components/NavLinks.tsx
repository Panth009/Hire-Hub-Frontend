import { Link, useLocation } from "react-router-dom";

const NavLinks = () => {

    const location = useLocation();

    const links = [
        {name: 'Home' , url : ''},
        {name: 'Find Jobs' , url : 'find-jobs'},
        {name: 'Find Talent' , url : 'find-talents'},
        {name: 'Post Job' , url : 'post-job/0'},
        {name: 'Posted jobs' , url : 'posted-jobs/0'},
        {name: 'Job History' , url : 'job-history'},
    ];

    return (
        <div className="flex gap-9">
            {
                links.map((link,index)=>(
                    <div
                        key={index}
                        className={`${
                            location.pathname === "/" + link.url 
                                ? "border-bright-sun-500" 
                                : "border-transparent"
                        } border-t-[3px] h-full flex items-center px-3 `}
                    >  
                        <Link to={`/${link.url}`}> {link.name}</Link>
                    </div>
                ))
            }
        </div>
    );
}

export default NavLinks;