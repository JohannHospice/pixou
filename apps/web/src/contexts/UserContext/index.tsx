import React, { useContext, useEffect, useState } from "react";
import { getLoggedUser } from "../../api/authentification";

type UserData = any;
type UserStatus = {
  loaded: boolean;
  logged: boolean;
};
export type User = {
  userStatus: UserStatus;
  userData: UserData;
};
const defaultUserContext = {
  userStatus: {
    loaded: false,
    logged: false,
  },
  userData: {},
};

const UserContext = React.createContext(defaultUserContext);
export default UserContext;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [userData, setUserData] = useState<UserData>(
    defaultUserContext.userData
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
        setUserData(user);
        setUserStatus({
          loaded: true,
          logged: false,
        });
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        userStatus,
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
