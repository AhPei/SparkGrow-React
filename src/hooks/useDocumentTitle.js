import { useEffect } from "react";

export default (title, success = true) => {
  useEffect(() => {
    document.title = `Loading...`;
    if (success) document.title = title;
  }, [success]);
};
