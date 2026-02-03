import { createContext, useContext, useRef, useState } from "react";

const Authcontext = createContext();

export function AuthProvider({ children }) {
  const [accesstoken, setAccesstoken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const accessTokenRef=useRef(null);

  const login = (token, info) => {
    setAccesstoken(token);
    setUserInfo(info);
    accessTokenRef.current=token;
  };

  const logout = () => {
    accessTokenRef.current=null;
    setAccesstoken(null);
    setUserInfo(null);
  };

  return (
    <Authcontext.Provider
      value={{ login, logout, accesstoken,accessTokenRef, userInfo, loading, setLoading }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => useContext(Authcontext);
