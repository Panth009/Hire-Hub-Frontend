import { Button, LoadingOverlay, PasswordInput, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { loginValidation } from "../../Services/FormValidations"
import { useDisclosure } from "@mantine/hooks"
import ResetPassword from "./ResetPassword"
import { useDispatch, useSelector } from "react-redux"
import { errorNotification, successNotification } from "../../Services/NotificationService"
import { loginUser } from "../../Services/AuthService"
import { setJwt } from "../../Slice/JwtSlice"
import { jwtDecode } from "jwt-decode"
import { setUser } from "../../Slice/UserSlice"

const form = {
    email : "",
    password : ""
}

const Login = ()=>{

    const [data,setData] = useState<{[key:string]:string}>(form)
    
    const [formError, setFormError] = useState<{[key:string]:string}>(form);

    const [opened, { open, close }] = useDisclosure(false);

    const navigate = useNavigate()

    const dispatch = useDispatch()

    const [loading, setLoading] = useState(false)

    const handleChange = (event : any)=>{       
        let name = event.target.name
        let value = event.target.value
        setData({...data,[name]:value})
        setFormError({...formError,[name]:loginValidation(name, value)})        
    }
    
    const handleSubmit = ()=>{
        let valid = true
        setLoading(true)
        let newFormError:{[key:string]:string} = {}

        for (let key in data) 
        {
            newFormError[key] = loginValidation(key,data[key])
            if(newFormError[key])
            {
                valid = false
            }

        }
        setFormError(newFormError)
        if(valid)
        {
            loginUser(data)
            .then((res) => {
                console.log(res);

                setData(form)

                successNotification('Login Successful!', 'Redirecting to home page...');
                
                dispatch(setJwt(res.jwt))
                const decoded = jwtDecode(res.jwt)
                // console.log(decoded);
                dispatch(setUser({...decoded,email:decoded.sub}))


                setTimeout(()=>{
                    setLoading(false)
                    navigate("/")
                },1000)
            })
            .catch((err) => {
                console.log(err);
                errorNotification('Login Failed , Invalid Credentials.',err.response.data.errorMessage)
                setLoading(false);   // <-- Missing
            })
        }
    }

    return (
        <>
            <LoadingOverlay
                visible={loading}
                zIndex={1000}
                overlayProps={{ radius: 'sm', blur: 2 }}
                loaderProps={{ color: 'brightSun.4', type: 'bars' }}
            />
            <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl font-semibold justify-center">
                    SignIn to your account
                </div>
                
                <TextInput error={formError.email} onChange={handleChange} value={data.email} name="email" withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Your email"/>
                
                <PasswordInput error={formError.email} onChange={handleChange} value={data.password} name="password" withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Password" placeholder="Password"/>
                
                <Button onClick={handleSubmit } loading={loading} autoContrast variant="filled">
                    Sign in
                </Button>
                
                <div className="mx-auto">
                    Have an account?{' '}
                    <span onClick={()=>{navigate("/signup");setFormError(form);setData(form)}} className="text-bright-sun-400 hover:cursor-pointer">
                        Sing Up
                    </span>
                </div>
                
                <div className="text-bright-sun-400 hover:underline cursor-pointer text-center" onClick={open}>
                    Forget Password ?
                </div>

            </div>

            <ResetPassword opened={opened} close={close}/>
        </>
    )
}

export default Login