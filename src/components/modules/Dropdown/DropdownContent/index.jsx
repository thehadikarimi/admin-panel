import { useRef } from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./DropdownContent.module.css";

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

export default DropdownContent;
