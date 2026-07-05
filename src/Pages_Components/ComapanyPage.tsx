import { Button, Divider } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import Company from "../Component/CompanyProfile/Comapny";
import SimilarCompanies from "../Component/CompanyProfile/SimilarCompany";

const CompanyPage = () => {
    return (
        <div className="min-h-[90vh] bg-mine-shaft-900 font-['poppins'] p-4">
            <Divider size="xs" mx="md" />
            <Link className="m-5 inline-block" to="/jobs">
                <Button 
                    color="brightSun.4" 
                    leftSection={<IconArrowLeft size={20} />} 
                    variant="light"
                >
                    Back
                </Button>
            </Link>
            <div className="flex">
                < Company />
                <div className="justify-center w-1/4">
                    <SimilarCompanies/>
                </div>
            </div>
            

            <Divider size="xs" mx="md" className="mt-5"/>
        </div>
    );
}

export default CompanyPage;