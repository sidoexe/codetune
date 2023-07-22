"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Player from "@/components/Player/player";
import localFont from "next/font/local";
import Stations from "@/components/Stations/stations";
import { motion } from "framer-motion";

const ClashDisplay = localFont({
  src: [
    {
      path: "../assets/fonts/ClashDisplay-Extralight.ttf",
      weight: "200",
    },
    {
      path: "../assets/fonts/ClashDisplay-Light.ttf",
      weight: "300",
    },
    {
      path: "../assets/fonts/ClashDisplay-Regular.ttf",
      weight: "400",
    },
    {
      path: "../assets/fonts/ClashDisplay-Medium.ttf",
      weight: "500",
    },
    {
      path: "../assets/fonts/ClashDisplay-SemiBold.ttf",
      weight: "600",
    },
    {
      path: "../assets/fonts/ClashDisplay-Bold.ttf",
      weight: "700",
    },
  ],
});

export default function Main() {
  const [loaded, setLoaded] = useState(false);
  const preloader = useRef<HTMLDivElement>(null);
  useEffect(() => {
    window.addEventListener("load", () => {
      setLoaded(true);
      preloader.current!.style.opacity = "0";
      preloader.current!.style.position = "absolute";
      setTimeout(() => {
        preloader.current!.style.display = "none";
      }, 50);
    });
  }, []);
  return (
    <>
      <div ref={preloader} id="preloader">
        <Image src={require("../assets/preloader.png")} alt="preloader" />
      </div>
      {loaded ? (
        <div>
          <div className="w-screen mt-[10vh] lg:mt-0 lg:h-screen flex justify-center">
            <div className="flex text-center lg:text-left flex-col lg:flex-row justify-center items-center gap-10 lg:gap-40">
              <div className="flex flex-col gap-y-10 sm:gap-y-5 w-4/5 lg:w-[40%] items-center lg:items-start md:items-right">
                <div
                  className={`${ClashDisplay.className} text-5xl sm:text-6xl font-semibold`}
                >
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                  >
                    Code &
                  </motion.h1>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                  >
                    Groove With
                  </motion.h1>
                  <motion.h1
                    initial={{ y: 20, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="gradient-codetune"
                  >
                    CodeTune
                  </motion.h1>
                </div>
                <motion.p
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className={`${ClashDisplay.className} text-base sm:text-lg xl:text-xl`}
                >
                  With CodeTune, coders can listen to music while they
                  code,helping to boost their creativity, productivity and
                  focus, The music is carefully curated to enhance the coding
                  experience, ensuring that it does not interfere with the flow
                  of coding.
                </motion.p>
                <div
                  className={`${ClashDisplay.className} font-medium flex-row flex-wrap justify-center sm:justify-start flex text-lg xl:text-2xl gap-x-14 xl:gap-x-16 gap-y-5 sm:gap-y-48`}
                >
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    className="flex flex-col justify-center items-center"
                  >
                    <h1 className="text-3xl xl:text-4xl">+ 9</h1>
                    <h2 className="">Stations</h2>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1 }}
                    className="flex flex-col justify-center items-center"
                  >
                    <h1 className="text-3xl xl:text-4xl">+31 h</h1>
                    <h2 className="">Of Song</h2>
                  </motion.div>
                  <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.2 }}
                    className="flex flex-col justify-center items-center"
                  >
                    <h1 className="text-3xl xl:text-4xl">∞</h1>
                    <h2 className="">Listening</h2>
                  </motion.div>
                </div>
              </div>
              <div
                className={`${ClashDisplay.className} font-semibold xl:px-28`}
              >
                <Player />
              </div>
            </div>
          </div>
          <div className="">
            <h1
              className={`${ClashDisplay.className} text-3xl sm:text-5xl font-semibold text-center gradient-codetune-center mt-10 sm:mt-16`}
            >
              Change Stations
            </h1>
            <div
              className={`${ClashDisplay.className} text-xl font-normal flex justify-center items-center mt-24 mb-24`}
            >
              <Stations />
            </div>
          </div>
          <div>
            <h1
              className={`${ClashDisplay.className} font-light text-xl mb-8 text-center`}
            >
              © 2023 CodeTune™
            </h1>
          </div>
        </div>
      ) : null}
    </>
  );
}
