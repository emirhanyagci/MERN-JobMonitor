import { ThemeProvider } from "@/components/theme-provider";
import { Navigate, Route, Routes } from "react-router-dom";
import HomeLayout from "@/components/HomeLayout";
import Home from "@/pages/Home";
import Dash from "@/pages/Dash";
import Users from "@/pages/Users";
import DashLayout from "@/components/DashLayout";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import RequireAuth from "./features/auth/RequireAuth";
import PersistLogin from "./features/auth/PersistLogin";
import { Toaster } from "./components/ui/toaster";
import { RoleEnum } from "./constants/roles";
function App() {
  return (
    <ThemeProvider defaultTheme="dark">
      <Routes>
        <Route path="/" element={<HomeLayout />}>
          <Route index element={<Home />}></Route>
          <Route element={<PersistLogin />}>
            <Route
              element={
                <RequireAuth
                  allowedRoles={[
                    RoleEnum.Employee,
                    RoleEnum.Manager,
                    RoleEnum.Admin,
                  ]}
                />
              }
            >
              <Route path="dash" element={<DashLayout />}>
                <Route index element={<Navigate to="notes" replace />} />
                <Route path="notes" element={<Dash />}>
                  <Route path=":noteId" element={<EditNote />}></Route>
                </Route>

                <Route
                  element={
                    <RequireAuth
                      allowedRoles={[RoleEnum.Manager, RoleEnum.Admin]}
                    />
                  }
                >
                  <Route path="users" element={<Users />}>
                    // this route for modal
                    <Route path=":userId" element={<EditUser />}></Route>
                  </Route>
                </Route>
              </Route>
            </Route>
          </Route>
        </Route>
      </Routes>
      <Toaster />
    </ThemeProvider>
  );
}

export default App;
