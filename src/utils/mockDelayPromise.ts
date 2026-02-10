export const mockDelayPromise = () => {
  const delay = Math.floor(Math.random() * 500) + 1500;

  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, delay);
  });
};
