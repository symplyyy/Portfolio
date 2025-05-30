import "@/styles/globals.css"
import "@/components/ScrollFloat.css"
import type { AppProps } from "next/app"
import { Geist, Geist_Mono } from "next/font/google"
import SmoothScroll from "@/components/SmoothScroll"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SmoothScroll>
      <div className={`${geistSans.variable} ${geistMono.variable} font-sans`}>
        <Component {...pageProps} />
      </div>
    </SmoothScroll>
  )
}
