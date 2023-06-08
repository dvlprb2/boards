import React from 'react';
import {Breadcrumb, Panel} from 'rsuite';
import BoardInfoForm from "@/pages/board-create/BoardInfoForm";

const Page = () => {
    return (
        <Panel
            header={
                <>
                    <h3 className="title">Create Board</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
                        <Breadcrumb.Item href="/boards">Boards</Breadcrumb.Item>
                        <Breadcrumb.Item active>Create Board</Breadcrumb.Item>
                    </Breadcrumb>
                </>
            }
        >

            <BoardInfoForm/>
        </Panel>
    );
};

export default Page;
