import React, {useEffect} from 'react';
import {IconButton, Loader, Panel, Stack} from 'rsuite';
import GoogleIcon from '@rsuite/icons/legacy/Google';
import Brand from '@/components/Brand';
import {useAuth} from "@/contexts/AuthContext";
import {useNavigate} from "react-router-dom";

const SignIn = () => {
    const {login, loading, accessToken} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading && accessToken) {
            navigate('/');
        }
    }, [accessToken, loading, navigate]);

    const signIn = () => {
        if (!accessToken) {
            login();
        }
    };

    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            direction="column"
            style={{
                height: '100vh'
            }}
        >
            <Brand style={{marginBottom: 10}} showText/>

            <Panel bordered style={{background: '#fff', width: 400, textAlign: 'center'}} header={<h3>Sign In</h3>}>
                {
                    loading ? <Loader content="Please wait..."/> :
                        <IconButton color="red" appearance="primary" placement="left" icon={<GoogleIcon/>}
                                    onClick={signIn}>
                            Sign in with Google
                        </IconButton>
                }
            </Panel>
        </Stack>
    );
};

export default SignIn;
