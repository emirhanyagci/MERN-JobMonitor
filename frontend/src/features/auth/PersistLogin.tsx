import { useSelector } from "react-redux";
import { useRefreshMutation } from "./authApi";
import { selectCurrentToken } from "./authSlice";
import usePersist from "./usePersist";
import { useEffect } from "react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Navigate, Outlet } from "react-router-dom";

export default function PersistLogin() {
  const [persist] = usePersist();
  const token = useSelector(selectCurrentToken);
  const [refresh, { isLoading, isSuccess, isError, isUninitialized }] =
    useRefreshMutation();

  useEffect(() => {
    async function verifyRefreshToken() {
      try {
        await refresh(undefined).unwrap();
      } catch (err) {
        console.error(err);
      }
    }

    if (!token && persist) {
      verifyRefreshToken();
    }
  }, []);

  if (!persist && token) return <Outlet />;
  if (!token && !persist) return <Navigate to="/" />;
  if (isLoading) return <LoadingSpinner className="w-16 h-16 m-5" />;
  if (isError) {
    return <Navigate to="/" />;
  }
  if (isSuccess) return <Outlet />;
  if (token && isUninitialized) return <Outlet />;
}
