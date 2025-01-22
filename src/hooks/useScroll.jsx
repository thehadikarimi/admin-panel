import { useEffect, useState } from "react";

const useScroll = (ref) => {
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    const target = ref.current || window;

    const handleScroll = () => {
      if (target === window) setScroll(target.scrollY);

      if (target === ref.current) setScroll(target.scrollTop);
    };

    if (target) {
      target.addEventListener("scroll", handleScroll);
    }

    return () => {
      if (target) {
        target.removeEventListener("scroll", handleScroll);
      }
    };
  }, [ref]);

  return scroll;
};

export default useScroll;
