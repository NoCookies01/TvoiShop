import React, { useRef, useEffect } from "react";


function useOutsideAlerter(ref: React.MutableRefObject<HTMLDivElement | undefined | null>, onOutsideClick: (event?: any) => void) {
  useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: any) {
      if (ref.current && !ref.current.contains(event.target)) {
        onOutsideClick(event);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

interface IProps{
  children: React.ReactNode[] | React.ReactNode;
  onOutsideClick: (event?: any) => void;
}

export default function OutsideAlerter({children, onOutsideClick}:IProps) {
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, onOutsideClick);

  return <div ref={wrapperRef}>{children}</div>;
}