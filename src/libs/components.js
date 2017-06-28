import React, {Component} from 'react';
import PropTypes from 'prop-types'
import SimVisJs from './SimVisJs.js'
import FlatButton from 'material-ui/FlatButton';
import PlayArrow from 'material-ui/svg-icons/av/play-arrow';
import SkipNext from 'material-ui/svg-icons/av/skip-next';
import Pause from 'material-ui/svg-icons/av/pause';
import Replay from 'material-ui/svg-icons/av/replay';
import Slider from 'material-ui/Slider';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

/*
 * Visualizer
 * canvas component to visualize simulation
 */
export class Visualizer extends Component {
    style = {
        border: '1px solid black',
        position: 'relative',
        top: '-1px',
        left: '-1px',
    }
    componentDidMount() {
        const {canvas} = this.refs;
        let l = this.props.draw_func.bind(null, canvas)
        l(SimVisJs.get_sim(this.props.sim_name))
        SimVisJs.addUpdateListener(this.props.sim_name, l)
    }

    render() {
        this.style.width = this.props.width
        this.style.height = this.props.height
        return (
            <div style={this.style}>
                <canvas ref="canvas"
                    width={this.props.width}
                    height={this.props.height} />
            </div>
        )
    }
}

Visualizer.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    sim_name: PropTypes.string.isRequired,
    draw_func: PropTypes.func.isRequired,
};


/*
 * PlayButton / InitButton
 * buttons to start/stop/init/step of simulation
 */
let button_style = {
    margin: "5px 5px 0px 0px"
}
export class PlayButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            is_pause: SimVisJs.is_running(this.props.sim_name)
        }
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        if (this.state.is_pause) {
            SimVisJs.stop(this.props.sim_name)
        } else {
            SimVisJs.start(this.props.sim_name)
        }
        this.setState({
            is_pause: !this.state.is_pause
        })
    }
    render() {
        return (<FlatButton backgroundColor="#dddddd"
                icon={this.state.is_pause ? <Pause /> : <PlayArrow />}
                onClick={this.handleClick}
                style={button_style} />)
    }
}
PlayButton.propTypes = {
    sim_name: PropTypes.string.isRequired,
};


export class InitButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        SimVisJs.init(this.props.sim_name)
    }
    render() {
        return (<FlatButton backgroundColor="#dddddd"
                icon={<Replay />}
                onClick={this.handleClick}
                style={button_style} />)
    }
}
InitButton.propTypes = {
    sim_name: PropTypes.string.isRequired,
};

export class StepButton extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        SimVisJs.update(this.props.sim_name)
    }
    render() {
        return (<FlatButton backgroundColor="#dddddd"
                icon={<SkipNext />}
                onClick={this.handleClick}
                style={button_style} />)
    }
}
StepButton.propTypes = {
    sim_name: PropTypes.string.isRequired,
};


/*
 * ParameterSlider
 * slider to controll parameter of simulation
 */
export class ParameterSlider extends React.Component {
    style = {
        display: 'flex',
        height: 30,
        flexDirection: 'row',
        justifyContent: 'space-around',
        float: 'left',
        margin: "0px 10px 0px 0px"
    }

    constructor(props) {
        super(props)
        let callback = ((sim) => {
            const value = sim[this.props.parameter]
            this.setState({value: value});
        })
        SimVisJs.addUpdateListener(this.props.sim_name, callback)
        this.state = {
            value: SimVisJs.get_sim(this.props.sim_name)[props.parameter]
        }
    }
    
    handleSlider = (event, value) => {
        SimVisJs.set_parameter(this.props.sim_name, this.props.parameter, value)
    };
    
    render() {
        return (
            <div style={this.style}>
                <span style={{margin: '24px 10px 0 0'}}>{this.props.label}</span>
                <Slider
                    min={this.props.min}
                    max={this.props.max}
                    step={this.props.step}
                    value={this.state.value}
                    onChange={this.handleSlider}
                    style={{width: 300}}
                    />
                <span style={{margin: '24px 10px'}}>{this.state.value}</span>
            </div>
        );
    }
}

ParameterSlider.defaultProps = {
    min: 0,
    max: 1,
    step: 0.01
}

ParameterSlider.propTypes = {
    sim_name: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    min: PropTypes.number,
    max: PropTypes.number,
    step: PropTypes.number,
}


/*
 * ParameterSelecter
 * component to select parameter from a set
 */
export class ParameterSelecter extends Component {
    style = {
        margin: "0px 10px 0px 0px"
    }

    constructor(props) {
        super(props)
        let callback = ((sim) => {
            const value = sim[this.props.parameter]
            this.setState({value: value});
        })
        SimVisJs.addUpdateListener(this.props.sim_name, callback)
        this.state = {
            value: SimVisJs.get_parameter(this.props.sim_name, props.parameter)
        }
    }
    
    handleChange = (event, index, value) => {
        SimVisJs.set_parameter(this.props.sim_name, this.props.parameter, value)
    }
    
    render() {
        let choices = this.props.choices
        let items
        if (Array.isArray(choices)) {
            items = choices.map(function(c) {
                return <MenuItem key={c} value={c} primaryText={c} />
            });
        } else {
            items = Object.keys(choices).map(function(k) {
                return <MenuItem key={k} value={choices[k]} primaryText={k} />
            });
        }
        
        return (
            <SelectField
                floatingLabelText={this.props.label}
                value={this.state.value}
                onChange={this.handleChange}
                style={this.style}
                >
                {items}
            </SelectField>
        );
    }
}

ParameterSelecter.propTypes = {
    sim_name: PropTypes.string.isRequired,
    parameter: PropTypes.string.isRequired,
    choices: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object]).isRequired,
}
