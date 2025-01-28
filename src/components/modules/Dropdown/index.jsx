"use client";

import { Children, cloneElement } from "react";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import ClickOutside from "../ClickOutside";

import useToggle from "@/hooks/useToggle";

import styles from "./DropdownContent.module.css";

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

function DropdownToggle({ children, onClick, state, className }) {
  return (
    <div onClick={onClick} className={className} aria-hidden={!state}>
      {children}
    </div>
  );
}

function DropdownContent({ children, state, className }) {
  const dropdownContentRef = useRef(null);

  const cssTransitionClassName = {
    enter: styles["dropdownContent-enter"],
    enterActive: styles["dropdownContent-enter-active"],
    exitActive: styles["dropdownContent-exit-active"],
  };

  return (
    <CSSTransition
      in={state}
      nodeRef={dropdownContentRef}
      timeout={300}
      unmountOnExit
      classNames={cssTransitionClassName}
    >
      <div ref={dropdownContentRef} className={className} aria-hidden={!state}>
        {children}
      </div>
    </CSSTransition>
  );
}

export { Dropdown, DropdownToggle, DropdownContent };
