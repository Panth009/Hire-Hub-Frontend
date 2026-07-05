import { ActionIcon, Avatar, Divider, FileInput, Overlay, TagsInput, Textarea } from "@mantine/core"
import { IconBriefcase, IconDeviceFloppy, IconEdit, IconMapPin, IconPencil, IconPlus } from "@tabler/icons-react"
import CertiCard from "./CertiCard"
import { useEffect, useState } from "react";
import SelectInput from "./SelectInput";
import fields from "../../Data/Profile";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";
import CertiInput from "./CertiInput";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import Info from "./Info";
import { changeProfile, setProfile } from "../../Slice/ProfileSlice";
import About from "./About";
import Skills from "./Skills";
import Experience from "./Experience";
import Certificate from "./Certificate";
import { useHover } from "@mantine/hooks";
import { successNotification } from "../../Services/NotificationService";
import { getBase64 } from "../../Services/Utilities";

const Profile = () => {
    
    const user = useSelector((state:any)=>state.user)
    const dispatch = useDispatch()

    const profile = useSelector((state:any)=>state.profile);
    
    useEffect(()=>{
        getProfile(user.profileId)
            .then((res:any)=>{
                console.log(res);
                dispatch(setProfile(res))
            })
            .catch((error:any)=>{console.log(error)})
    },[])

    const {hovered, ref} = useHover()

    const handleFileChange = async (image:any) => {
        let picture:any = await getBase64(image);
        let updatedProfile = {...profile, picture:picture.split(',')[1]}
        dispatch(changeProfile(updatedProfile))
        successNotification("success", "Profile picture updated successfully")

    } 
    
    return (
        <div className="w-4/5 mx-auto mt-5">
            <div ref={ref} className="relative">
                <img className="rounded-t-2xl h-60 w-full object-cover" src="/Profile/banner.png" alt="banner" />
                <div ref={ref} className="absolute flex items-center justify-center top-1/3 left-3" >
                        <Avatar className="!w-48 !h-48 border-black border-8" src={profile.picture?`data:image/jpeg;base64,${profile.picture}`: "/avatar.png"} color="blue" alt="profile img" />
                        {
                            hovered && (
                                <Overlay
                                    gradient="linear-gradient(145deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0) 100%)" className="!rounded-full"
                                    opacity={0.75}
                                />
                            ) 
                        }

                        {
                            hovered && <IconEdit className="absolute z-[300] w-10 h-10 "/>
                        }

                        {
                            hovered && <FileInput
                            onChange={handleFileChange}
                            className="absolute [&_*]:!rounded-full w-full z-[301] [&_*]:!h-full !h-full " 
                            variant="transparent"
                            size="lg"
                            radius="xl"
                            accept="image/png,image/jpeg" 
                          />
                        }
                    </div>
                {/* <img 
                    className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-900 border-8" 
                    src="/avatar.png" 
                    alt="avatar" 
                />*/}
            </div>
            <br />

            < Info /> 

            <Divider size="sm" color="mineShaft.7" className="mx-5 my-3" />

            <About/>     

            <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

            <Skills/>

            <Divider size="sm" color="mineShaft.7" className="mx-5 my-5" />

            <Experience />            

            <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

            <Certificate /> 

            <Divider size="sm" color="mineShaft.7" className="mx-5 mt-10" />
           
        </div>
    );
};

export default Profile;