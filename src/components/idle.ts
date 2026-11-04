type Conn = { saveData?: boolean; effectiveType?: string };

/** True when the visitor asked to save data or is on a slow connection, or the device is low on memory. */
export function isConstrained() {
  const nav = navigator as Navigator & { connection?: Conn; deviceMemory?: number };
  const c = nav.connection;
  return !!c?.saveData || /2g|3g/.test(c?.effectiveType ?? "") || (nav.deviceMemory ?? 8) <= 2;
}

/** True on a connection too slow to spend on decorative background video. Unknown connections count as fast. */
export function isBelowFastConnection() {
  const c = (navigator as Navigator & { connection?: { downlink?: number } }).connection;
  return c?.downlink !== undefined && c.downlink < 5;
}

let pageSettled = false;

/** Runs `fn` once the page has first loaded and the browser has a spare moment; straight away after that. Returns a cancel function. */
export function whenPageIdle(fn: () => void) {
  let cancelled = false;
  let cancelIdle = () => {};
  const settle = () => {
    pageSettled = true;
    fn();
  };
  const run = () => {
    if (cancelled) return;
    if ("requestIdleCallback" in window) {
      const id = requestIdleCallback(settle, { timeout: 1500 });
      cancelIdle = () => cancelIdleCallback(id);
    } else {
      const id = setTimeout(settle, 300);
      cancelIdle = () => clearTimeout(id);
    }
  };
  if (pageSettled) {
    fn();
    return () => {};
  }
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    cancelled = true;
    cancelIdle();
    window.removeEventListener("load", run);
  };
}
