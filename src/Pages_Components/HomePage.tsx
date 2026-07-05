import { useEffect } from "react";
import Footer from "../Component/Footer/Footer";
import Header from "../Component/Header_Components/Header";
import Companies from "../Component/LandingPage_Components/Companies";
import DreamJob from "../Component/LandingPage_Components/DreamJob";
import JobCategory from "../Component/LandingPage_Components/JobCategory";
import Subscribe from "../Component/LandingPage_Components/Subscribe";
import Testimonials from "../Component/LandingPage_Components/Testimonials";
import Working from "../Component/LandingPage_Components/Working";
import { useSelector } from "react-redux";

const HomePage = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const user = useSelector((state:any)=>state.user)

    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">

           {user && (
                <div className="bg-yellow-500/10 border border-yellow-500/30 text-yellow-300 text-center py-3 px-4 text-sm">
                    <span className="font-semibold">ℹ️ Note:</span> Some features are restricted. You can access only the pages you're eligible to use based on your account role.
                </div>
            )}

            <DreamJob />
            <Companies />
            <JobCategory />
            <Working />
            <Testimonials />
            <Subscribe />
        </div>
    );
};

export default HomePage;