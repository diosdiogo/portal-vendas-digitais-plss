// import React from "react";

import { withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';

const sliderStyle = withStyles({
  root: {
    color: '#94CC09',
    width: '23.3rem',
    margin: '0 auto',
  },
  thumb: {
    height: 24,
    width: 24,
    backgroundColor: '#94CC09',
    border: '5px solid #FFFFFF',
    marginTop: -4,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'auto',
    fontSize: 12
  },
  marked: {
    marginBottom: 0,
  },
  markLabel: {
    top: '-0.5rem',
    font: '700 1.3rem Roboto'
  },
  track: {
    height: 16,
    borderRadius: 8,
  },
  rail: {
    height: 16,
    borderRadius: 8,
    color: '#FFFFFF',
    backgroundColor: '#FFFFFF',
    opacity: '100%'
  },
})(Slider);

export default sliderStyle;