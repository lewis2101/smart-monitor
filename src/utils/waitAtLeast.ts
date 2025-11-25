export function waitAtLeast(milliseconds: number) {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      clearTimeout(timeout);
      resolve(true);
    }, milliseconds);
  });
}

export function executeWithWaitAtLeast<T>(callback: () => Promise<T>, ms: number): Promise<T> {
  return new Promise<T>((resolve) => {
    Promise.allSettled([callback(), waitAtLeast(ms)]).then(([response]) => {
      if (response.status === "fulfilled") {
        resolve(response.value as T);
      } else {
        throw response.reason;
      }
    });
  });
}
