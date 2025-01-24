"use client";

import { useRef, useEffect } from "react";

function ClickOutside({ children, exceptionRef, onClick, className }) {
  const wrapperRef = useRef(null);

  useEffect(() => {
    const clickHandler = (e) => {
      let clickedInside = false;

      if (exceptionRef) {
        clickedInside =
          (wrapperRef.current && wrapperRef.current.contains(e.target)) ||
          (exceptionRef.current && exceptionRef.current === e.target) ||
          (exceptionRef.current && exceptionRef.current.contains(e.target));
      } else {
        clickedInside =
          wrapperRef.current && wrapperRef.current.contains(e.target);
      }

      if (!clickedInside) onClick();
    };

    document.addEventListener("mousedown", clickHandler);

    return () => {
      document.removeEventListener("mousedown", clickHandler);
    };
  }, [exceptionRef, onClick]);

  return (
    <div ref={wrapperRef} className={className}>
      {children}
    </div>
  );
}

export default ClickOutside;
