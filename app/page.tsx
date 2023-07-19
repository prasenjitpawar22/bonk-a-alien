"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Score } from "./Components/Score";
import useSound from "use-sound";

export default function Home() {
  const [play] = useSound("pistol-shoot.mp3");

  const [alien, setAlien] = useState([
    { id: 0 },
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
  ]);

  const [showA, setShowA] = useState(-1);
  const [time, setTime] = useState(0);
  const [levelHard, setLevelHard] = useState(false);
  const [gameState, setGameState] = useState(false); // game default notStarted
  const [score, setScore] = useState(0);

  const l = [
    { id: 0, a: false },
    { id: 1, a: false },
    { id: 2, a: false },
    { id: 3, a: false },
    { id: 4, a: false },
    { id: 5, a: false },
  ];

  useEffect(() => {
    // when to start game ?
    // time != 0 and gameState==false
    // TODO: add pro or noob
    var inter: NodeJS.Timer;
    if (time !== 0 && gameState && levelHard) {
      inter = setInterval(interval, 650);
    }
    if (time !== 0 && gameState && !levelHard) {
      inter = setInterval(interval, 1050);
    }

    // when to stop the game?
    // if timmeee ups
    if (time >= 20) {
      // reset all props
      setTime(0);
      setGameState(false);
      setShowA(-1);
      setLevelHard(false);
    }

    return () => clearInterval(inter);
  }, [time, gameState]);

  // random show alien and increase time
  const interval = () => {
    const id = Math.floor(Math.random() * 7);
    setShowA(id);
    setTime(time + 1);
  };

  return (
    <main
      className="text-white w-full flex-col items-center h-screen
     flex justify-center xs:p-12 md:p-20"
    >
      <div className="absolute gap-16 w-full flex justify-center items-center top-5">
        <div>
          <p
            onClick={() => {
              if (!gameState) {
                setTime(1);
                setScore(0);
                setGameState(true);
              }
            }}
            className="hover:text-purple-900"
          >
            Noob Bonk{" "}
          </p>
        </div>
        <div>
          <Score score={score} setScore={setScore} />
        </div>
        <div>
          <p
            onClick={() => {
              setTime(1);
              setScore(0);
              setLevelHard(true);
              setGameState(true);
            }}
            className="hover:text-purple-900"
          >
            Pro Bonk{" "}
          </p>
        </div>
      </div>

      <div
        className="grid sm:gap-2 lg:gap-20 w-full mt-12 justify-items-center 
        grid-cols-3 "
      >
        {alien.map((n, i) => (
          <div key={i}>
            <div className="relative">
              <Image
                onClick={() => {
                  play();
                  setScore(score + 1);
                }}
                className={`select-none absolute xs:!w-12 sm:!w-20 sm:!h-20 !left-11 lg:!w-24 !h-fit top-4 
                 ${n.id === showA ? "" : "-z-10 hidden"} 
                 alien`}
                layout="fill" // required
                objectFit="cover" // change to suit your needs
                alt={"alien"}
                src={"/alien.png"}
                placeholder="blur"
                blurDataURL={"/alien.png"}
              />
              <div
                className="select-none
              xs:w-28 xs:h-28 sm:w-40 sm:h-40 md:w-44 md:h-36 lg:w-44 lg:h-44 relative"
              >
                <Image
                  layout="fill" // required
                  objectFit="cover" // change to suit your needs
                  alt={"planet"}
                  src={"/p22.png"}
                  placeholder="blur"
                  blurDataURL={"/p22.png"}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
