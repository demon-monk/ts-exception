import { ResultException } from "../ResultException";
import { Exception } from "../Exception";
class TestResult {}
class TestException extends Exception {}
class TestResult1 {}
class TestException1 extends Exception {}
const testResult = new TestResult();
const testException = new TestException();
describe("when original ResultException has exception", () => {
  const target = new ResultException(testResult, testException);
  const testResult1 = new TestResult1();
  const testException1 = new TestException1();
  describe("1: when rHandler => NewResult, eHandler => NewException", () => {
    it("should handle => Promise<ResultException<NewResult, NewException>>", async () => {
      const rHandler = jest.fn(() => testResult1);
      const eHandler = jest.fn(() => testException1);
      const result = target.handle(rHandler, eHandler);

      expect(rHandler).not.toHaveBeenCalled();
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException1);

      const resultException = await result;

      expect(resultException.getException()).toBe(testException1);
      expect(resultException.getValue()).toBe(undefined);
    });
  });
  describe("2: when rHandler => NewResult | NewException, eHandler => NewException", () => {
    it("should handle => Promose<ResultException<NewResult, NewException>>", async () => {
      const rHandler = jest.fn(() =>
        Math.random() > 0.5 ? testResult1 : testException1
      );
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);

      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    });
  });
  describe("3: when rHandler => Promise<NewResult>, eHandler => NewException", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => Promise.resolve(testResult1));
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
  describe("4: when rHandler => Promise<NewResult | NewException>, eHandler => NewException", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() =>
        Promise.resolve(Math.random() > 0.5 ? testResult1 : testException1)
      );
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
  describe("5: when rHandler => NewResult, eHandler => Promise<NewException>", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => testResult1);
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const resultP = target.handle(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
  describe("6: when rHandler => NewResult | NewException, eHandler => Promise<NewException>", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() =>
        Math.random() > 0.5 ? testResult1 : testException1
      );
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
  describe("7: when rHandler => Promise<NewResult>, eHandler => Promise<NewException>", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => Promise.resolve(testResult1));
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
  describe("8: when rHandler => Promise<NewResult | NewException>, eHandler => Promise<NewException>", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() =>
        Promise.resolve(Math.random() > 0.5 ? testResult1 : testException1)
      );
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(eHandler).toHaveBeenCalledTimes(1);
      expect(eHandler).toHaveBeenCalledWith(testException);
      expect(rHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    })
  });
});

