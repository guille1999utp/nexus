import { useRef } from 'react';

const useScrollLock = () => {
  const scrollPosition = useRef(0);

  const lockScroll = () => {
    scrollPosition.current = window.scrollY;
    document.documentElement.style.setProperty('--scroll-top', `-${scrollPosition.current}px`);
    (document.body as HTMLElement).classList.add('body-modal-open');
  };

  const unlockScroll = () => {
    (document.body as HTMLElement).classList.remove('body-modal-open');
    document.documentElement.style.removeProperty('--scroll-top');
    window.scrollTo(0, scrollPosition.current);
  };

  return { lockScroll, unlockScroll };
};

export default useScrollLock;