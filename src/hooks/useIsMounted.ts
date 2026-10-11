"use client";

import { useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

/**
 * React 19 compliant hook to determine whether the component has mounted on the client.
 * Avoids cascading setState in useEffect and satisfies the `react-hooks/set-state-in-effect` lint rule.
 */
export function useIsMounted(): boolean {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}
