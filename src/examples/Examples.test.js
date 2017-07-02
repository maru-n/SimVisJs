import React from 'react';
import ReactDOM from 'react-dom';

import App1 from './GameOfLife';
it('GameOfLife: renders without crashing', () => {
    ReactDOM.render(App1, document.createElement('div'));
});

import App2 from './MultiVisualizer';
it('MultiVisualizer: enders without crashing', () => {
    ReactDOM.render(App2, document.createElement('div'));
});

import App3 from './ParameterSelecter';
it('ParameterSelecter: enders without crashing', () => {
    ReactDOM.render(App3, document.createElement('div'));
});

import App4 from './ParameterSlider';
it('ParameterSlider: enders without crashing', () => {
    ReactDOM.render(App4, document.createElement('div'));
});

import App5 from './Simple';
it('Simple: enders without crashing', () => {
    ReactDOM.render(App5, document.createElement('div'));
});

import App6 from './MouseEvents';
it('Simple: enders without crashing', () => {
    ReactDOM.render(App6, document.createElement('div'));
});
