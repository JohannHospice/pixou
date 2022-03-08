import React, { useContext, useEffect, useState } from "react";
import { getLoggedUser } from "../../api/authentification";

interface UserFirestore {
  firstName: string;
  lastName: string;
}
interface UserData {
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
  phoneNumber: string;
}
interface UserStatus {
  loaded: boolean;
  logged: boolean;
}
export interface User {
  userStatus: UserStatus;
  userData: UserData;
  userFirestore: UserFirestore;
}
const defaultUserContext = {
  userStatus: {
    loaded: false,
    logged: false,
  },
  userData: {
    email: "",
    displayName: "",
    photoURL: "",
    emailVerified: false,
    phoneNumber: "",
  },
  userFirestore: {
    firstName: "",
    lastName: "",
  },
};

const UserContext = React.createContext(defaultUserContext);
export default UserContext;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>(
    defaultUserContext.userData
  );
  const [userFirestore, setUserFirestore] = useState<UserFirestore>(
    defaultUserContext.userFirestore
  );
  const [userStatus, setUserStatus] = useState<UserStatus>(
    defaultUserContext.userStatus
  );

  useEffect(() => {
    getLoggedUser((user: any) => {
      console.log(user);
      if (user) {
        setUserData(user);
        setUserStatus({
          loaded: true,
          logged: true,
        });
      } else {
        setUserData(defaultUserContext.userData);
        setUserStatus({
          loaded: true,
          logged: false,
        });
      }
      setUserFirestore(defaultUserContext.userFirestore);
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        userStatus,
        userFirestore,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}

export function withUser(Component: React.FC<any>) {
  return function ({ ...props }: { [x: string]: any }): JSX.Element {
    return (
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    );
  };
}
