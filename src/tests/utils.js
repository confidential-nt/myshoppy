import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter, Routes } from "react-router-dom";

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
