import React, { useState, useEffect, useRef } from 'react';
import { render } from 'react-dom';

function App() {
  //const [status, setStatus] = useState('info');
  const statusRef = useRef('info')
  const [time, setTime] = useState(null);
  const [timer, setTimer] = useState(null)

  const convert = duration => {
    let minutes = (Math.floor(duration / 60)),
      seconds = (Math.floor(duration % 60));

    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return minutes + ':' + seconds
  }

  const start = () => {
    setTime(20);
    statusRef.current = 'work'
    setTimer(setInterval(() => {
      setTime(time => {
        if (time === 0) {
          playBell();
          if (statusRef.current === 'work') {
            statusRef.current = 'rest',
              setTime(20)
          } else {
            statusRef.current = 'work',
              setTime(1200)
          }
        } else {
          return time - 1
        }
      });
    }, 1000));
  }

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };

  // na spotkanie --> dlaczego ponizsza wersja nie dziala? Przy pierwszym intervale czas spada co 1 sek, przy drugim co 2 sek, przy 3 co 3 sek itd
  /*  const start = () => { 
     clearInterval(timer);
     setStatus('work');
     setTime(10);
     setTimer(
       setInterval(() => {
         setTime(time => {
           if (time === 0) {
             clearInterval(timer);
             rest();
           }
           return time - 1;
         });
       }, 1000)
     );
   } */

  /*  const rest = () => {
     clearInterval(timer);
     setStatus('rest');
     setTime(20);
     setTimer(
       setInterval(() => {
         setTime(time => {
           if (time === 0) {
             clearInterval(timer);
             start();
           }
           return time - 1;
         });
       }, 1000))
   } */

  const stop = () => {
    statusRef.current = 'info'
    clearInterval(timer)
    setTime(0);
  }

  const closeApp = () => {
    window.close()
  }



  return (
    <div>
      <h1>Protect your eyes</h1>
      {statusRef.current === 'info' &&
        <div>
          <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
          <p>This app will help you track your time and inform you when it's time to rest.</p></div>}
      {statusRef.current === 'work' && <img src="./images/work.png" />}
      {statusRef.current === 'rest' && <img src="./images/rest.png" />}
      {statusRef.current !== 'info' && <div className="timer">
        {convert(time)}
      </div>}
      {statusRef.current === 'info' && <button className="btn" onClick={start}>Start</button>}
      {statusRef.current !== 'info' && <button className="btn" onClick={stop}>Stop</button>}
      <button className="btn btn-close" onClick={closeApp}>X</button>
    </div>
  )
}

render(<App />, document.querySelector('#app'));