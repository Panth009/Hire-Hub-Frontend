import { Divider } from "@mantine/core"
import SearchBar from "../Component/FindJobs/SearchBar"
import Jobs from "../Component/FindJobs/Jobs"

const FindJobsPage = ()=>{
    return (
        <div className="min-h-[100vh] bg-mine-shaft-900 font-['poppins']">
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <SearchBar />  
            <Divider size="sm"  color="mineShaft.7" className="mx-5" />
            <Jobs />
            
        </div>   
    )

}

export default FindJobsPage