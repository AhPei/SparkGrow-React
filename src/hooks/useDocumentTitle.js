import { useEffect } from "react";

export default function useDocumentTitle(title, success = true) {
  useEffect(() => {
    document.title = `Loading...`;
    if (success) document.title = title;
  }, [success]);
}
