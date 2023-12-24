import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "react-hot-toast";

import { ModalProvider } from "@/components/modal-provider";
import BottomBar from "@/components/layout/BottomBar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import FloatingButton from "@/components/FloatingButton";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <Toaster />
      <ModalProvider />
      <FloatingButton />
      <div className="flex flex-row justify-center">
        <LeftSidebar />
        <div className="relative flex-1 max-w-[650px] max-sm:pb-[3.1rem]">
          <Component {...pageProps} />
          <Analytics />
          <SpeedInsights />
        </div>
        <RightSidebar />
      </div>
      <BottomBar />
    </SessionProvider>
  );
}
