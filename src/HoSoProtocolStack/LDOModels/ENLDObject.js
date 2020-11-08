class ENLDObject {
  static executingMode = {
    waitAndContinue: '@WAIT_RESPONSE_CONTINUE',
    asyncContinue: '@EXEC_CONTINUE',
  };
  constructor(type, executorParams, executingMode) {
    this.type = type;
    this.executorParams = executorParams;
    this.executingMode = executingMode;
  }
}

export default ENLDObject;
