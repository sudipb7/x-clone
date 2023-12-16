import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import BottomBar from "@/components/layout/BottomBar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import LoginModal from "@/components/modals/LoginModal";
import RegisterModal from "@/components/modals/RegisterModal";
import EditModal from "@/components/modals/EditModal";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <EditModal />
      <LoginModal />
      <RegisterModal />
      <div className="flex flex-row justify-center">
        <LeftSidebar />
        <div className="relative flex-1 max-w-[650px] max-sm:pb-[3.1rem]">
          <Component {...pageProps} />
        </div>
        <RightSidebar />
      </div>
      <BottomBar />
    </SessionProvider>
  );
}
