import { ActionIcon } from "@mantine/core"
import { IconDeviceFloppy, IconPencil, IconPlus, IconX } from "@tabler/icons-react"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slice/ProfileSlice";
import ExpCard from "./ExpCard";
import ExpInput from "./ExpInput";

const Experience = ()=>{

    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [addExp, setAddExp] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleEdit = async () => {
        setEdit(!edit)
    };

    useEffect(() => {
        getProfile(user.profileId)
            .then((res: any) => {
                dispatch(setProfile(res));
            })
            .catch((err: any) => console.log(err));
    }, []);



    return (
        <div>
            <div className="px-5 mb-5">
                <div className="flex justify-between">
                    <div className="text-mine-shaft-300 text-2xl font-semibold mb-5">Experience</div>
                    <div>
                        <ActionIcon variant="subtle" size={"lg"} color="brightSun.4" onClick={()=>setAddExp(true)}>
                            <IconPlus className="w-4/5 h-4/5" />
                        </ActionIcon>
                        <ActionIcon variant="subtle" size={"lg"} color={ edit ? "red.8" : "brightSun.4"} onClick={handleEdit}>
                            {edit ? <IconX className="w-4/5 h-4/5" /> : <IconPencil className="w-4/5 h-4/5" />}
                        </ActionIcon>
                    </div>                   
                </div>
                
                <div className="flex flex-col gap-5">
                    {profile?.experiences?.map((exp: any, index: any) => 
                        <ExpCard key={index} index={index} {...exp} edit={edit} />
                    )}
                    {addExp && <ExpInput add setEdit={setAddExp}/>}
                </div>
                <br />
            </div>
        </div>
    )
}

export default Experience