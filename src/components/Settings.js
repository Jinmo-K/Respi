import React from 'react';
import { connect } from 'react-redux';

import { updateSetting } from '../store/actions/settingActions';

import Slider from './Slider';

const Settings = ({ updateSetting, settings }) => {

  const onChange = (e) => {
    let val = parseInt(Math.round(e.target.value / 1000 * 10) * 100);
    updateSetting(e.target.name, val);
  };

  return (
    <div className='settings'>

      {/* Inhale duration slider */}
      <Slider 
        label='Inhale duration' 
        name='inhaleTime'
        onChange={onChange} 
        value={settings.inhaleTime} 
      />

      {/* Exhale duration slider */}
      <Slider 
        label='Exhale duration' 
        name='exhaleTime'
        onChange={onChange} 
        value={settings.exhaleTime} 
      />

      {/* Pause duration slider */}
      <Slider 
        label='Pause duration'
        name='pauseTime'
        onChange={onChange} 
        value={settings.pauseTime} 
      />

      WHM <br/>
      {/* Number of breath cycles slider */}
      <Slider 
        label='Breath cycles'
        name='numCycles'
        onChange={onChange} 
        value={settings.numCycles} 
      />
      {/* Number of rounds slider */}
      <Slider 
        label='Rounds'
        name='numRounds'
        onChange={onChange} 
        value={settings.numRounds} 
      />
      {/* Hold duration slider */}
      <Slider 
        label='Hold duration'
        name='holdTime'
        onChange={onChange} 
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