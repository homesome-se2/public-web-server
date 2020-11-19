import React, { Component } from 'react';
import './ControlsProgressInset.css';

class ControlsProgressInset extends Component {
  state = {};
  buildProgressPercentage = (progress) => {
    return progress + '%';
  };
  generateScale = (scaleValue) => {
    return 'scale(' + scaleValue + ')';
  };
  render() {
    const { scale, type, progress } = this.props;

    return (
      <div
        className="controls-progress-inset"
        style={{ transform: this.generateScale(scale) }}
      >
        <div className="progress-wrapper">
          <div className="top"></div>
          <div className="active-wrapper">
            <div
              style={{ height: this.buildProgressPercentage(progress) }}
              className={`active ${
                type === 'indeterminate' ? ' indeterminate' : 'determinate'
              }`}
            ></div>
          </div>
          <div className="base"></div>
          <svg viewBox="0 0 354 317">
            <defs>
              <clipPath id="base-clip">
                <path d="M343.55,115.3c-1.64-21.73-24.43-42.13-54.75-59.52C257.77,38,206.34,7.72,206.34,7.72S197,0,172.22,0l-.09,0L172,0c-24.74,0-34.12,7.72-34.12,7.72S86.48,38,55.45,55.78C25.13,73.17,2.34,93.57.7,115.3-.88,136.39.7,152,.7,211.43c0,69,43.28,69.83,70.27,75C123.77,296.54,130.58,309,172,309h.23c41.43,0,48.24-12.46,101-22.57,27-5.17,70.27-6,70.27-75C343.55,152,345.13,136.39,343.55,115.3Z" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    );
  }
}

export default ControlsProgressInset;
