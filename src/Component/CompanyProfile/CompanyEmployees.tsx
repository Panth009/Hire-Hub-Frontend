import { talents } from "../../Data/TalentData";
import TalentCard from "../FindTalents/TalentCards";

const CompanyEmployees=()=>{
    return <div className="flex mt-10 flex-wrap gap-10 justify-center">
        {
            talents.map((talent, index) => index<4 &&<TalentCard key={index} {...talent} />)
        }
    </div>
}

export default CompanyEmployees;