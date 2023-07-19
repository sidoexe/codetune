"use client";
import React, { useState } from "react";
import { stationsList } from "./stationsData";
import { useStationContext } from "@/app/stationContext";
import type { station } from "@/app/types";

type Props = {};

export default function Stations({}: Props) {
  const [playingCardName, setPlayingCardName] = useState("");
  const [station, setStation] = useStationContext();

  const selectStation = (data: station) => {
    setStation(data);
  };

  return (
    <>
      <div className="w-4/5 flex flex-wrap justify-center items-center gap-5">
        {stationsList.map((data, index) => (
          <button
            key={index}
            className={`w-[250px] h-[80px] flex justify-center items-center bg-[#ffffff00] backdrop-blur-sm rounded-xl text-3xl border border-solid scale-100 hover:scale-105 transition-all duration-300 hover:border-[#b4fe09] ${
              data.name === playingCardName
                ? "border-[#b4fe09]"
                : "border-[#ffffff2e]"
            }`}
            onClick={() => {
              selectStation(data);
            }}
          >
            <div className="flex gap-5">
              <h1>{data.emoji}</h1>
              <h1>{data.name}</h1>
            </div>
          </button>
        ))}
      </div>
    </>
  );
}
