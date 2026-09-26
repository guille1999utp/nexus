import { useState, useEffect } from "react";

const useIsIphoneOrSafari = () => {
  const [isIphoneOrSafari, setIsIphoneOrSafari] = useState(false);

  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const isIphone = /iPhone/.test(userAgent);
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    setIsIphoneOrSafari(isIphone || isSafari);
  }, []);

  return isIphoneOrSafari;
};

export default useIsIphoneOrSafari;
