import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const [deadline, setDeadline] = useState(targetDate);

  // Countdown by now
  // const countDownDate = new Date(targetDate).getTime();
  // const [countDown, setCountDown] = useState(countDownDate - new Date().getTime());
  // setCountDown(countDownDate - new Date().getTime());

  useEffect(() => {
    const interval = setInterval(
      () => setDeadline((prev) => prev - 1000),
      1000
    );
    return () => clearInterval(interval);
  }, [deadline]);

  return getRemainingTime(deadline);
};

// Calculate time left
const getRemainingTime = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);
  return [days, hours, minutes, seconds];
};

export { useCountdown };
