import { useEffect, useState } from "react"
import { talents } from "../../Data/TalentData"
import Sort from "./Sort"
import TalentCards from "./TalentCards"
import { getAllProfiles } from "../../Services/ProfileService"
import { useDispatch, useSelector } from "react-redux"
import { resetFilter } from "../../Slice/FilterSlice"
import { resetSort } from "../../Slice/SortingSlice"

const Talents = ()=>{
    
    const dispatch = useDispatch()
    const [talents, setTalents] = useState<any>([])
    const profile = useSelector((state: any) => state.profile);

    const filter = useSelector((state: any) => state.filter)
    const sort = useSelector((state:any)=> state.sort)
    const [filteredTalent, setFilteredTalent] = useState<any>([])
    

    useEffect(() => {
        getAllProfiles().then((res:any) => {
            dispatch(resetFilter());
            dispatch(resetSort());
            setTalents(res);
            setFilteredTalent(res);
        }).catch((err)=>{
            console.log(err)
        })
    },[])
    useEffect(()=>{

        if(sort == "Experience (Low-High)")
        {
            setTalents([...talents].sort((a:any, b:any)=> a.totalExp-b.totalExp))
        }
        else if(sort == "Experience (High-Low)")
        {
            setTalents([...talents].sort((a:any, b:any)=> b.totalExp-a.totalExp))
        }
    },[sort])

     useEffect(()=>{
        if(sort == "experience: low to high"){
            setTalents([...talents].sort((a:any, b:any)=> a.totalExp - b.totalExp ))
        }
        else if(sort == "experience: high to low"){
            setTalents([...talents].sort((a:any, b:any)=> b.totalExp - a.totalExp ))
        }
    },[sort])

    useEffect(() => {
    let filterTalent = [...talents];

    // Name Filter
    if (filter.name) {
        filterTalent = filterTalent.filter(
            (talent: any) =>
                talent.name?.toLowerCase().includes(filter.name.toLowerCase())
        );
    }

    // Job Title Filter
    if (filter["Job Title"] && filter["Job Title"].length > 0) {
        filterTalent = filterTalent.filter((talent: any) =>
            filter["Job Title"].some((title: any) =>
                talent.jobTitle?.toLowerCase().includes(title.toLowerCase())
            )
        );
    }

    // Location Filter
    if (filter.Location && filter.Location.length > 0) {
        filterTalent = filterTalent.filter((talent: any) =>
            filter.Location.some((location: any) =>
                talent.location?.toLowerCase().includes(location.toLowerCase())
            )
        );
    }

    // Skills Filter
    if (filter.Skills && filter.Skills.length > 0) {
        filterTalent = filterTalent.filter((talent: any) =>
            filter.Skills.some((skill: any) =>
                talent.skills?.some((talentSkill: any) =>
                    talentSkill?.toLowerCase().includes(skill.toLowerCase())
                )
            )
        );
    }

    // Experience Filter
    if (filter.exp && filter.exp.length > 0) {
        filterTalent = filterTalent.filter(
            (talent: any) =>
                filter.exp[0] <= (talent.totalExp ?? 0) &&
                (talent.totalExp ?? 0) <= filter.exp[1]
        );
    }

    setFilteredTalent(filterTalent);
}, [filter, talents]);

    return (
        <div className="p-5 ">
            <div className="flex justify-between">
                <div className="text-2xl font-semibold text-mine-shaft-300">Recommanded Talents </div>
                <Sort />
            </div>
            
            <div className="mt-5 flex flex-wrap gap-9 justify-center">
                {
                    filteredTalent.filter((x:any)=>x.id!=profile.id).map((talent:any, index:any) => <TalentCards key={index} { ... talent} />)
                }
            </div>
            
        </div>)
}

export default Talents