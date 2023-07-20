/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { useEffect, useState, useRef } from "react";
import Pause from "../../assets/pause.png";
import Play from "../../assets/play.png";
import { useStationContext } from "@/app/stationContext";
import Image from "next/image";
import "./player.css";
import type { station } from "@/app/types";

export default function Player() {
  const [playing, setPlaying] = useState();
  const [station, setStation] = useStationContext();

  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  //To manager the audio player (play, pause, volume...)
  const track = useRef<HTMLAudioElement>(null);

  //So i can play and pause the animation of the background gradient
  const gradient = useRef<HTMLElement>(null);

  //State setting the default volume to 0.5/1
  const [volume, setVolume] = useState(0.5);

  /*Disabling autoplay initially due to potential issues with Firefox, 
    but reactivating it after the first play so that the second track plays automatically when the first one ends*/
  const [autoPlay, setAutoPlay] = useState(false);

  //For the playing track
  const [playingLink, setPlayingLink] = useState();

  //The array containing the links that will be played
  const [trackList, setTrackList] = useState([]);

  //The index of the current playing sound in the previous array : trackList
  const [playingIndex, setPlayingIndex] = useState(0);

  //Timer

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

  //Shuffle the links of the tracks received from the object of the station
  useEffect(() => {
    setPlayingIndex(0);
    trackList.splice(0, trackList.length);
    var tempTab = [...station?.links];
    for (var i = 0; i < station?.links.length; i++) {
      var randomNumber = Math.floor(Math.random() * tempTab.length);
      trackList.push(tempTab[randomNumber]);
      tempTab.splice(randomNumber, 1);
    }
    setPlayingLink(trackList[0]);
    setPlayingIndex(playingIndex + 1);
  }, [station]);

  //Autoplay next song in the array if finished, then replay the tracklist
  const endedPlaying = () => {
    if (playingIndex + 1 === station.links.length) {
      setPlayingIndex(0);
    } else {
      setPlayingIndex(playingIndex + 1);
    }
    setPlayingLink(trackList[playingIndex]);
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
      <div className={`player flex flex-row`}>
        <div className="backgroundCard" />
        <div className="mainCard">
          <div
            className="cover"
            style={{
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/codetune.appspot.com/o/calm.webp?alt=media&token=e60bd166-0998-46ed-92e0-5f9dc541d8f8')`,
            }}
          />
          <div className="titleCard flex gap-5">
            <h1>{station.emoji}</h1>
            <h1>{station.name}</h1>
          </div>
          <div className="volumeCard">
            <button
              onClick={() => {}}
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
      </div>
    </div>
  );
}
