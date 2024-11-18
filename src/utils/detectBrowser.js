export const detectIOS = () => {
  if (typeof navigator === 'undefined') {
    return false;
  }

  const platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown';
  return (
    ['iPad Simulator', 'iPhone Simulator', 'iPod Simulator', 'iPad', 'iPhone', 'iPod'].includes(platform) ||
    // iPad on iOS 13 detection
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};
