export type UseUserPresenceOptions = {
	enableInactivityTracking?: boolean;
	inactivityTimeout?: number;
};

export type UseUserPresenceStates = {
	/** Whether user is currently on the page */
	isPresent: boolean;
	/** Whether user is actively interacting (if enabled) */
	isActive?: boolean;
};
