/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";

export const useCountDown = ({ duration }: any) => {
  const [timeLeft, setTimeLeft] = useState<number | any>(duration);
  useEffect(() => {
    const timeoutId = setInterval(() => {
      setTimeLeft((timeLeft: number) => --timeLeft);
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [duration]);

  return [timeLeft, setTimeLeft];
};