describe("when origin ResultException only has result", () => {
  const target = new ResultException(new TestResult());
  const testResult1 = new TestResult1();
  const testException1 = new TestException1();
  describe("1: when rHandler => NewResult, eHandler => NewException,", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => testResult1);
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle(rHandler, eHandler);
  
      expect(eHandler).not.toHaveBeenCalled();
      expect(rHandler).toHaveBeenCalledTimes(1);
  
      const result = await resultP;
  
      expect(rHandler).toHaveBeenCalledWith(testResult1);
      expect(result.getException()).toBe(undefined);
      expect(result.getValue()).toBe(testResult1);
    })
  });
  describe("2: when rHandler => NewResult | NewException, eHandler => NewException, should handle => ResultException<NewResult, NewException>", () => {
    it("when rHandler actually return NewResult", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.6);
      const rHandler = jest.fn(() =>
        Math.random() > 0.5 ? testResult1 : testException1
      );
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );

      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const result = await resultP;

      expect(result.getValue()).toBe(testResult1);
      expect(result.getException()).toBe(undefined);
    });
    it("when rHandler actually return NewException", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.4);
      const rHandler = jest.fn(() =>
        Math.random() > 0.5 ? testResult1 : testException1
      );
      const eHandler = jest.fn(() => testException1);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );

      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const result = await resultP;

      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    });
    afterEach(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockClear();
    });
    afterAll(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockRestore();
    });
  });
  describe("3: when rHandler => Promise<NewResult>, eHandler => NewException, ", () => {

    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => Promise.resolve(testResult1));
      const eHandler = jest.fn(() => testException1);
      const result = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();
      const resultWithException  = await result
      expect(resultWithException.getValue()).toBe(testResult1);
      expect(resultWithException.getException()).toBe(undefined);

    })
  });
  describe("4: when rHandler => Promise<NewResult | NewException>, eHandler => NewException, should handle => Promise<ResultException<NewResult, NewException>>", () => {
    const rHandler = jest.fn(() =>
      Promise.resolve(Math.random() > 0.5 ? testResult1 : testException1)
    );
    const eHandler = jest.fn(() => testException1);
    beforeEach(() => {
      rHandler.mockClear();
      eHandler.mockClear();
    });
    it("when rHandler actually returns Promise<NewResult>", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.6);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const resultWithException = await resultP;
      expect(resultWithException.getValue()).toBe(testResult1);
      expect(resultWithException.getException()).toBe(undefined);
    });
    it("when rHanlder actually returns Promise<NewException>", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.4);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const resultWithException = await resultP;
      expect(resultWithException.getValue()).toBe(undefined);
      expect(resultWithException.getException()).toBe(testException1);
    });
    afterEach(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockClear();
    });
    afterAll(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockRestore();
    });
  });
  describe("5: when rHandler => NewResult, eHandler => Promise<NewException>,", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => testResult1);
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const result = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();
      const resultException = await result;
      expect(resultException.getValue()).toBe(testResult1);
    })
  });
  describe("6: when rHandler => NewResult | NewException, eHandler => Promise<NewException>, should handle => Promise<ResultException<NewResult, NewException>>", () => {
    const rHandler = jest.fn(() =>
      Math.random() > 0.5 ? testResult1 : testException1
    );
    const eHandler = jest.fn(() => Promise.resolve(testException1));
    beforeEach(() => {
      rHandler.mockClear();
      eHandler.mockClear();
    });
    it("when rHandler actually returns NewResult", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.6);
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(testResult1);
      expect(result.getException()).toBe(undefined);
    });

    it("when rHandler actually returns NewResult", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.4);
      const resultP = target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();
      const result = await resultP;
      expect(result.getValue()).toBe(undefined);
      expect(result.getException()).toBe(testException1);
    });
    afterEach(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockClear();
    });
    afterAll(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockRestore();
    });
  });
  describe("7: when rHandler => Promise<NewResult>, eHandler => Promise<NewException>", () => {
    it('should handle => Promise<ResultException<NewResult, NewException>>', async () => {
      const rHandler = jest.fn(() => Promise.resolve(testResult1));
      const eHandler = jest.fn(() => Promise.resolve(testException1));
      const result = await target.handle<TestResult1, TestException1>(rHandler, eHandler);
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(result.getValue()).toBe(testResult1);
      expect(result.getException()).toBe(undefined);
    })
  });
  describe("8: when rHandler => Promise<NewResult | NewException>, eHandler => Promise<NewException>, should handle => Promise<ResultException<NewResult, NewException>e", () => {
    const rHandler = jest.fn(() =>
      Promise.resolve(Math.random() > 0.5 ? testResult1 : testException1)
    );
    const eHandler = jest.fn(() => Promise.resolve(testException1));
    beforeEach(() => {
      rHandler.mockClear();
      eHandler.mockClear();
    });
    it("when rHandler actually returns Promise<NewResult>", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.6);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const resultWithException = await resultP;
      expect(resultWithException.getValue()).toBe(testResult1);
      expect(resultWithException.getException()).toBe(undefined);
    });
    it("when rHanlder actually returns Promise<NewException>", async () => {
      jest.spyOn(Math, "random").mockImplementation(() => 0.4);
      const resultP = target.handle<TestResult1, TestException1>(
        rHandler,
        eHandler
      );
      expect(rHandler).toHaveBeenCalledTimes(1);
      expect(rHandler).toHaveBeenCalledWith(testResult);
      expect(eHandler).not.toHaveBeenCalled();

      const resultWithException = await resultP;
      expect(resultWithException.getValue()).toBe(undefined);
      expect(resultWithException.getException()).toBe(testException1);
    });
    afterEach(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockClear();
    });
    afterAll(() => {
      ((Math.random as unknown) as jest.SpyInstance).mockRestore();
    });
  });
});
