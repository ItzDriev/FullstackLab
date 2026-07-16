import { useEffect, useState } from "react";

function useTypewriter(text: string, active: boolean, speed = 25) {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    //If sidebar is trunkated make text nothing
    if (!active) {
      setDisplay("");
      return;
    }

    //Typewriter shiish
    let i = 0;
    setDisplay("");
    //Uses the interval functionality in order to be able to adjust the speed of the text being written out
    const interval = setInterval(() => {
      i += 1;
      //Inclusive start, exclusive end - (0, 2) of "Text" would be "Te"
      setDisplay(text.slice(0, i));
      //Clear the timer if the text is finished being typed out
      if (i >= text.length) {
        clearInterval(interval);
      }
    }, speed);

    //Cleanup
    return () => clearInterval(interval);
  }, [active, text, speed]);

  return display;
}

export default useTypewriter;
