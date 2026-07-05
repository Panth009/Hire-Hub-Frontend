import { Anchor, Button, Checkbox, Group, LoadingOverlay, PasswordInput, Radio, rem, TextInput } from "@mantine/core"
import { IconAt, IconCheck, IconLock, IconX } from "@tabler/icons-react"
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom"
import { registerUser } from "../../Services/UserService";
import { signUpValidation } from "../../Services/FormValidations";
import { notifications, Notifications } from '@mantine/notifications';
import { errorNotification, successNotification } from "../../Services/NotificationService";

const form = {
    name : "",
    email : "",
    password : "",
    confirmPassword : "",
    accountType : "APPLICANT"
}
const SignUp = ()=>{

    const [loading, setLoading] = useState(false) 
    const [data, setData] = useState<{[key:string]:string}>(form);
    
    const [formError, setFormError] = useState<{[key:string]:string}>(form);

    const navigate = useNavigate()

    const handleChange = (event : any)=>{
        if(typeof(event) == "string")
        {
            setData({...data, accountType:event})   
            return ;
        }
        let name = event.target.name
        let value = event.target.value
        setData({...data,[name]:value})
        setFormError({...formError,[name]:signUpValidation(name, value)})
        if(name==="password" && data.confirmPassword !== "" ){
            let err = ""
            if(value !== data.confirmPassword){
                err = "Passwords do not match."
                
            }
            setFormError({...formError, [name]: signUpValidation(name, value) ,confirmPassword:err})
        }
        if(name==="confirmPassword"){
            if(value !== data.password )
            {
                setFormError({...formError, [name]:"Passwords do not match."})
            }
            else{
                setFormError({...formError, confirmPassword:""})
            }
        }
    }
    
    const handleSubmit = ()=>{
        let valid = true
        let newFormError:{[key:string]:string} = {}
        
        for (let key in data) 
        {
            if(key === "accountType")
            {
                continue;
            }
            if (key !== "confirmPassword")
            {
                newFormError[key] = signUpValidation(key,data[key])
            }
            else if(data[key] !== data["password"] ){
                newFormError[key] = "Passwords do not match"
            }
            if(newFormError[key])
            {
                valid = false
            }
            
        }
        setFormError(newFormError)
        
        if(valid)
        {
            setLoading(true)
            registerUser(data)
            .then((res) => {
                console.log(res);

                setData(form)

                successNotification('Registered Succsessfully !','Redirecting to login page...');

                setTimeout(()=>{
                    setLoading(false)
                    navigate("/login")
                },4000)
            })
            .catch((err) => {
                console.log(err);
                setLoading(false)
                errorNotification('Registration Failed',err.response.data.errorMessage)
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
                            className="translate-x-1/2"
            />
            <div className="w-1/2 px-20 flex flex-col justify-center gap-3">
                <div className="text-2xl font-semibold justify-center">
                    Create Account
                </div>
                
                <TextInput error={formError.name} name="name" value={data.name} onChange={handleChange} withAsterisk label="Full Name" placeholder="Your name"/>
                <TextInput error={formError.email} name="email" value={data.email} onChange={handleChange} withAsterisk leftSection={<IconAt style={{ width: rem(16), height: rem(16) }} />} label="Email" placeholder="Your email"/>
                
                <PasswordInput error={formError.password} name="password" value={data.password} onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Password" placeholder="Password"/>
                <PasswordInput error={formError.confirmPassword} name="confirmPassword" value={data.confirmPassword} onChange={handleChange} withAsterisk leftSection={<IconLock style={{ width: rem(18), height: rem(18) }} stroke={1.5} />} label="Confirm Password" placeholder="Confirm password"/>
                
                <Radio.Group
                    value={data.accountType}
                    name="accountType"
                    onChange={handleChange}
                    label="You are?"
                    withAsterisk
                >
                    <Group mt="xs">
                            <Radio
                            className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg"
                            autoContrast
                            value="APPLICANT"
                            label="Applicant"
                            />
                            <Radio
                            className="py-4 px-6 border hover:bg-mine-shaft-900 has-[:checked]:border-bright-sun-400 has-[:checked]:bg-bright-sun-400/5 border-mine-shaft-800 rounded-lg"
                            autoContrast
                            value="EMPLOYER"
                            label="Employer"
                            />
                    </Group>
                </Radio.Group>

                <Checkbox autoContrast
                label={
                    <>
                    I accept {' '}
                    <Anchor>terms & conditions</Anchor>
                    </>
                }/>
                
                <Button autoContrast variant="filled" onClick={handleSubmit} loading={loading}>
                    Sign up
                </Button>
                
                <div className="mx-auto">
                Have an account?{' '}
                <span onClick={()=>{navigate("/login");setFormError(form);setData(form)}} className="text-bright-sun-400 hover:cursor-pointer">
                    Login
                </span>
                </div>
            </div>
        </>
    ) 
}

export default SignUp