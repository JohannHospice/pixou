import { createContext, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logPage } from "../../api/analytics";

export const DEFAULT_TITLE = "Pixou - Investissez différement";

const PageContext = createContext({
  title: DEFAULT_TITLE,
  setTitle: (title: string | undefined) => {},
});

export default function Page({ children }) {
  const location = useLocation();

  useEffect(() => {
    logPage(location.pathname + location.search);
  }, [location]);

  return (
    <PageContext.Provider
      value={{
        title: document.title,
        setTitle: (title) => {
          console.log("set title");

          document.title = title ? title : DEFAULT_TITLE;
        },
      }}
    >
      {children}
    </PageContext.Provider>
  );
}

export function usePage() {
  return useContext(PageContext);
}

export function PageTitle({ title = DEFAULT_TITLE, children }) {
  const { setTitle } = usePage();

  useEffect(() => {
    if (title) {
      setTitle(title);
    }
  }, [title, setTitle]);

  return <>{children}</>;
}
