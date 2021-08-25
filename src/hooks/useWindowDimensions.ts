import React from 'react';

const useWindowDimensions = () => {
  const [windowDimensions, setWindowDimensions] = React.useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  React.useEffect(() => {
    /**
     * Update state on resize
     */
    const handleResize = () => {
      setWindowDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    windowDimensions,
    isDesktop: windowDimensions.width > 768,
    isTablet: windowDimensions.width < 768,
    isMobile: windowDimensions.width < 568,
  };
};

export default useWindowDimensions;
