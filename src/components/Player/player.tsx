"use client";

import { useEffect, useState, useRef } from "react";

import Pause from "../../assets/pause.png";
import Play from "../../assets/play.png";
import Image from "next/image";
import "./player.css";

export default function Player() {
  const [playing, setPlaying] = useState();
  const [station, setStation] = useState();

  //To manager the audio player (play, pause, volume...)
  const track = useRef();

  //So i can play and pause the animation of the background gradient
  const gradient = useRef();

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
    setInterval(() => {
      var sec = document.getElementById("seconds");
      var min = document.getElementById("minutes");
      var hou = document.getElementById("hours");
      if (sec.textContent < 59) {
        sec.textContent++;
      } else {
        sec.textContent = 0;
        if (min.textContent < 59) {
          min.textContent++;
        } else {
          min.textContent = 0;
          hou.textContent++;
        }
      }
    }, 1000);
  }, []);

  //Change volume
  useEffect(() => {
    track.current.volume = volume;
  }, [volume]);

  //Play/pause + controlling the gradient + autoplay activating only after first time

  //Shuffle the links of the tracks received from the object of the station

  //Autoplay next song in the array if finished, then replay the tracklist
  const endedPlaying = () => {};
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
        type="audio/mpeg"
      ></audio>
      <div className={`player flex flex-row`}>
        <div className="backgroundCard" />
        <div className="mainCard">
          <div
            className="cover"
            style={{
              backgroundImage: `url('https://firebasestorage.googleapis.com/v0/b/codetune.appspot.com/o/calm.webp?alt=media&token=e60bd166-0998-46ed-92e0-5f9dc541d8f8')`,
            }}
          />
          <div className="titleCard">{}</div>
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
                setVolume(e.target.value);
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
              <h1 id="hours">00</h1>
              <h2>Hours</h2>
            </div>
            :
            <div className="time">
              <h1 id="minutes">00</h1>
              <h2>Minutes</h2>
            </div>
            :
            <div className="time">
              <h1 id="seconds">00</h1>
              <h2>Seconds</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
