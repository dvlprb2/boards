import React from 'react';
import {Avatar, Breadcrumb, Button, Divider, Panel, Stack} from 'rsuite';
import {useAuth} from "@/contexts/AuthContext";
import moment from "moment";


const Page = () => {
    const {currentUser} = useAuth();
    return (
        <Panel
            header={
                <>
                    <h3 className="title">Profile</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item active>Profile</Breadcrumb.Item>
                    </Breadcrumb>
                </>
            }
        >
            <>
                <Stack spacing={24} style={{marginBottom: 16}}>
                    <Avatar circle src={currentUser.photoURL}
                            alt="avatar" className='user-avatar'/>
                    <div>
                        <h4>{currentUser.displayName}</h4>
                        <p>{currentUser.email}</p>
                        <p>Joined DB2 Boards
                            on {moment(currentUser.metadata.creationTime).format('LL')} ({moment(currentUser.metadata.creationTime).fromNow()}).</p>
                        <p>Last log
                            on {moment(currentUser.metadata.lastSignInTime).format('LL')} ({moment(currentUser.metadata.lastSignInTime).fromNow()}).</p>
                    </div>
                </Stack>
                <Divider/>
                <Panel header="Delete user">
                    <p style={{marginBottom: 10}}>Once you delete your user, there is no going back. Please be
                        certain.</p>
                    <Button color="red" appearance="primary">
                        Delete user
                    </Button>
                </Panel>
            </>

        </Panel>
    );
};

export default Page;
