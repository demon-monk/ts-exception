import { Exception } from "./Exception";
export class ResultException<R, E extends Exception> {
  constructor(private value: R, private exception: E) {}
  /**
   * R: M, M | N, Promise<M>, Promise<M | N>
   * E: N, Promise<N>
   */
  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => M,
    eHandler?: (e: E) => Promise<N>
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => Promise<M>,
    eHandler?: (e: E) => N
  ): Promise<ResultException<M, N>>;

  // case 1
  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => Promise<M>,
    eHandler?: (e: E) => N
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => Promise<M | N>,
    eHandler?: (e: E) => N
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => M,
    eHandler?: (e: E) => N
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => M | N,
    eHandler?: (e: E) => Promise<N>
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => Promise<M>,
    eHandler?: (e: E) => Promise<N>
  ): Promise<ResultException<M, N>>;

  handle<M = R, N extends Exception = E>(
    rHandler?: (r: R) => Promise<M | N>,
    eHandler?: (e: E) => Promise<N>
  ): Promise<ResultException<M, N>>;

  handle<M, N extends Exception>(
    rHandler: (value: R) => R | M | (M | N) | Promise<M> | Promise<M | N> = (
      value: R
    ) => this.value,
    eHandler: (exception: E) => E | N | Promise<N> = (exception: E) =>
      this.exception
  ) {
    const self = this;
    let newR = !this.exception ? rHandler(this.value) : undefined;
    let newE = this.exception ? eHandler(this.exception) : undefined;

    if (!(newR instanceof Promise) && !(newE instanceof Promise)) {
      return Promise.resolve(
        newR instanceof Exception
          ? new ResultException(undefined, newR)
          : new ResultException(newR, newE)
      );
    }
    if (newR instanceof Promise && newE instanceof Promise) {
      return Promise.all([newR, newE]).then(
        ([resolvedNewR, resolvedNewE]) =>
          new ResultException(resolvedNewR, resolvedNewE)
      );
    }
    if (newR instanceof Promise) {
      return newR.then(resolvedR =>
        resolvedR instanceof Exception
          ? new ResultException(undefined, resolvedR)
          : new ResultException(resolvedR, newE)
      );
    }
    if (newE instanceof Promise) {
      return newE.then(resolvedE => new ResultException(newR, resolvedE));
    }
  }

  always(f: () => void) {
    f();
  }

  getValue() {
    return this.value;
  }

  getException() {
    return this.exception;
  }
}

class TestResult {}
class TestResult1 {}
class TestException {}
class TestException1 {}

const re = new ResultException(new TestResult(), new TestException());
re.handle().then(re1 => {});
// test case 1
// const re1 = re.handle(() => new TestResult1());
