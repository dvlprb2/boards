import React, {useContext, useEffect, useState} from "react";
import {auth} from "@/firebase";
import {
    onAuthStateChanged,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    UserInfo
} from "firebase/auth";

const AuthContext: React.Context<any> = React.createContext(null);
const provider = new GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({children}) {
    const [currentUser, setCurrentUser] = useState<UserInfo | null>(null);
    const [accessToken, setAccessToken] = useState<string>();
    const [loading, setLoading] = useState(true);

    function login() {
        return signInWithPopup(auth, provider);
    }

    function logout() {
        return signOut(auth);
    }

    useEffect(() => {
        return onAuthStateChanged(auth, async user => {
            const token = await user?.getIdToken();
            setAccessToken(token);
            setCurrentUser(user);
            setLoading(false);
        });
    }, []);

    const value = {
        accessToken,
        currentUser,
        loading,
        login,
        logout,
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}