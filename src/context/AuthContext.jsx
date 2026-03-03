import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);



  const value = {
    currentUser,
    loading,
  
  };

  return (
    <AuthContext.Provider value={{ ...value, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
