import React, {useEffect, useState} from 'react';
import {Breadcrumb} from 'rsuite';
import NavLink from '@/components/NavLink';
import PageContent from '@/components/PageContent';
import {useParams} from "react-router-dom";
import {doc, getDoc, DocumentData} from "firebase/firestore";
import {db} from "@/firebase";

const Page = () => {
    const {id} = useParams<string>();
    const [board, setBoard] = useState<DocumentData>();

    useEffect(() => {
        console.log(id);
        getDoc(doc(db, "boards/" + id)).then(snapshot => {
            console.log(snapshot.data());
            setBoard(snapshot.data());
        });
    }, [id]);

    return (
        <PageContent
            className="board-wrapper"
            showCopyright={false}
            header={
                <>
                    <h3 className="title">{board?.name}</h3>
                    <Breadcrumb>
                        <Breadcrumb.Item to="/" as={NavLink}>
                            Home
                        </Breadcrumb.Item>
                        <Breadcrumb.Item to="/boards" as={NavLink}>
                            Boards
                        </Breadcrumb.Item>
                        <Breadcrumb.Item active>{board?.name}</Breadcrumb.Item>
                    </Breadcrumb>
                </>
            }
        >
            {/*<Board data={board?.data as CardList} />*/}
        </PageContent>
    );
};

export default Page;
