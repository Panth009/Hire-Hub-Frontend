import { Avatar, Button, Indicator } from "@mantine/core";
import { IconArrowNarrowLeft, IconBell, IconBriefcase, IconSettings } from "@tabler/icons-react";
import NavLinks from "./NavLinks";
import { useLocation, useNavigate } from "react-router-dom";
import ProfileMenu from "./ProfileMenu";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slice/ProfileSlice";
import NotificationMenu from "./NotificationMenu";
import { setupResponseInterceptor } from "../../Interceptor/AxiosInterceptor";
import { jwtDecode } from "jwt-decode";
import { setUser } from "../../Slice/UserSlice";

const Header = () => {
    const location = useLocation()
    const navigate = useNavigate()
    const user = useSelector((state:any)=>state.user)
    const token = useSelector((state:any)=>state.jwt)
    const dispatch = useDispatch()

 
    useEffect(()=>{
        setupResponseInterceptor(navigate,dispatch);
    }, [navigate])

    useEffect(() => {

       if (!token) {
           return;
       }

       const decoded = jwtDecode(localStorage.getItem("jwt")!);
       dispatch(setUser({ ...decoded, email: decoded.sub }));

       if (user?.profileId) {
           getProfile(user.profileId)
               .then((res) => {
                   dispatch(setProfile(res));
               })
               .catch(console.log);
       }
       
    }, [token]);

    return ( (location.pathname != "/signup" && location.pathname != "/login")? 
        <div className="font-['poppins'] w-full bg-mine-shaft-900 px-6 text-white h-20 flex justify-between items-center">
            <div className="flex gap-1 items-center">
                    <IconBriefcase stroke={2} className="h-12 w-12"/>        
                    <div className="text-4xl font-semibold text-bright-sun-500">
                            HireHub    
                    </div>  
            </div>
            
            < NavLinks />

            <div>
                    <div className="flex gap-3 items-center">
                        { user ? < ProfileMenu /> :
                                    <Button
                                    onClick={() => navigate("/login")}
                                    className="!text-bright-sun-400 hover:!bg-bright-sun-6 00"
                                    variant="subtle"
                                    >
                                    Login
                                    </Button> }
                        <div className="bg-mine-shaft-700 p-1.5 rounded-full">
                            <NotificationMenu />
                        </div>
                        {/* <div className="bg-mine-shaft-7 00 p-1.5 rounded-full">
                            <IconSettings className="text-mine-shaft-100 cursor-pointer" stroke={1.5}/>
                        </div> */}
                        
                    </div>    
            </div>

            
        </div> : <></>
    );
}

export default Header;