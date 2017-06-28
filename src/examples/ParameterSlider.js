import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer, PlayButton, InitButton, ParameterSlider} from './libs/components.js'


SimVisJs.register('parameter_slider_example', {
    init() {
        this.speed = 0.1
        this.org_x = 300
        this.org_y = 200
        this.r = 20
        this.rr = 100
        this.ang = 0
    },
    
    update() {
        this.ang += this.speed
    },
    
    get_x() {
        return this.org_x + this.rr * Math.cos(this.ang)
    },
    
    get_y() {
        return this.org_y + this.rr * Math.sin(this.ang)
    },
})

let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'rgba(255, 255, 255, 1)'
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    ctx.fillStyle = 'rgba(0, 255, 255, 1)'
    ctx.beginPath();
    ctx.arc(sim.get_x(), sim.get_y(), sim.r, 0, Math.PI*2,true)
    ctx.fill()
}

export default (
    <SimVisApp style={{width:600, margin:'auto'}}>
        <Visualizer width={600} height={400} sim_name={'parameter_slider_example'} draw_func={draw_func} />
        <div>
            <PlayButton sim_name={'parameter_slider_example'} />
            <InitButton sim_name={'parameter_slider_example'} />
        </div>
        <div>
            <ParameterSlider sim_name={'parameter_slider_example'} label={'speed'} parameter={'speed'} min={-0.5} max={0.5} step={0.001} />
            <ParameterSlider sim_name={'parameter_slider_example'} label={'radius of circle'} parameter={'r'} min={1} max={100} step={1} />
            <ParameterSlider sim_name={'parameter_slider_example'} label={'radius of movement'} parameter={'rr'} min={0} max={200} step={1} />
        </div>
    </SimVisApp>
)
