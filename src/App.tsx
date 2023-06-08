import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import locales from './locales';
import Frame from './components/Frame';
import Error404Page from './pages/authentication/404';
import CalendarPage from './pages/calendar';
import BoardsPage from './pages/board-list';
import BoardPage from './pages/board';
import ProfilePage from './pages/profile';
import CreateBoardPage from './pages/board-create';
import {AuthProvider} from "@/contexts/AuthContext";
import SignIn from './pages/authentication/sign-in';
import RequireAuth from "@/components/RequireAuth";

const App = () => {
    return (
        <AuthProvider>
            <IntlProvider locale="en" messages={locales.en}>
                <Routes>
                    <Route path="/login" element={<SignIn/>}/>
                    <Route path="/" element={<RequireAuth><Frame/></RequireAuth>}>
                        <Route index element={<RequireAuth><BoardsPage/></RequireAuth>}/>
                        <Route path="boards/new" element={<RequireAuth><CreateBoardPage/></RequireAuth>}/>
                        <Route path="boards/:id" element={<RequireAuth><BoardPage/></RequireAuth>}/>
                        <Route path="boards" element={<RequireAuth><BoardsPage/></RequireAuth>}/>
                        <Route path="calendar" element={<RequireAuth><CalendarPage/></RequireAuth>}/>
                        <Route path="profile" element={<RequireAuth><ProfilePage/></RequireAuth>}/>
                    </Route>
                    <Route path="*" element={<Error404Page/>}/>
                </Routes>
            </IntlProvider>
        </AuthProvider>
    );
};

export default App;
