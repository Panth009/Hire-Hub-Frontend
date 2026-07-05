import { Button, Divider } from "@mantine/core"
import { IconArrowLeft } from "@tabler/icons-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import Profile from "../Component/TalentProfile/Profile"
import { profile } from "../Data/TalentData"
import RecommendTalent from "../Component/TalentProfile/Recomanded"
import { useEffect, useState } from "react"
import { getAllProfiles, getProfile } from "../Services/ProfileService"

const TalentProfile = ()=>{
    const  navigate = useNavigate()
    
    const {id} = useParams();
    const [profile, setProfile] = useState<any> ({})
    
    useEffect(()=>{
        window.scrollTo(0,0)
        getProfile(id).then((res)=> {
            setProfile(res) 
        }).catch((err)=>{
            console.log(err)
        })
    },[id]) 

    const [talents, setTalents] = useState<any>([])

    useEffect(() => {
        getAllProfiles().then((res:any) => {
            setTalents(res)
            console.log(res);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    
    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            
            <div className="m-5">
                <Button mx={5} onClick={()=>navigate(-1)} leftSection={<IconArrowLeft size={20}/>} color="brightSun.4" variant="light">
                     Back
                </Button>
            </div>
            
            <div className="flex">
                
                {
                        <Profile {...profile} />
                
                }
                
                <RecommendTalent talents={talents.filter((talent: any) => talent.id != id)}/>
            </div>
        </div>   
    )

}

export default TalentProfile