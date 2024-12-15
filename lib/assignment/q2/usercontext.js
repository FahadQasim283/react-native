import React, { createContext, useContext, useState } from "react";

const UserRoleContext = createContext();

export const UserRoleProvider = ({ children }) => {
  const [userRole, setUserRole] = useState("user");
  return (
    <UserRoleContext.Provider value={{ userRole, setUserRole }}>
      {children}
    </UserRoleContext.Provider>
  );
};
export const useUserRole = () => {
  return useContext(UserRoleContext);
};
