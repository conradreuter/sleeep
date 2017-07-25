import 'jest'
import sleep from './sleep'

describe('The sleep function', () => {

  const TIME = 100
  const TIME_TOO_SHORT = TIME / 2
  const TIME_TOO_LONG = TIME * 2

  it('should return a promise that eventually resolves', async () => {
    await sleep(TIME)
  })

  it('should return a promise that resolves after the specified time has passed', () => {
    const succeed = sleep(TIME)
    const fail = new Promise((_, reject) => setTimeout(() => reject('Slept too long'), TIME_TOO_LONG))
    return Promise.race([succeed, fail])
  })

  it('should return a promise that does not resolve before the specified time has passed', () => {
    const succeed = new Promise(resolve => setTimeout(resolve, TIME_TOO_SHORT))
    const fail = sleep(TIME).then(() => Promise.reject('Slept too short'))
    return Promise.race([succeed, fail])
  })

  it('should return a function that returns a promise that eventually resolves to the first argument', () => {
    const value = {}
    return expect(Promise.resolve(value).then(sleep(TIME))).resolves.toBe(value)
  })

  it('should return a function that returns a promise that resolves to the first argument after the specified time has passed', () => {
    const value = {}
    const succeed = expect(Promise.resolve(value).then(sleep(TIME))).resolves.toBe(value)
    const fail = new Promise((_, reject) => setTimeout(() => reject('Slept too long'), TIME_TOO_LONG))
    return Promise.race([succeed, fail])
  })

  it('should return a function that returns a promise that does not resolve before the specified time has passed', () => {
    const succeed = new Promise(resolve => setTimeout(resolve, TIME_TOO_SHORT))
    const fail = Promise.resolve({}).then(sleep(TIME)).then(() => Promise.reject('Slept too short'))
    return Promise.race([succeed, fail])
  })
})
