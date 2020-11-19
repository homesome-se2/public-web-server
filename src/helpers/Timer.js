class Timer {
  constructor(start, end) {
    this.startTime = start;
    this.endTime = end;
  }

  start() {
    this.startTime = new Date();
  }
  end() {
    this.endTime = new Date();
    return this.endTime - this.startTime;
  }
}

export default Timer;
