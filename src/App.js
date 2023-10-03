import React, { useEffect } from 'react'
import { ColorModeContext, useMode } from './assets/theme'
import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { Route, Routes, useLocation, useNavigate } from 'react-router'
import Dashboard from './pages/Dashboard'
import Header from './layouts/Header'
import DashboardSidebar from './layouts/DashboardSidebar'
import Parents from './pages/Parents'
import CreateNewParent from './pages/CreateNewParent'
import ShowParentInformation from './pages/ShowParentInformation'
import FAQs from './pages/FAQs'
import Signin from './pages/Signin'
import Events from './pages/Events'
import Event from './pages/Event'
import Status from './layouts/Status'
import StatusInfo from './pages/StatusInfo'
import Techers from './pages/Techers'
import Classes from './pages/Classes'
import Courses from './layouts/Courses'
import TeacherInformation from './pages/TeacherInformation'
import ClassInformation from './pages/ClassInformation'
import PublicImages from './pages/PublicImages'
import CourseInforamtion from './pages/CourseInforamtion'
import StuffInformation from './pages/StuffInformation'
import Childrens from './pages/Childrens'
import ChildInformation from './pages/ChildInformation'
import AgeSection from './pages/AgeSection'
import AboutImages from './pages/AboutImages'
import { useJawadAuthController } from './context'
import "./App.css"

const CheckAuth = () => {
  const [controller] = useJawadAuthController()
  const navigate = useNavigate()
  useEffect(() => {
    if(controller.isAuth) {
      navigate('/dashboard')
    }else{
      navigate('/auth/signin')
    }
  } , [])
}

const App = () => {
  const [theme, colorMode] = useMode();
  const { pathname } = useLocation();
  return (
    <>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Box
            sx={{
              display: "flex",
              padding : '0 10px'
            }}
          >
            {pathname.includes("auth") ? undefined : <DashboardSidebar />}

            <Box
              sx={{
                // flex : 1
                width : '100%'
              }}
            >
              <Header />
              <Routes>
                <Route path='/' element={<CheckAuth />} />
                <Route path={'/dashboard'} element={<Dashboard />} />
                <Route path={'/parents'} element={<Parents />} />
                <Route path={'/parents/:parentID'} element={<ShowParentInformation />} />
                <Route path={'/faqs'} element={<FAQs />} />
                <Route path={'/auth/signin'} element={<Signin />} />
                <Route path={'/events'} element={<Events />} />
                <Route path={'/childrens'} element={<Childrens />} />
                <Route path={'/childrens/:childID'} element={<ChildInformation />} />
                <Route path={'/events/:eventID'} element={<Event />} />
                <Route path={'/status'} element={<Status />} />
                <Route path={'/status/:statusID'} element={<StatusInfo />} />
                <Route path={'/staffs'} element={<Techers />} />
                <Route path={'/staffs/:stuffID'} element={<StuffInformation />} />
                <Route path={'/age-sections'} element={<AgeSection />} />
                <Route path={'/classes'} element={<Classes />} />
                <Route path={'/classes/:classID'} element={<ClassInformation />} />
                {/* <Route path={'/courses'} element={<Courses />} /> */}
                {/* <Route path={'/courses/:courseID'} element={<CourseInforamtion />} /> */}
                <Route path={'/images'} element={<PublicImages />} />
                <Route path={'/school-photos'} element={<AboutImages />} />
              </Routes>
            </Box>
          </Box>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </>
  );
};

export default App;
