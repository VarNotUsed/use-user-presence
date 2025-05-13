import { useState, useEffect, useCallback, useRef } from "react";
import type { UseUserPresenceOptions, UseUserPresenceStates } from "./types";
import { DEFAULT_TIMEOUT, EVENTS } from "./constants";

export function useUserPresence({
	enableInactivityTracking = false,
	inactivityTimeout = DEFAULT_TIMEOUT,
}: UseUserPresenceOptions = {}): UseUserPresenceStates {
	const [isPresent, setIsPresent] = useState<boolean>(true);
	const [isActive, setIsActive] = useState<boolean>(true);
	const isActiveRef = useRef<boolean>(true);
	const timerRef = useRef<number | undefined>(undefined);

	const handleFocus = useCallback(() => setIsPresent(true), []);
	const handleBlur = useCallback(() => setIsPresent(false), []);

	const handleVisibilityChange = useCallback(() => {
		setIsPresent(document.visibilityState === "visible");
	}, []);

	const resetInactivityTimer = useCallback(() => {
		if (!isActiveRef.current) {
			isActiveRef.current = true;
			setIsActive(true);
		}
		window.clearTimeout(timerRef.current);
		timerRef.current = window.setTimeout(() => {
			if (isActiveRef.current) {
				isActiveRef.current = false;
				setIsActive(false);
			}
		}, inactivityTimeout);
	}, [inactivityTimeout]);

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
