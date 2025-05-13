export type UseUserPresenceOptions = {
  inactivityTimeoutMs?: number;
};

export type UseUserPresenceStates = {
  /** Whether user is currently on the page or active (if timeout enabled) */
  isPresent: boolean;
};
