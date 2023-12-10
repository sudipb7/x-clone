import type { AppProps } from "next/app";

import BottomBar from "@/components/layout/BottomBar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <LoginModal />
      <RegisterModal />
      <div className="flex flex-row justify-center">
        <LeftSidebar />
        <div className="relative flex-1 max-w-[650px]">
          <Component {...pageProps} />
        </div>
        <RightSidebar />
      </div>
      <BottomBar />
    </>
  );
}
