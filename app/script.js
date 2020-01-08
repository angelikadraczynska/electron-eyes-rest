import React from 'react';
import { render } from 'react-dom';

class App extends React.Component {
  state = {
    status: 'off',
    time: 0,
    timer: null
  };

  handleStart(newStatus) {
    this.setState({
      status: newStatus,
      time: 1200,
      timer: setInterval(this.step, 1000)
    });
  }

  step = () => {
    this.setState({ time: this.state.time - 1 });
    if (this.state.time !== 0) {
      return;
    }
    if (this.state.status === 'rest') {
      this.setState({ status: 'work', time: 1200 });
    } else if (this.state.status === 'work') {
      this.setState({ status: 'rest', time: 20 });
    }
  };

  handleStop() {
    this.setState({ status: 'off', time: 0 });
    clearInterval(this.state.timer);
  }

  formatTime() {
    let remain = this.state.time;
    let mins = Math.floor(remain / 60);
    remain -= mins * 60;
    let secs = remain;

    if (mins < 10) {
      mins = '0' + mins;
    }
    if (secs < 10) {
      secs = '0' + secs;
    }
    return mins + ':' + secs;
  }

  closeApp() {
    window.close();
  }

  render() {
    const { status, time } = this.state;
    const renderStatus = status => {
      switch (status) {
        case 'off':
          return (
            <div>
              <p>
                According to optometrists in order to save your eyes, you should
                follow the 20/20/20. It means you should to rest your eyes every
                20 minutes for 20 seconds by looking more than 20 feet away.
              </p>
              <p>
                This app will help you track your time and inform you when it's
                time to rest.
              </p>
              <button className='btn' onClick={() => this.handleStart('work')}>
                Start
              </button>
            </div>
          );
        case 'work':
          return (
            <div>
              <img src='./images/work.png' />
              <div className='timer'>{this.formatTime(time)}</div>
              <button className='btn' onClick={() => this.handleStop()}>
                Stop
              </button>
            </div>
          );
        case 'rest':
          return (
            <div>
              <img src='./images/rest.png' />
              <div className='timer'>{this.formatTime(time)}</div>
              <button className='btn' onClick={() => this.handleStop()}>
                Stop
              </button>
            </div>
          );
        default:
          return null;
      }
    };
    return (
      <div>
        <h1>Protect your eyes</h1>
        {renderStatus(status)}
        <button className='btn btn-close' onClick={() => this.closeApp()}>
          X
        </button>
      </div>
    );
  }
}

render(<App />, document.querySelector('#app'));
