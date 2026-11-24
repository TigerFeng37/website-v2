// One-shot signal for "the preloader has started to lift", so page intros can
// choreograph against it. After it fires, subscribers are called immediately.

let done = false;
const listeners = new Set();

export const isIntroDone = () => done;

export function signalIntroDone() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
}

/** Calls `fn` once the intro is done (right away if it already is). Returns an unsubscribe. */
export function onIntroDone(fn) {
  if (done) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
}
