import { useEffect, useState } from "react";

export default () => {
  const [value, setValue] = useState<number>(0);
  const handleClick = () => {
    setValue((state) => state + 1);
  };
  useEffect(() => {
    if (value < 2) return;
    console.log("value changed");
  }, [value]);
  return (
    <>
      <div>{value}</div>
      <button className="btn bg-slate-600" onClick={handleClick}>
        +
      </button>
    </>
  );
};
