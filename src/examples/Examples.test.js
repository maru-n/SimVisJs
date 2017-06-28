import React from 'react';
import ReactDOM from 'react-dom';

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

import App1 from './GameOfLife';
it('GameOfLife: renders without crashing', () => {
    ReactDOM.render(<MuiThemeProvider><App1 /></MuiThemeProvider>, document.createElement('div'));
});

import App2 from './MultiVisualizer';
it('MultiVisualizer: enders without crashing', () => {
    ReactDOM.render(<MuiThemeProvider><App2 /></MuiThemeProvider>, document.createElement('div'));
});

import App3 from './ParameterSelecter';
it('ParameterSelecter: enders without crashing', () => {
    ReactDOM.render(<MuiThemeProvider><App3 /></MuiThemeProvider>, document.createElement('div'));
});

import App4 from './ParameterSlider';
it('ParameterSlider: enders without crashing', () => {
    ReactDOM.render(<MuiThemeProvider><App4 /></MuiThemeProvider>, document.createElement('div'));
});

import App5 from './Simple';
it('Simple: enders without crashing', () => {
    ReactDOM.render(<MuiThemeProvider><App5 /></MuiThemeProvider>, document.createElement('div'));
});
