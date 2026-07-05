import { Button, Divider } from "@mantine/core"
import { IconBriefcase, IconMapPin, IconClock } from "@tabler/icons-react"
import ExpCard from "./ExpCard"
import CertiCard from "./CertiCard"

const Profile = (props: any) => {
    console.log(props.name);
    return (
        <div className="w-2/3 mx-5 pb-10 ">
            <div className="relative">
                <img className="rounded-t-2xl h-60 w-full object-cover" src="/Profile/banner.png" alt="banner" />
                <img 
                    className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-900 border-8" 
                    src={props.picture?`data:image/jpeg;base64,${props.picture}`: "/Avatar.jpg"} 
                    alt="avatar" 
                />
            </div>
            <div className="px-3 mt-20 flex flex-col gap-1 my-3">
                <div className="text-3xl text-mine-shaft-300 font-semibold flex justify-between items-center">
                    {props.name}
                    <Button color="brightSun.4" variant="light">Message</Button>
                </div>
                
                <div className="text-xl flex gap-1 items-center text-mine-shaft-300">
                    <IconBriefcase className="h-5 w-5 text-mine-shaft-400" stroke={1.5} /> 
                    {props.role} &bull; {props.company}
                </div>

                <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                    <IconMapPin className="h-5 w-5" stroke={1.5} /> 
                    {props.location}
                </div>

                {/* Total Experience */}
                {(props.totalExp !== undefined && props.totalExp !== null) && (
                    <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
                        <IconClock className="h-5 w-5" stroke={1.5} />
                        {props.totalExp} {props.totalExp === 1 ? 'year' : 'years'} of experience
                    </div>
                )}
            </div>

            <Divider size="sm" color="mineShaft.7" className="mx-5 my-3" />

            <div className="px-5 py-3">
                <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">About</div>
                <div className="text-sm text-mine-shaft-300 text-justify leading-relaxed">
                    {props.about}
                </div>
                <br />
            </div>          

            <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

            <div className="mx-5 my-3">
                <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">Skills</div>
                <div className="flex flex-wrap gap-2">
                    {props.skills?.map((skill: string, index: number) => (
                        <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
                            {skill}
                        </div>
                    ))}
                </div>
                <br />
            </div>

            <Divider size="sm" color="mineShaft.7" className="mx-5 my-5" />

            <div className="px-5 mb-5">
                <div className="text-mine-shaft-300 text-2xl font-semibold mb-5">Experience</div>
                <div className="flex flex-col gap-5">
                    {props.experiences?.map((exp: any, index: number) => (
                        <ExpCard key={index} {...exp} />
                    ))}
                </div>
                <br />
            </div>

            <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

            <div className="px-5">
                <div className="text-mine-shaft-300 text-2xl font-semibold mb-5">Certifications</div>
                <div className="flex flex-col gap-5">
                    {props.certifications?.map((certi: any, index: number) => (
                        <CertiCard key={index} {...certi} />
                    ))}
                </div>
            </div>
            <br />
            <Divider size="sm" color="mineShaft.7" className="mx-5 my-5" />

        </div>
    );
};

export default Profile
// import { Button, Divider } from "@mantine/core"
// import { IconBriefcase, IconMapPin } from "@tabler/icons-react"
// import ExpCard from "./ExpCard"
// import CertiCard from "./CertiCard"

// const Profile = (props: any) => {
    
//     return (
//         <div className="w-2/3 mx-5 pb-10 ">
//             <div className="relative">
//                 <img className="rounded-t-2xl h-60 w-full object-cover" src="/Profile/banner.png" alt="banner" />
//                 <img 
//                     className="w-48 h-48 rounded-full -bottom-1/3 absolute left-3 border-mine-shaft-900 border-8" 
//                     src={props.picture?`data:image/jpeg;base64,${props.picture}`: "/Avatar.jpg"} 
//                     alt="avatar" 
//                 />
//             </div>
//             <div className="px-3 mt-20 flex flex-col gap-1 my-3">
//                 <div className="text-3xl text-mine-shaft-300 font-semibold flex justify-between items-center">
//                     {props.name} 
//                     <Button color="brightSun.4" variant="light">Message</Button>
//                 </div>
                
//                 <div className="text-xl flex gap-1 items-center text-mine-shaft-300">
//                     <IconBriefcase className="h-5 w-5 text-mine-shaft-400" stroke={1.5} /> 
//                     {props.role} &bull; {props.company}
//                 </div>

//                 <div className="text-lg flex gap-1 items-center text-mine-shaft-300">
//                     <IconMapPin className="h-5 w-5" stroke={1.5} /> 
//                     {props.location}
//                 </div>
//             </div>

//             <Divider size="sm" color="mineShaft.7" className="mx-5 my-3" />

//             <div className="px-5 py-3">
//                 <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">About</div>
//                 <div className="text-sm text-mine-shaft-300 text-justify leading-relaxed">
//                     {props.about}
//                 </div>
//                 <br />
//             </div>          

//             <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

//             <div className="mx-5 my-3">
//                 <div className="text-2xl font-semibold mb-3 text-mine-shaft-300">Skills</div>
//                 <div className="flex flex-wrap gap-2">
//                     {props.skills?.map((skill: string, index: number) => (
//                         <div key={index} className="bg-bright-sun-300 text-sm font-medium bg-opacity-15 rounded-3xl text-bright-sun-400 px-3 py-1">
//                             {skill}
//                         </div>
//                     ))}
//                 </div>
//                 <br />
//             </div>

//             <Divider size="sm" color="mineShaft.7" className="mx-5 my-5" />

//             <div className="px-5 mb-5">
//                 <div className="text-mine-shaft-300 text-2xl font-semibold mb-5">Experience</div>
//                 <div className="flex flex-col gap-5">
//                     {props.experiences?.map((exp: any, index: number) => (
//                         <ExpCard key={index} {...exp} />
//                     ))}
//                 </div>
//                 <br />
//             </div>

//             <Divider size="sm" color="mineShaft.7" className="mx-5 mb-5" />

//             <div className="px-5">
//                 <div className="text-mine-shaft-300 text-2xl font-semibold mb-5">Certifications</div>
//                 <div className="flex flex-col gap-5">
//                     {props.certifications?.map((certi: any, index: number) => (
//                         <CertiCard key={index} {...certi} />
//                     ))}
//                 </div>
//             </div>
// <br />
//             <Divider size="sm" color="mineShaft.7" className="mx-5 my-5" />

//         </div>
//     );
// };

// export default Profile