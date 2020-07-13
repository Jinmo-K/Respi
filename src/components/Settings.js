import React, { useState } from 'react';
import { connect } from 'react-redux';

import { updateSetting } from '../store/actions/settingActions';

import Slider from './Slider';

const Settings = ({ updateSetting, settings }) => {

  const onSliderChange = (e) => {
    let val = parseInt(Math.round(e.target.value / 1000 * 10) * 100);
    updateSetting(e.target.name, val);
  };

  const onWHMclick = () => {
    updateSetting('whm', !settings.whm);
  };

  return (
    <div className='settings'>

      {/* Inhale duration slider */}
      <Slider 
        label='Inhale duration' 
        name='inhaleTime'
        onChange={onSliderChange} 
        value={settings.inhaleTime} 
      />

      {/* Exhale duration slider */}
      <Slider 
        label='Exhale duration' 
        name='exhaleTime'
        onChange={onSliderChange} 
        value={settings.exhaleTime} 
      />

      {/* Pause duration slider */}
      <Slider 
        label='Pause duration'
        name='pauseTime'
        onChange={onSliderChange} 
        value={settings.pauseTime} 
      />

      <button 
        className={settings.whm ? 'whm-button whm-button-on' : 'whm-button whm-button-off'}
        onClick={onWHMclick}
      >
        WHM 
      </button>
      {/* Number of breath cycles slider */}
      <Slider 
        label='Breath cycles'
        name='numCycles'
        onChange={onSliderChange} 
        value={settings.numCycles} 
      />
      {/* Number of rounds slider */}
      <Slider 
        label='Rounds'
        name='numRounds'
        onChange={onSliderChange} 
        value={settings.numRounds} 
      />
      {/* Hold duration slider */}
      <Slider 
        label='Hold duration'
        name='holdTime'
        onChange={onSliderChange} 
        value={settings.holdTime} 
      />
    </div>
  );
};

const mapStateToProps = (state) => ({
  settings: state.settings
});

export default connect(
  mapStateToProps,
  { updateSetting }
)(Settings);