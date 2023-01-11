import { useEffect, useState } from "react";

const breakpoints = {
  sm: 576, // X-Small devices (portrait phones, less than 576px)
  md: 768, // Small devices (landscape phones, less than 768px)
  lg: 992, // Medium devices (tablets, less than 992px)
  xl: 1200, // Large devices (desktops, less than 1200px)
  xxl: 1400 // X-Large devices (large desktops, less than 1400px)
};

function getSize(width) {
  if (width < breakpoints.sm) {
    return "xs";
  } else if (width < breakpoints.md) {
    return "sm";
  } else if (width < breakpoints.lg) {
    return "md";
  } else if (width < breakpoints.xl) {
    return "lg";
  } else if  (width < breakpoints.xxl) {
    return "xl";
  } else {
    return "xxl";
  }
}

export default function showScreenSize() {
  const [width, setWidth] = useState(window.innerWidth);
  const [size, setSize] = useState(getSize(width));

  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
      setSize(getSize(window.innerWidth));
    }

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    console.clear();
    console.log("The Screen Size is:",size);
  }, [size]);

  // return console.log(width, size);
}
