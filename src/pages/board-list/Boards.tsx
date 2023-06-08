import React, {useEffect, useState} from 'react';
import {Stack, Panel, Avatar, Loader, FlexboxGrid} from 'rsuite';
import {Link} from 'react-router-dom';
import {collection, getDocs, DocumentData} from "firebase/firestore";
import PageContent from '@/components/PageContent';
import {db} from "@/firebase";

const Boards = () => {
    const [boards, setBoards] = useState<DocumentData[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getDocs(collection(db, "boards")).then(snapshot => {
            const data = snapshot.docs.map(doc => {
                return {...doc.data(), id: doc.id};
            });
            setBoards(data);
            console.log(data);
            setLoading(false);
        });
    }, []);

    return (
        <PageContent bodyFill>
            {
                loading ?
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item>
                            <Loader content="Loading..."/>
                        </FlexboxGrid.Item>
                    </FlexboxGrid> :
                    <Stack spacing={20} wrap>
                        <Panel className="board-box board-new">
                            <Link to="/boards/new">
                                <Stack spacing={10} justifyContent="center" alignItems="center">
                                    <div className="title">Create new board</div>
                                </Stack>
                            </Link>
                        </Panel>

                        {boards.map(board => (
                            <Panel key={board.name} className="board-box">
                                <Link to={`/boards/${board.id}`}>
                                    <Stack spacing={10} justifyContent="space-between">
                                        <Avatar src={board.icon} alt="icon" style={{background: "transparent"}}/>
                                        <div className="title">{board.name}</div>
                                    </Stack>
                                </Link>
                            </Panel>
                        ))}
                    </Stack>
            }
        </PageContent>
    );
};

export default Boards;
