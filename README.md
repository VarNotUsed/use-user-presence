# use-user-presence

[![npm version](https://badge.fury.io/js/use-user-presence.svg)](https://www.npmjs.com/package/use-user-presence)
[![License](https://img.shields.io/github/license/VarNotUsed/use-user-presence)](https://github.com/VarNotUsed/use-user-presence/blob/main/LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/use-user-presence)](https://bundlephobia.com/package/use-user-presence)

### A lightweight React hook for detecting user presence. This hook monitors:
- User visibility (tab active/inactive)
- Window focus state (window focused/blurred) 
- optionally user inactivity through ```inactivityTimeoutMs``` parameter:
  - Mouse interactions (clicks, movement)
  - Keyboard input
  - Touch events
  - Scrolling

## Installation

```bash
npm install use-user-presence
# or
pnpm add use-user-presence
```

## Example
```tsx
import { useUserPresence } from "use-user-presence";

function UserPresent() {
  const { isPresent } = useUserPresence({
    /* Optional parameter to also track user inactivity beside the base functionality */
    inactivityTimeoutMs: 60000, // 1 minute
  );

  return (
    <div>
      {isPresent ? (
        <span>Present</span>
      ) : (
        <span>Away</span>
      )}
    </div>
  );
}
```
