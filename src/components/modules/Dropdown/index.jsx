"use client";

import { Children, cloneElement } from "react";
import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import ClickOutside from "../ClickOutside";

import useToggle from "@/hooks/useToggle";

import { cn } from "@/utils/helper";

import styles from "./DropdownContent.module.css";

function Dropdown(props) {
  const { children, className } = props;
  const [state, stateToggle] = useToggle(false);

  return (
    <ClickOutside
      onClick={() => stateToggle(false)}
      className={cn("relative", className)}
    >
      {Children.map(children, (child) =>
        cloneElement(child, { onClick: () => stateToggle(), state }),
      )}
    </ClickOutside>
  );
}

function DropdownToggle(props) {
  const { children, onClick, state, className } = props;

  return (
    <button
      onClick={onClick}
      className={className}
      aria-expanded={state}
    >
      {children}
    </button>
  );
}

function DropdownContent(props) {
  const { children, state, className } = props;
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
      <div
        ref={dropdownContentRef}
        className={cn("absolute left-0 top-0", className)}
      >
        {children}
      </div>
    </CSSTransition>
  );
}

export { Dropdown, DropdownToggle, DropdownContent };
