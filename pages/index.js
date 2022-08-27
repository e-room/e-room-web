import { useContext } from "react";
import AppLayout from "../components/layout/AppLayout";
import LoginPage from "./LoginPage";
import ReviewMapPage from "./ReviewMapPage";
import { GlobalContext } from "./_app";

export default function Home() {
  const { isLogin } = useContext(GlobalContext);

  return (
    <AppLayout appBarObject={{ rightIcon: isLogin && "search" }}>
      {isLogin ? <ReviewMapPage /> : <LoginPage />}
    </AppLayout>
  );
}
