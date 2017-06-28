import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer, PlayButton} from './libs/components.js'


SimVisJs.register('my_sim', {
    init() {
        this.x = 0
        this.y = 0
        this.th = 0
    },
    
    update() {
        this.th += 0.1
        this.x = Math.cos(this.th)
        this.y = Math.sin(this.th)
    },
})

let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    
    ctx.fillStyle = 'blue'
    ctx.beginPath()
    ctx.arc(canvas.width/2 + sim.x * 100, canvas.height/2 + sim.y * 100, 10, 0, Math.PI*2,true)
    ctx.fill()
}

export default (
    <SimVisApp style={{width:600, margin:'auto'}}>
        <Visualizer width={600} height={400} sim_name={'my_sim'} draw_func={draw_func} />
        <div>
            <PlayButton sim_name={'my_sim'} />
        </div>
    </SimVisApp>
);
