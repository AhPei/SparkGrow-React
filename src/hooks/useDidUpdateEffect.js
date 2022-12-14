import { useEffect, useRef } from "react";

// Prevent useEffect first render
export default function useDidUpdateEffect(fn, inputs) {
  const didMountRef = useRef(false);

  useEffect(() => {
    if (didMountRef.current) return fn();
    didMountRef.current = true;
  }, inputs);
}
