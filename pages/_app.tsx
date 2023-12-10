import type { AppProps } from "next/app";

import BottomBar from "@/components/layout/BottomBar";
import LeftSidebar from "@/components/layout/LeftSidebar";
import RightSidebar from "@/components/layout/RightSidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
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
