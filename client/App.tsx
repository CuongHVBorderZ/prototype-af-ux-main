import "./global.css";

import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";
import Index from "./pages/Index";
import MarketPrice from "./pages/MarketPrice";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home";
import PNItemEdit from "./pages/PNItemEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:id/detail" element={<PNItemEdit />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);

createRoot(document.getElementById("root")!).render(<App />);
