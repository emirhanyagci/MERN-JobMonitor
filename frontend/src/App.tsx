import { ThemeProvider } from "@/components/theme-provider";
import { Route, Routes } from "react-router-dom";
import HomeLayout from "@/components/HomeLayout";
import Home from "@/pages/Home";
import Dash from "@/pages/Dash";
import DashLayout from "./components/DashLayout";
function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />}></Route>
          <Route path="dash" element={<DashLayout />}>
            <Route index element={<Dash />}></Route>
          </Route>
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
