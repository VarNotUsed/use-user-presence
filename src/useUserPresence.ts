import { useState, useEffect, useCallback, useRef } from "react";
import type { UseUserPresenceOptions, UseUserPresenceStates } from "./types";
import { EVENTS } from "./constants";

export function useUserPresence({
  inactivityTimeoutMs,
}: UseUserPresenceOptions = {}): UseUserPresenceStates {
  const [isPresent, setIsPresent] = useState<boolean>(true);
  const isPresentRef = useRef<boolean>(true);
  const timerRef = useRef<number | undefined>(undefined);

  const handleFocus = useCallback(() => setIsPresent(true), []);
  const handleBlur = useCallback(() => setIsPresent(false), []);

  const handleVisibilityChange = useCallback(() => {
    setIsPresent(document.visibilityState === "visible");
  }, []);

  const resetInactivityTimer = useCallback(() => {
    if (!isPresentRef.current) {
      isPresentRef.current = true;
      setIsPresent(true);
    }
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (isPresentRef.current) {
        isPresentRef.current = false;
        setIsPresent(false);
      }
    }, inactivityTimeoutMs);
  }, [inactivityTimeoutMs]);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    if (inactivityTimeoutMs) {
      for (const event of EVENTS) {
        window.addEventListener(event, resetInactivityTimer);
      }
      resetInactivityTimer();
    }

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange,
      );
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);

      if (inactivityTimeoutMs) {
        for (const event of EVENTS) {
          window.removeEventListener(event, resetInactivityTimer);
        }
        window.clearTimeout(timerRef.current);
      }
    };
  }, [
    inactivityTimeoutMs,
    handleVisibilityChange,
    handleFocus,
    handleBlur,
    resetInactivityTimer,
  ]);

  return { isPresent };
}
