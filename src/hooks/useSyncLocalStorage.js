import CryptoJS from "crypto-js";
import { useEffect, useRef, useState } from "react";

const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;

function encrypt(data) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), SECRET_KEY).toString();
}

function decrypt(encryptedData) {
  return JSON.parse(
    CryptoJS.AES.decrypt(encryptedData, SECRET_KEY).toString(CryptoJS.enc.Utf8)
  );
}

export default function useSyncLocalStorage(stateKeys, defaultValue) {
  const stateKey = Array.isArray(stateKeys) ? stateKeys.join("_") : stateKeys;
  const [state, setState] = useState(defaultValue);
  const isNewSession = useRef(true);

  // Store data
  useEffect(() => {
    // Run once
    if (isNewSession.current) {
      const currentState = localStorage.getItem(stateKey);
      if (currentState) setState(decrypt(currentState));
      else setState(defaultValue);
      isNewSession.current = false;
      return;
    }
    try {
      localStorage.setItem(stateKey, encrypt(state));
    } catch (error) {}
  }, [state, stateKey, defaultValue]);

  // Listen when value changed, Broadcast
  useEffect(() => {
    const onReceieveMessage = (e) => {
      const { key, newValue } = e;
      if (key === stateKey) setState(decrypt(newValue));
    };
    window.addEventListener("storage", onReceieveMessage);
    return () => window.removeEventListener("storage", onReceieveMessage);
  }, [stateKey, setState]);

  return [state, setState];
}
