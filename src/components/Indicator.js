import React, { useEffect, useState, useCallback, useRef, useMemo } from 'react';
import { connect } from 'react-redux';

import { msToStopwatch } from '../helpers/timeFunctions';

// For testing
const NUM_CYCLES = 2;

/**
 * Component that visualizes the breathing exercise
 * @component
 */
const Indicator = ({ settings }) => {
  // Overall progress for timeline events
  const [prog, setProg] = useState(0);
  // Inhale/exhale progress bars
  const [progI, setProgI] = useState(0);  
  const [progE, setProgE] = useState(0);
  // WHM
  const [roundCount, setRoundCount] = useState(0);
  const [cycleCount, setCycleCount] = useState(0);
  const [currHoldTime, setCurrHoldTime] = useState(0);
  const [isHolding, setIsHolding] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [indicatorText, setIndicatorText] = useState('');
  const [currPhase, setCurrPhase] = useState('inhale');
  const [sessionDuration, setSessionDuration] = useState(0);
  // Refs for clearing intervals and timeouts
  const intervalI = useRef(null);
  const intervalE = useRef(null);
  const intervalH = useRef(null);
  const intervalS = useRef(null);
  const timeoutH = useRef(null);
  const timeoutP = useRef(null);
 
  const setProgs = useMemo(() => ({
    inhale: setProgI,
    exhale: setProgE
  }), [setProgI, setProgE]);

  const indicatorTexts = useMemo(() => ({
    inhale: 'Breathe in',
    exhale: 'Breathe out'
  }), []);

  const intervals = useMemo(() => ({
    inhale: intervalI,
    exhale: intervalE
  }), [intervalI, intervalE]);

  /**
   * Starts/stops the indicator
   */
  const toggle = () => {
    setIsActive(!isActive);
    if (!isActive) startSessionTimer();
    else reset();
  };

  const startSessionTimer = () => {
    let startTime = Date.now();
    let id = setInterval(() => {
      setSessionDuration(Date.now() - startTime);
    }, 1000);
    intervalS.current = id;
  };

  const reset = () => {
    setProgE(0);
    setProgI(0);
    setProg(0);
    setCurrPhase('inhale');
    setCycleCount(0);
    setCurrHoldTime(0);
    setSessionDuration(0);
    setIsHolding(false);
    setIsActive(false);
    setIsPaused(false);
    clearInterval(intervalI.current);
    clearInterval(intervalE.current);
    clearInterval(intervalH.current);
    clearInterval(intervalS.current);
    clearTimeout(timeoutH.current);
    clearTimeout(timeoutP.current);
    setIndicatorText('');
  };

  /**
   * Initiates and renders phases of the breath cycle
   * @param {('inhale'|'exhale')} phase The current phase to render
   */
  const breathe = useCallback((phase) => {
    setIndicatorText(indicatorTexts[phase]);
    setProgs[phase](0);
    // Render the progress bar
    let id = setInterval(() => {
      setProg(prog => prog + 0.5);
      setProgs[phase](prog => prog + 0.5);
    }, settings[phase + 'Time'] / 100);
    // Update the corresponding interval ref
    intervals[phase].current = id;
  }, [intervals, indicatorTexts, setProgs, settings]);

  /**
   * Starts the stopwatch for the holding phase 
   */
  const startHoldTimer = useCallback(() => {
    setIndicatorText(msToStopwatch(0));
    let id = setInterval(() => {
      setCurrHoldTime(currHoldTime => {
        setIndicatorText(msToStopwatch(currHoldTime + 1000));
        return currHoldTime + 1000;
      });
    }, 1000);
    intervalH.current = id;

    let t_id = setTimeout(() => {
      setCurrHoldTime(settings.holdTime);
    }, settings.holdTime);

    timeoutH.current = t_id;

  }, [settings.holdTime, timeoutH]);

  /**
   * Ends the holding phase 
   */
  useEffect(() => {
    if (isHolding && currHoldTime === settings.holdTime + 1000) {
      clearInterval(intervalH.current);
      setIsHolding(false);
      setCurrHoldTime(0);
      setCycleCount(0);
      setProg(0);
    }
  }, [isHolding, currHoldTime, settings.holdTime]);

  /**
   * Triggers timeline events based on overall progress
   */
  useEffect(() => {
    if (isActive) {
      switch (prog) {
        case 0:
          breathe('inhale');
          break;

        case 50:
          clearInterval(intervalI.current);
          if (!isPaused && currPhase === 'inhale') {
            setCurrPhase('exhale')
            setIsPaused(true);

            let id = setTimeout(() => {
              setIsPaused(false);
              breathe('exhale');
            }, settings.pauseTime);
            timeoutP.current = id;
          }
          break;
          
        case 100:
          clearInterval(intervalE.current);

          if (!isHolding) {
            if (cycleCount + 1 === NUM_CYCLES && settings.whm) {
              setIsHolding(true);
              startHoldTimer();
            }
            else {
              setProg(0);
              setCycleCount(cycleCount + 1);
            }
          }
          setCurrPhase('inhale')
      }
    } 
  }, [isActive, prog, cycleCount, settings.pauseTime, 
      settings.whm, startHoldTimer, breathe, isHolding, isPaused, currPhase, timeoutP]);

  return (
    <div className="indicator">
      <div style={{visibility: isActive ? 'visible' : 'hidden'}}>
        {msToStopwatch(sessionDuration)}
      </div>
      <svg width="100%" height="100%" viewBox="0 0 50 50">
        
        {/* Background circle */}
        <circle 
          className="indicator--bg" 
          cx="25" cy="25" r="15.91549430918954" 
          fill="transparent" 
          strokeWidth="3.5"
        />

        {/* Exhale indicator */}
        <circle 
          className="indicator__progress indicator__progress--exhale" 
          cx="25" cy="25" r="15.91549430918954" 
          fill="transparent" 
          strokeWidth="2" 
          strokeDasharray={`${progE} 100`}
        />

        {/* Inhale indicator */}
        <circle 
          className="indicator__progress indicator__progress--inhale" 
          cx="25" cy="25" r="15.91549430918954" 
          fill="transparent" 
          strokeWidth="2" 
          strokeDasharray={`${progI} 100`}
        />

        {/* Text */}
        {isActive 
          &&  <text 
                className='indicator--text'
                x='50%' y="50%" 
                transform="translate(0, 1)" 
              >
                {indicatorText}
              </text>
        }
      </svg>

      <button onClick={toggle}>
        {isActive ? 'STOP' : 'START'}
      </button>
    </div>
  );
};


const mapStateToProps = (state) => ({
  settings: state.settings,
});

export default connect(
  mapStateToProps
)(Indicator);