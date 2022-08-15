import { useContext } from "react";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "./LoginPage";
import { GlobalContext } from "./_app";

export default function Home() {
  const { isLogin } = useContext(GlobalContext);

  return <AppLayout>{isLogin ? <div>real home!!</div> : <LoginPage />}</AppLayout>;
}
