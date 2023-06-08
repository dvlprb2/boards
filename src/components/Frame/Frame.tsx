import React, {useEffect, useState} from 'react';
import classNames from 'classnames';
import {
    Container,
    Sidebar,
    Sidenav,
    Content,
    Nav,
    DOMHelper,
    CustomProvider
} from 'rsuite';
import enGB from 'rsuite/locales/en_GB';
import {Outlet} from 'react-router-dom';
import NavToggle from './NavToggle';
import Header from '../Header';
import NavLink from '../NavLink';
import Brand from '../Brand';
import {Icon} from '@rsuite/icons';
import {VscCalendar} from 'react-icons/vsc';
import {BsKanbanFill} from 'react-icons/bs';

const {getHeight, on} = DOMHelper;

const NavItem = props => {
    const {title, eventKey, ...rest} = props;
    return (
        <Nav.Item eventKey={eventKey} as={NavLink} {...rest}>
            {title}
        </Nav.Item>
    );
};

export interface NavItemData {
    eventKey: string;
    title: string;
    icon?: any;
    to?: string;
    target?: string;
    children?: NavItemData[];
}

const Frame = () => {
    const [expand, setExpand] = useState(false);
    const [windowHeight, setWindowHeight] = useState(getHeight(window));
    const [theme, setTheme] = useState<'light' | 'dark' | 'high-contrast'>('light');

    useEffect(() => {
        setWindowHeight(getHeight(window));
        const resizeListenner = on(window, 'resize', () => setWindowHeight(getHeight(window)));

        return () => {
            resizeListenner.off();
        };
    }, []);

    const containerClasses = classNames('page-container', {
        'container-full': !expand
    });

    const navBodyStyle: React.CSSProperties = expand
        ? {height: windowHeight - 112, overflow: 'auto'}
        : {};

    return (
        <CustomProvider theme={theme} locale={enGB}>
            <Container className="frame">
                <Sidebar
                    style={{display: 'flex', flexDirection: 'column'}}
                    width={expand ? 260 : 56}
                    collapsible
                >
                    <Sidenav.Header>
                        <Brand showText={expand}/>
                    </Sidenav.Header>
                    <Sidenav expanded={expand} appearance="subtle">
                        <Sidenav.Body style={navBodyStyle}>
                            <Nav>
                                <NavItem
                                    title="Boards"
                                    to="boards"
                                    eventKey="boards"
                                    icon={<Icon as={BsKanbanFill}/>}
                                />

                                <NavItem
                                    title="Calendar"
                                    to="calendar"
                                    eventKey="calendar"
                                    icon={<Icon as={VscCalendar}/>}
                                />
                            </Nav>
                        </Sidenav.Body>
                    </Sidenav>
                    <NavToggle expand={expand} onChange={() => setExpand(!expand)}/>
                </Sidebar>

                <Container className={containerClasses}>
                    <Header theme={theme} onChangeTheme={setTheme}/>
                    <Content>
                        <Outlet/>
                    </Content>
                </Container>
            </Container>
        </CustomProvider>
    );
};

export default Frame;
