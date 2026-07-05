import { Divider } from "@mantine/core"
import Profile from "../Component/Profile/Profile"

const ProfilePage = ()=>{
    return (
        <div className="bg-mine-shaft-900 font-['poppins']">
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            < Profile /> 
        </div>
    )
}

export default ProfilePage