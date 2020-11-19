class Timer {
  constructor(start, end) {
    this.start = start;
    this.end = end;
  }

  static start = () => {
    this.start = new Date();
  };
  static end = () => {
    this.end = new Date();
    return this.end - this.start;
  };
}

export default Timer;
