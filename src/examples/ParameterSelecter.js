import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer, ParameterSelecter} from './libs/components.js'


SimVisJs.register('my_sim', {
    init() {
        this.color = 'blue'
        this.size = 50
    },
    
    update() {
    },
})

let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.rect(0, 0, width, height)
    ctx.fill()
    
    ctx.fillStyle = sim.color
    ctx.beginPath()
    ctx.rect(width/2-sim.size/2, height/2-sim.size/2, sim.size, sim.size)
    ctx.fill()
}

export default (
    <SimVisApp style={{width:600, margin:'auto'}}>
        <Visualizer width={600} height={400} sim_name={'my_sim'} draw_func={draw_func} />
        <div>
            <ParameterSelecter
                label={'color'}
                sim_name={'my_sim'}
                parameter={'color'}
                choices={['red','blue','green']} />
            <ParameterSelecter
                label={'size'}
                sim_name={'my_sim'}
                parameter={'size'}
                choices={{'large':300, 'medium':150, 'small':50}} />
        </div>
    </SimVisApp>
)
