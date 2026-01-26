import { createContext, useContext, useState } from "react";

const Authcontext = createContext();

export function AuthProvider({ children }) {
  const [accesstoken, setAccesstoken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = (token, info) => {
    setAccesstoken(token);
    setUserInfo(info);
  };

  const logout = () => {
    setAccesstoken(null);
    setUserInfo(null);
  };

  return (
    <Authcontext.Provider
      value={{ login, logout, accesstoken, userInfo, loading, setLoading }}
    >
      {children}
    </Authcontext.Provider>
  );
}

export const useAuth = () => useContext(Authcontext);
