import { useState, useEffect, useCallback, useRef } from "react";
import type { UseUserPresenceOptions, UseUserPresenceStates } from "./types";
import { DEFAULT_TIMEOUT, EVENTS } from "./constants";

export function useUserPresence({
	enableInactivityTracking = false,
	inactivityTimeout = DEFAULT_TIMEOUT,
}: UseUserPresenceOptions = {}): UseUserPresenceStates {
	const [isPresent, setIsPresent] = useState(true);
	const [isActive, setIsActive] = useState(true);
	const timerRef = useRef<number | undefined>(undefined);

	const handleFocus = useCallback(() => setIsPresent(true), []);
	const handleBlur = useCallback(() => setIsPresent(false), []);

	const handleVisibilityChange = useCallback(() => {
		setIsPresent(document.visibilityState === "visible");
	}, []);

	const handleActivity = useCallback(() => {
		setIsActive(true);
	}, []);

	const resetInactivityTimer = useCallback(() => {
		handleActivity();
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			setIsActive(false);
		}, inactivityTimeout);
	}, [handleActivity, inactivityTimeout]);

	useEffect(() => {
		try {
			document.addEventListener("visibilitychange", handleVisibilityChange);
			window.addEventListener("focus", handleFocus);
			window.addEventListener("blur", handleBlur);

			if (enableInactivityTracking) {
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

				if (enableInactivityTracking) {
					for (const event of EVENTS) {
						window.removeEventListener(event, resetInactivityTimer);
					}
					window.clearTimeout(timerRef.current);
				}
			};
		} catch (error) {
			console.error("[useUserPresence] Error:", error);
			return undefined;
		}
	}, [
		enableInactivityTracking,
		handleVisibilityChange,
		handleFocus,
		handleBlur,
		resetInactivityTimer,
	]);

	return {
		isPresent,
		...(enableInactivityTracking && { isActive }),
	};
}
