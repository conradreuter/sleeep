/**
 * Sleep for the given amount of milliseconds.
 *
 * The returned object is a combination of the following:
 * - a Promise that resolves to nothing after a specified time has passed
 * - an unary factory function that creates a Promise that resolves to the
 *   argument passed to the factory function after a specified time has passed.
 *
 * @param time The number of milliseconds to sleep for.
 * @returns a Promise and a factory function as described.
 *
 * @example
 * await sleep(100)
 *
 * @example
 * Promise.resolve(42)
 * .then(sleep(100))
 * .then(x => ...) // x === 42
 */
export default function sleep<T>(time: number): Promise<void> & ((value: T) => Promise<T>) {
  const promise = new Promise<void>(resolve => setTimeout(resolve, time))
  const factory = (value: T) => new Promise<T>(resolve => setTimeout(() => resolve(value), time))
  return Object.assign<(value: T) => Promise<T>, Promise<void>>(factory, {
    [Symbol.toStringTag]: 'Promise',
    then: (onfulfilled, onrejected) => promise.then(onfulfilled, onrejected),
    catch: (onrejected) => promise.catch(onrejected),
  })
}
