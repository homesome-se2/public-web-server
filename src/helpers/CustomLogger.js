class CustomLogger {
  static styleScheme = {
    uContext: {
      background: '#addb67',
      text: 'uContext',
    },
    cService: '#60dac8',
    PLDStack: '#59a5d5',
  };
  constructor(mainTag, subTag) {
    this.mainTag = {
      type: mainTag,
      color: 'darkgrey',
      size: '0.2rem',
    };

    this.subTag = {
      body: subTag || '',
      color: 'darkgrey',
      background: '#f3f6ff',
      size: '1rem',
    };

    this.body = {
      color: '#008f68',
      size: '1rem',
    };
  }

  log(body = '') {
    console.log(
      `%c${CustomLogger.styleScheme[this.mainTag.type].text} %c${
        this.subTag.body
      }  %c${body}`,
      `background: ${
        CustomLogger.styleScheme[this.mainTag.type].background
      }; padding: 0.5em; border-radius: 5px;color: black;
      }; font-weight: bold; font-size: 0.9em;`,
      `background: ${this.subTag.background}; padding: 1em; border-radius: 10px;color: black; font-weight: bold; font-size: 1rem;`,
      `color: ${this.body.color}; font-weight: bold; font-size: ${this.body.size}; text-shadow: 0 0 5px rgba(0,0,0,0.2);`
    );
  }
}

export default CustomLogger;
