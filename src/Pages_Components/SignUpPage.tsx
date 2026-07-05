import { Button, Divider } from "@mantine/core"
import { IconArrowNarrowLeft, IconBriefcase } from "@tabler/icons-react"
import SignUp from "../Component/SignUp_Login/SignUp"
import Login from "../Component/SignUp_Login/Login"
import { useLocation, useNavigate } from "react-router-dom"

const SignUpPage = ()=>{
    const location = useLocation()
    const navigate = useNavigate()

    return (
        <div className="bg-mine-shaft-900 font-['poppins'] overflow-hidden">
            <Button
            onClick={() => navigate("/")}
            className="!absolute left-4 top-3 z-10 !text-bright-sun-400"
            leftSection={<IconArrowNarrowLeft className="!text-bright-sun-400" />}
            variant="subtle"
            >
            Home
            </Button>
            <div className={`w-[100vw] h-[100vh] transition-all ease-in-out duration-1000 flex [&>*]:flex-shrink-0 ${location.pathname === '/signup' ? '-translate-x-1/2' : 'translate-x-0'}`}>
            < Login />
                <div className={`w-1/2 h-full transition-all duration-1000 ease-in-out ${location.pathname === "/signup" ? "rounded-r-[200px]" : "rounded-l-[200px]"} bg-mine-shaft-800 flex items-center gap-5 justify-center flex-col`}>
                    <div className="flex gap-1 items-center text-bright-sun-400">
                        <IconBriefcase className="h-16 w-16" stroke={2.5} />
                        <div className="text-6xl font-semibold">
                            HireHub
                        </div>
                    </div>
                    <div className="text-2xl text-mine-shaft-100 font-semibold">
                        Discover Opportunities That Fit You
                    </div>
                </div>
                < SignUp />
            </div>            
        </div>
    )
}

export default SignUpPage