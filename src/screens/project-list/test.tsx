import { useEffect, useState } from "react";

export const Test = () => {
  const [num, setNum] = useState(0);

  const add = () => setNum(num + 1);

  useEffect(() => {
    setInterval(() => {
      console.log(num);
    }, 1000);
  }, [num]);
  console.log(num);
  return (
    <div>
      <button onClick={add}>add {num}</button>
    </div>
  );
};
