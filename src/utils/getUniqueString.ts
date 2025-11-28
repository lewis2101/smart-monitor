export function getUniqueString() {
  try {
    return crypto.randomUUID();
  } catch (error) {
    return getRandStrAsHash();
  }
}

function getRandStrAsHash() {
  const r = [];

  r.push(
    Math.floor(Math.random() * 0xffffffff + Date.now())
      .toString(16)
      .slice(0, 8),
  );
  r.push(
    Math.floor(Math.random() * 0xffffffff + Date.now())
      .toString(16)
      .slice(0, 4),
  );
  r.push(
    Math.floor(Math.random() * 0xffffffff + Date.now())
      .toString(16)
      .slice(0, 4),
  );
  r.push(
    Math.floor(Math.random() * 0xffffffff + Date.now())
      .toString(16)
      .slice(0, 4),
  );
  r.push(`${Math.floor(Math.random() * 0xffffffff + Date.now()).toString(16)}${Math.floor(Math.random() * 15 + 1)}`);

  return r.join("-");
}
