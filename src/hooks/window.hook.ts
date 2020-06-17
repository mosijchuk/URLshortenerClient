import React, { useLayoutEffect, useState } from "react";

export const useWindowSize = () => {
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const mobileWidth = 768;

  useLayoutEffect(() => {
    function updateSize() {
      window.innerWidth <= mobileWidth ? setIsMobile(true) : setIsMobile(false);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return { isMobile };
};
