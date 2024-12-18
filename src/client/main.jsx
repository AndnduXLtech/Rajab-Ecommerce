import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { StrictMode } from "react";
import { router } from "@/page/utils/Route.page";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";

import { Provider } from "react-redux"; // Fixed the typo here
import store from "./store/store";
import { Toaster } from "sonner";
//import { ThemeProvider } from "./components/theme-provider";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        {/* <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme"> */}
        <RouterProvider router={router} />
        {/* </ThemeProvider> */}
        <Toaster position="top-right" richColors />
      </Provider>
    </QueryClientProvider>
  </StrictMode>
);
