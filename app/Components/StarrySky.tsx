import { useEffect, useState } from "react";
import anime from "animejs/lib/anime.es";

const StarrySky = () => {
  const num = 500;
  const [vw, setvw] = useState(0);
  const [vh, setvh] = useState(0);

  useEffect(() => {
    if (window) {
      console.log("asdasdas");
      console.log(window.document.documentElement.clientHeight);

      setvh(
        Math.max(
          window.document.documentElement.clientHeight,
          window.innerHeight
        )
      );
      setvw(
        Math.max(window.document.documentElement.clientWidth, window.innerWidth)
      );
    }
  }, []);

  useEffect(() => {
    setRandomX(getRandomX());
    setRandomY(getRandomY());
    setRadius(randomRadius());
  }, [vh, vw]);

  const starryNight = () => {
    anime({
      targets: ["#sky .star"],
      opacity: [
        {
          duration: 700,
          value: "0",
        },
        {
          duration: 700,
          value: "1",
        },
      ],
      easing: "linear",
      loop: true,
      delay: (el, i) => 50 * i,
    });
  };

  const randomRadius = () => {
    return Math.random() * 0.7 + 0.6;
  };
  const getRandomX = () => {
    var li: string[] = [];
    {
      [...Array(num)].map((_, i) => {
        const val = Math.floor(Math.random() * Math.floor(vw)).toString();
        li.push(val);
      });
    }
    return li;
  };

  const getRandomY = () => {
    var li: string[] = [];
    {
      [...Array(num)].map((_, i) => {
        const val = Math.floor(Math.random() * Math.floor(vh)).toString();
        li.push(val);
      });
    }
    return li;
  };

  const [randomX, setRandomX] = useState(getRandomX());
  const [randomY, setRandomY] = useState(getRandomY());
  const [radius, setRadius] = useState(randomRadius());

  useEffect(() => {
    starryNight();
  }, []);

  return (
    <>
      <svg id="sky" className="-z-10">
        {[...Array(num)].map((x, i) => (
          <circle
            cx={randomX[i]}
            cy={randomY[i]}
            r={radius}
            stroke="none"
            strokeWidth="0"
            fill="white"
            key={i}
            className="star"
          />
        ))}
      </svg>
    </>
  );
};

export default StarrySky;
