import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";
import { UserContext } from "../context/UserContext";
import { UserRepositoryContext } from "../context/UserRepositoryContext";
import { AuthContext } from "../context/AuthContext";

export function withRouter(routes, initialEntry = "/") {
  return (
    <MemoryRouter initialEntries={[initialEntry]}>
      <Routes>{routes}</Routes>
    </MemoryRouter>
  );
}

export function withReactQuery(children) {
  const queryClient = getReactQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export function withAllUserContexts(children, repository, { uid, logUserIn }) {
  return (
    <UserContext.Provider value={{ uid, logUserIn }}>
      <UserRepositoryContext.Provider value={{ userRepository: repository }}>
        {children}
      </UserRepositoryContext.Provider>
    </UserContext.Provider>
  );
}

export function withAuthContext(children, auth) {
  return (
    <AuthContext.Provider value={{ auth }}>{children}</AuthContext.Provider>
  );
}

function getReactQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    logger: {
      log: console.log,
      warn: console.warn,
      error: () => {},
    },
  });
}
