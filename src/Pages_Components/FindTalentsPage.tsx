import { Divider } from "@mantine/core"
import SearchBar from "../Component/FindTalents/SearchBar"
import Talents from "../Component/FindTalents/Talents"

const FindTalentsPage = ()=>{
    
    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <SearchBar/>
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <Talents />
        </div>   
    )

}

export default FindTalentsPage