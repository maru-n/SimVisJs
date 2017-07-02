import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer} from './libs/components.js'


SimVisJs.register('my_sim', {
    init() {
        this.color = 'red'
        this.x = 300
        this.y = 200
    },
    
    update() {
    },
    
    switch_color() {
        if (this.color === 'red') {
            this.color = 'green'
        } else if (this.color === 'green') {
            this.color = 'blue'
        } else if (this.color === 'blue') {
            this.color = 'red'
        }
        
    }
})

let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    
    ctx.fillStyle = sim.color
    ctx.beginPath()
    ctx.arc(sim.x, sim.y, 10, 0, Math.PI*2,true)
    ctx.fill()
}

let on_visualizer_click = function(canvas, sim) {
    sim.switch_color()
}

export default (
    <SimVisApp style={{width:600, margin:'auto'}}>
        <Visualizer width={600} height={400} sim_name={'my_sim'} draw_func={draw_func} onClick={on_visualizer_click} />
    </SimVisApp>
);
