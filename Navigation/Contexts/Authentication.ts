import {createContext } from "react";

const AuthContext = createContext({
    userId: "",
    setUserId: (CurrentUser: string) => {},
});

export default AuthContext;