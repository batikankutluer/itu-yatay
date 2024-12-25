"use client";

import { useEffect, useState } from "react";

let deadline = "01 Jan 2025 00:00:00 GMT";

interface Kalan {
  total: number;
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
  ready: boolean;
}

function MutluYillar() {
  let [kalan, setKalan] = useState<Kalan>({
    total: 0,
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
    ready: true,
  });

  function getTimeRemaining() {
    let now = new Date();
    now.setHours(now.getHours() + 3);

    let t = Date.parse(deadline) - now.getTime();

    function addZero(num: number) {
      return num < 10 ? `0${num}` : `${num}`;
    }

    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));
    return {
      total: t,
      days: addZero(days),
      hours: addZero(hours),
      minutes: addZero(minutes),
      seconds: addZero(seconds),
      ready: false,
    };
  }

  function if2025() {
    return kalan.total <= 0 && !kalan.ready ? true : false;
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setKalan(getTimeRemaining());
    }, 1000);

    setKalan(getTimeRemaining());

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-row px-2 justify-between bg-red-600 font-bold 2xl:text-2xl text-xl">
      <div className="p-2">
        Mutlu Yıllar <span className="text-yellow-300">İTÜ</span>!
      </div>

      {if2025() ? (
        <div className=" p-2 pl-0">Merhaba 2025!</div>
      ) : (
        <div className="p-2 pl-0">
          <span className="hidden md:inline">
            2025'e Kalan<span className="text-red-300">:</span>{" "}
          </span>
          {Number(kalan.days) <= 0 ? (
            <></>
          ) : (
            <>
              {kalan.days} Gün <span className="text-red-400">- </span>
            </>
          )}
          {kalan.hours}:{kalan.minutes}:{kalan.seconds}
        </div>
      )}
    </div>
  );
}

export default MutluYillar;
