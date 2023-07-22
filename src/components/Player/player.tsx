/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useRef } from "react";
import Pause from "../../assets/pause.png";
import Play from "../../assets/play.png";
import { useStationContext } from "@/app/stationContext";
import Image from "next/image";
import "./player.css";
import type { station } from "@/app/types";
import { motion } from "framer-motion";

export default function Player() {
  const [playing, setPlaying] = useState(false);
  const [station, setStation] = useStationContext();
  const [volume, setVolume] = useState(0.5);
  const [autoPlay, setAutoPlay] = useState(false);
  const [playingLink, setPlayingLink] = useState("");
  const [playingIndex, setPlayingIndex] = useState(0);
  const shuffledLinks: string[] = [];

  const track = useRef<HTMLAudioElement>(null);
  const gradient = useRef<HTMLDivElement>(null);

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (seconds === 60) {
      setSeconds(0);
      setMinutes((prevMinutes) => prevMinutes + 1);
    }
  }, [seconds]);

  useEffect(() => {
    if (minutes === 60) {
      setMinutes(0);
      setHours((prevHours) => prevHours + 1);
    }
  }, [minutes]);

  //Change volume
  useEffect(() => {
    track.current!.volume = volume;
  }, [volume]);

  useEffect(() => {
    if (playing == true) {
      setAutoPlay(true);
    }
    if (playing === false) {
      track.current!.pause();
      gradient.current!.style.animationPlayState = "paused";
    } else {
      track.current!.play();
      gradient.current!.style.animationPlayState = "running";
    }
  }, [playing]);

  useEffect(() => {
    if (station.links && station.links.length !== 0) {
      setPlayingIndex(0);
      const tempTab = [...station.links];

      for (var i = 0; i < station.links.length; i++) {
        var randomNumber = Math.floor(Math.random() * tempTab.length);
        shuffledLinks.push(tempTab[randomNumber]);
        tempTab.splice(randomNumber, 1);
      }

      setPlayingLink(shuffledLinks[0]);
      setPlayingIndex(playingIndex + 1);
    }
  }, [station]);

  //Autoplay next song in the array if finished, then replay the tracklist
  const endedPlaying = () => {
    if (playingIndex + 1 === station.links.length) {
      setPlayingIndex(0);
    } else {
      setPlayingIndex(playingIndex + 1);
    }
    setPlayingLink(shuffledLinks[playingIndex]);
    track.current!.play();
  };

  return (
    <div className="flex justify-center items-center">
      <div ref={gradient} className="backgroundGradient" />
      <audio
        onEnded={() => {
          endedPlaying();
        }}
        id="player"
        autoPlay={autoPlay}
        ref={track}
        src={playingLink}
        controls
        style={{ display: "none" }}
      />
      <motion.div
        initial={{ x: 20, y: 20, opacity: 0 }}
        whileInView={{ x: 0, y: 0, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className={`player flex flex-row`}
      >
        <div className="backgroundCard" />
        <div className="mainCard">
          <div
            className="cover"
            style={{
              backgroundImage: `url(${station.cover})`,
            }}
          />
          <div className="titleCard flex gap-5">
            <h1>{station.emoji}</h1>
            <h1>{station.name}</h1>
          </div>
          <div className="volumeCard">
            <button
              onClick={() => {
                setPlaying(!playing);
              }}
              style={{
                backgroundColor: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <Image
                width={20}
                height={20}
                src={playing ? Pause : Play}
                alt={""}
              />
            </button>
            <input
              style={{ marginLeft: "20px", accentColor: "white" }}
              onChange={(e) => {
                setVolume(parseFloat(e.target.value));
              }}
              value={volume}
              type="range"
              id="volume"
              name="volume"
              min="0"
              max="1"
              step="0.1"
            />
          </div>
          <div className="timerCard">
            <div className="time">
              <h1>{hours < 10 ? "0" + hours : hours}</h1>
              <h2>Hours</h2>
            </div>
            :
            <div className="time">
              <h1>{minutes < 10 ? "0" + minutes : minutes}</h1>
              <h2>Minutes</h2>
            </div>
            :
            <div className="time">
              <h1>{seconds < 10 ? "0" + seconds : seconds}</h1>
              <h2>Seconds</h2>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
