"use client";

import { Children, cloneElement } from "react";

import ClickOutside from "../ClickOutside";

import useToggle from "@/hooks/useToggle";

function Dropdown({ children, className, exceptionRef }) {
  const [state, stateToggle] = useToggle(false);

  return (
    <ClickOutside
      onClick={() => stateToggle(false)}
      className={className}
      exceptionRef={exceptionRef}
    >
      {Children.map(children, (child) => {
        if (child.type.name === "DropdownToggle") {
          return cloneElement(child, { onClick: stateToggle, state });
        }
        if (child.type.name === "DropdownContent") {
          return cloneElement(child, { state });
        }
        return child;
      })}
    </ClickOutside>
  );
}

export default Dropdown;
