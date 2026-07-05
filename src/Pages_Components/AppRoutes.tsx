import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Header from "../Component/Header_Components/Header"
import SignUpPage from "./SignUpPage"
import ProfilePage from "./ProfilePage"
import FindJobsPage from "./FindJobsPage"
import FindTalentsPage from "./FindTalentsPage"
import JobDescPage from "./JobDescPage"
import ApplyJobPage from "./ApplyJobPage"
import CompanyPage from "./ComapanyPage"
import PostJobPage from "./PostJobPage"
import PostedJobPage from "./PostedJobPage"
import JobHistoryPage from "./JobHistoryPage"
import HomePage from "./HomePage"
import Footer from "../Component/Footer/Footer"
import TalentProfile from "./TalentProfilePage"
import { useSelector } from "react-redux"
import PublicRoute from "../Services/PublicRoutes"
import ProtectedRoute from "../Services/ProtectedRoute"

const AppRoutes = ()=>{
    const user = useSelector((state : any)=>state.user)
        return (   
            <BrowserRouter>
            < Header />
            <Routes>
                <Route path='/signup' element={ <PublicRoute><SignUpPage /></PublicRoute> } />
                <Route path='/login' element={<PublicRoute><SignUpPage /></PublicRoute>} />
                <Route path='/profile' element={<ProtectedRoute allowedRoles={['APPLICANT', 'EMPLOYER']}><ProfilePage /></ProtectedRoute>} />
                <Route path='/find-jobs' element={<ProtectedRoute allowedRoles={['APPLICANT']}><FindJobsPage /></ProtectedRoute>} />
                <Route path='/find-talents' element={<ProtectedRoute allowedRoles={['APPLICANT', "EMPLOYER"]}><FindTalentsPage /></ProtectedRoute>} />
                <Route path='/jobs/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'EMPLOYER']}><JobDescPage /></ProtectedRoute>} />
                <Route path='/apply-job/:id' element={<ProtectedRoute allowedRoles={['APPLICANT']}><ApplyJobPage /></ProtectedRoute> } />
                <Route path='/company/:name' element={<ProtectedRoute allowedRoles={['APPLICANT', 'EMPLOYER']}><CompanyPage /></ProtectedRoute>} />
                <Route path='/talent-profile/:id' element={<ProtectedRoute allowedRoles={['APPLICANT', 'EMPLOYER']}><TalentProfile /></ProtectedRoute>} />
                <Route path='/post-job/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostJobPage /></ProtectedRoute>} />
                <Route path='/posted-jobs/:id' element={<ProtectedRoute allowedRoles={['EMPLOYER']}><PostedJobPage /></ProtectedRoute>} />
                <Route path='/job-history' element={<ProtectedRoute allowedRoles={['APPLICANT']}><JobHistoryPage /></ProtectedRoute>} />
                <Route path='*' element={<HomePage />} />
            </Routes>
            <Footer />
            </BrowserRouter>
        )


}

export default AppRoutes