# use-user-presence

Lightweight React hook that helps you track user presence and activity status in your app. Perfect for chat applications, user status indicators, or auto-save features.

## Installation

```bash
npm install use-user-presence
# or
pnpm add use-user-presence
```

## Examples

### Basic Presence Tracking
```tsx
import { useUserPresence } from "use-user-presence";

function UserPresent() {
  const { isPresent } = useUserPresence();

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

### Advanced Presence and Activity Tracking
```tsx
import { useUserPresence } from "use-user-presence";

function UserPresentAndActive() {
  const { isPresent, isActive } = useUserPresence({
    enableInactivityTracking: true,
    inactivityTimeout: 60000 // 1 minute
  });

  return (
    <div>
      {!isPresent ? (
        <span>Away</span>
      ) : !isActive ? (
        <span>Inactive</span>
      ) : (
        <span>Active</span>
      )}
    </div>
  );
}
```
