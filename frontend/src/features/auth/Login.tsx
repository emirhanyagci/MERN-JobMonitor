/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useState } from "react";
import { useLoginMutation } from "./authApi";
import { useDispatch } from "react-redux";
import { setCredentials } from "./authSlice";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [login] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  async function loginHandler() {
    try {
      const { accessToken } = await login({ username, password }).unwrap();

      dispatch(setCredentials(accessToken));
      setUsername("");
      setPassword("");
      navigate("/dash");
    } catch (err: any) {
      console.log(err);

      if (err.status === 400 || err.status === 401) {
        setErrMsg(err.data.message);
      } else setErrMsg("Somethink went wrong");
    }
  }
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your username below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        {errMsg && (
          <div
            className="text-sm text-red-800 rounded-lg dark:text-red-400"
            role="alert"
          >
            {errMsg}
          </div>
        )}

        <div className="grid gap-2">
          <Label htmlFor="username">Username</Label>
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            id="username"
            type="text"
            placeholder="jack"
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            required
          />
        </div>
        <div className="flex items-center gap-2">
          <Checkbox id="trust" />
          <Label htmlFor="trust">Trust this device</Label>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={loginHandler} className="w-full">
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
}
