const signUpValidation = (name:any, value:any)=>{
    switch(name){
        case "name" : 
                        if(value.length ===0) {
                            return "Name is required."
                        } 
                        break
        case "email" :
                        if(value.length===0) {
                            return "Email is required."
                        }
                        if(! /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value)){
                            return "Email Is Invalid."
                        }
                        break
        case "password" :
                            if(value.length===0) {
                                return "Password is required."
                            }
                            if(! /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(value)){
                                return "Password Is Invalid, It Should Include At Least One Number, LowerCase Character, UpperCase Character, Special Character And Have Length Of 8 To 15 Characters."
                            }
                            break 
    }
    return "";
}

const loginValidation = (name:any, value:any)=>{
    switch(name){
        case "email" :
                        if(value.length===0) {
                            return "Email is required."
                        }
                        break
        case "password" :
                            if(value.length===0) {
                                return "Password is required."
                            }
                            break 
    }
    return "";
}
export {signUpValidation,loginValidation}