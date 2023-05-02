import React from 'react';
import {Routes, Route} from 'react-router-dom';
import {IntlProvider} from 'react-intl';
import locales from './locales';
import Frame from './components/Frame';
import Error404Page from './pages/authentication/404';
import MembersPage from './pages/members';
import CalendarPage from './pages/calendar';
import BoardsPage from './pages/board-list';
import BoardPage from './pages/board';
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
                        <Route path="members" element={<RequireAuth><MembersPage/></RequireAuth>}/>
                        <Route path="calendar" element={<RequireAuth><CalendarPage/></RequireAuth>}/>
                    </Route>
                    <Route path="*" element={<Error404Page/>}/>
                </Routes>
            </IntlProvider>
        </AuthProvider>
    );
};

export default App;
