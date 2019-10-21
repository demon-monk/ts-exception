import { Exception } from './Exception'
export class ResultException<R, E extends Exception> {
  public constructor(private value: R, private exception?: E) {}

  public handle(): Promise<this>
  // public handle<M>(rHanlder: (result: R) => M): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHanlder: (result: R) => M | N,
  ): Promise<ResultException<M, N>>
  // public handle<M>(rHanlder: (result: R) => Promise<M>): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHanlder: (result: R) => Promise<M | N>,
  ): Promise<ResultException<M, N>>
  // public handle<M>(rHanlder: (result: R) => M, eHandler: (exception: E) => void): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHanlder: (r: R) => M | N,
    eHandler: (exception: E) => void,
  ): Promise<ResultException<M, N>>
  // public handle<M>(rHandler: (result: R) => Promise<M>, eHandler: (exceptin: E) => void): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => Promise<M | N>,
    eHandler: (exception: E) => void,
  ): Promise<ResultException<M, E>>
  // public handle<M, N>(rHandler: (result: R) => M, eHandler: (exception: E) => N): Promise<ResultException<M, N>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => M | N,
    eHandler: (exception: E) => N,
  ): Promise<ResultException<M, N>>
  // public handle<M, N>(rHandler: (result: R) => Promise<M>, eHandler: (exception: E) => N): Promise<ResultException<M, N>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => Promise<M | N>,
    eHandler: (exception: E) => N,
  ): Promise<ResultException<M, N>>
  // public handle<M>(rHandler: (result: R) => M, eHandler: (exception: E) => Promise<void>): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => M | N,
    eHandler: (exception: E) => Promise<void>,
  ): Promise<ResultException<M, N>>
  // public handle<M>(rHandler: (result: R) => Promise<M>, eHandler: (excetion: E) => Promise<void>): Promise<ResultException<M, E>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => Promise<M | N>,
    eHandler: (exception: E) => Promise<void>,
  ): Promise<ResultException<M, N>>
  // public handle<M, N>(rHandler: (result: R) => M, eHanlder: (exception: E) => Promise<N>): Promise<ResultException<M, N>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => M | N,
    eHandler: (exception: E) => Promise<N>,
  ): Promise<ResultException<M, N>>
  // public handle<M, N>(rHandler: (result: R) => Promise<M>, eHandler: (exception: E) => Promise<N>): Promise<ResultException<M, N>>
  public handle<M, N extends Exception>(
    rHandler: (result: R) => Promise<M | N>,
    eHandler: (excception: E) => Promise<N>,
  ): Promise<ResultException<M, N>>

  public handle<M, N extends Exception>(
    rHandler?: (result: R) => (M | N) | Promise<M | N>,
    eHandler?: (exception: E) => N,
  ) {
    if (!rHandler && !eHandler) {
      return Promise.resolve(this)
    }
    if (this.exception) {
      if (eHandler) {
        const newE = eHandler(this.exception)
        if (newE instanceof Promise) {
          return newE.then(re => {
            return new ResultException(undefined, re)
          })
        } else {
          return Promise.resolve(new ResultException(undefined, newE))
        }
      } else {
        return Promise.resolve(new ResultException(undefined, this.exception))
      }
    } else {
      if (rHandler) {
        const newR = rHandler(this.value)
        if (newR instanceof Promise) {
          return newR.then(re => {
            if (re instanceof Exception) {
              return new ResultException(void 0, re)
            } else {
              return new ResultException(re, void 0)
            }
          })
        } else {
          const exc = newR instanceof Exception ? newR : void 0
          const res = exc ? void 0 : newR
          return Promise.resolve(new ResultException(res, exc))
        }
      } else {
        return Promise.resolve(new ResultException(this.value, void 0))
      }
    }
  }

  public always(f: () => void) {
    f()
    return this
  }

  public getValue() {
    return this.value
  }

  public getException() {
    return this.exception
  }
}
