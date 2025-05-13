/** Default timeout before user is considered inactive */
export const DEFAULT_TIMEOUT = 60000;

/** List of events to track for user activity */
export const EVENTS = [
	/** Mouse interaction events */
	"mousedown",
	"mouseup",
	"mousemove",

	/** Touch device events */
	"touchstart",
	"touchmove",

	/** Keyboard interaction events */
	"keydown",

	/** Page scroll events */
	"wheel",
	"scroll",
] as const;
