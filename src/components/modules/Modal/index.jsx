"use client";

import { useRef } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";

import ClickOutside from "../ClickOutside";

import useDOMReady from "@/hooks/useDOMReady";
import { cn } from "@/utils/helper";

import styles from "./Modal.module.css";

function Modal({ state, stateToggle, children, modalClassName }) {
  const DOMReady = useDOMReady();
  const modalOverlayRef = useRef();
  const modalContentRef = useRef();

  const modalOverlayClassName = {
    enter: styles["modalOverlay-enter"],
    enterActive: styles["modalOverlay-enter-active"],
    exitActive: styles["modalOverlay-exit-active"],
  };

  const modalContentClassName = {
    enter: styles["modalContent-enter"],
    enterActive: styles["modalContent-enter-active"],
    exitActive: styles["modalContent-exit-active"],
  };

  return DOMReady
    ? createPortal(
        <>
          <CSSTransition
            in={state}
            timeout={300}
            nodeRef={modalOverlayRef}
            unmountOnExit
            classNames={modalOverlayClassName}
          >
            <div
              ref={modalOverlayRef}
              className="fixed inset-0 left-0 top-0 z-40 bg-black/30 backdrop-blur-sm"
            ></div>
          </CSSTransition>
          <CSSTransition
            in={state}
            timeout={300}
            nodeRef={modalContentRef}
            unmountOnExit
            classNames={modalContentClassName}
          >
            <div
              ref={modalContentRef}
              className="fixed inset-0 left-0 top-0 z-50 flex items-center justify-center"
            >
              <ClickOutside
                onClick={() => stateToggle(false)}
                className={cn(
                  "absolute bottom-0 left-0 flex max-h-screen w-full overflow-hidden rounded-tl-2xl rounded-tr-2xl bg-white shadow-md lg:bottom-auto lg:left-1/2 lg:top-1/2 lg:max-h-[80vh] lg:w-auto lg:min-w-[512px] lg:max-w-[80vw] lg:-translate-x-1/2 lg:-translate-y-1/2 lg:rounded-2xl dark:bg-dark-500",
                  modalClassName,
                )}
              >
                <div className="grow">{children}</div>
              </ClickOutside>
            </div>
          </CSSTransition>
        </>,
        document.getElementById("modal-root"),
      )
    : null;
}

export default Modal;
