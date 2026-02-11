export const mockDelayPromise = () => {
  const delay = Math.floor(Math.random() * 1000) + 1000;

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
