import { ActionIcon, TagsInput } from "@mantine/core"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { successNotification } from "../../Services/NotificationService";
import { getProfile, updateProfile } from "../../Services/ProfileService";
import { setProfile } from "../../Slice/ProfileSlice";
import { IconCheck, IconPencil, IconX } from "@tabler/icons-react";

const Skills = ()=>{

    const user = useSelector((state: any) => state.user);
    const profile = useSelector((state: any) => state.profile);

    const dispatch = useDispatch();

    const [skills,setSkills] = useState<string[]>([])
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);


    const handleEdit = async () => {
        if (!edit) {
            setEdit(true);
            setSkills(profile.skills)            
        } else {
            setLoading(true);

            let updatedProfile = { ...profile, skills:skills };

            try {
                const res = await updateProfile(updatedProfile);
                dispatch(setProfile(res));
                setEdit(false);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }

            successNotification("Succsess", "Skills Section Updated Successfully!")
        }
    };

    const handleCancleEdit = ()=>{
        setEdit(false);
    }

    useEffect(() => {
        getProfile(user.profileId)
            .then((res: any) => {
                dispatch(setProfile(res));
            })
            .catch((err: any) => console.log(err));
    }, []);



    return (
            <div className="mx-5 my-3">
                <div className="flex justify-between">
                    <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">Skills</div>
                    <div>
                                { 
                                    edit && <ActionIcon
                                                variant="subtle"
                                                size="lg"
                                                onClick={handleEdit}
                                                loading={loading}
                                                color="green.8"
                                            >
                                                <IconCheck className="w-4/5 h-4/5" />
                                            
                                            </ActionIcon>
                                }
                                <ActionIcon
                                    variant="subtle"
                                    size="lg"
                                    onClick={edit ? handleCancleEdit : handleEdit }
                                    loading={loading}
                                    color={edit ? "red.8" : "brightSun.4"}
                                >
                                    {edit
                                        ? <IconX className="w-4/5 h-4/5" />
                                        : <IconPencil className="w-4/5 h-4/5" />
                                    }
                                </ActionIcon>
                            </div>
                </div>
                
                {
                    edit ? 
                    <TagsInput
                        value={skills} 
                        onChange={setSkills}
                        placeholder="Enter Skills"
                        splitChars={[',', ' ', '|']}
                    /> 
                    : 
                    <div className="flex flex-wrap gap-2">
                        {profile?.skills?.map((skill: string, index: number) => (
                            <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                                {skill}
                            </div>
                        ))}
                    </div>
                }
                <br />
            </div>
    )
}

export default Skills