import React, { useContext, useEffect, useState } from "react";

export type User = {
  email: string;
  loaded: boolean;
  logged: boolean;
};
const defaultUserContext = {
  data: {
    email: "",
    loaded: false,
    logged: false,
  },
};

const UserContext = React.createContext(defaultUserContext);
export default UserContext;

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User>(defaultUserContext.data);

  useEffect(() => {
    (async function load() {
      try {
        const { data } = await (async function f() {
          if (user) throw new Error("ij");
          return defaultUserContext;
        })();
        console.log("load", data);

        const { email } = data;
        setUser({
          email,
          loaded: true,
          logged: true,
        });
      } catch (err) {
        setUser({
          ...user,
          loaded: true,
          logged: false,
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{
        data: user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export function useUser() {
  return useContext(UserContext);
}

export function withUser(Component: React.FC) {
  return function ({ ...props }: { [x: string]: any }): JSX.Element {
    return (
      <UserProvider>
        <Component {...props} />
      </UserProvider>
    );
  };
}
