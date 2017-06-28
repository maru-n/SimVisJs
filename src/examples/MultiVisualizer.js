import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer} from './libs/components.js'


SimVisJs.register('my_simulation', {
    init() {
        this.t = 0
        this.N = 10
        this.size = 10
        this.a = new Array(this.N)
        this.f = new Array(this.N)
        this.l = new Array(this.N)
        this.rgb = new Array(this.N)
        for (var n = 0; n < this.N; n++) {
            this.a[n] = new Array(this.size)
            this.f[n] = new Array(this.size)
            this.l[n] = new Array(this.size)
            this.rgb[n] = [Math.floor(Math.random()*255),
                           Math.floor(Math.random()*255),
                           Math.floor(Math.random()*255)]
            for (var i = 0; i < this.size; i++) {
                this.a[n][i] = Math.random()
                this.f[n][i] = Math.random() * 1 - 0.5
                this.l[n][i] = Math.random() * 10
            }
        }
    },
    
    update() {
        this.t += 1
    },
})

let draw_func_all = function(canvas, sim) {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.rect(0,0,width,height)
    ctx.fill()

    for (var n = 0; n < sim.N; n++) {
        ctx.beginPath()
        let a = sim.a[n]
        let f = sim.f[n]
        let l = sim.l[n]
        ctx.strokeStyle = 'rgba(' + sim.rgb[n][0] + ',' + sim.rgb[n][1] + ',' + sim.rgb[n][2] + ',0.2)'
        for (var i = 0; i < width; i++) {
            let y = 0
            for (var j = 0; j < sim.size; j++) {
                y += a[j]*Math.sin(f[j] * sim.t + i / l[j])
            }
            y /= sim.size
            ctx.lineTo(i, height/2 + y * height/2)
        }
        ctx.stroke()
    }
}

let draw_func = function(n) {
    return function(canvas, sim) {
        const ctx = canvas.getContext('2d');
        const width = canvas.width;
        const height = canvas.height;
        ctx.fillStyle = 'white'
        ctx.beginPath()
        ctx.rect(0,0,width,height)
        ctx.fill()

        ctx.beginPath()
        let a = sim.a[n]
        let f = sim.f[n]
        let l = sim.l[n]
        ctx.strokeStyle = 'rgb(' + sim.rgb[n][0] + ',' + sim.rgb[n][1] + ',' + sim.rgb[n][2] + ')'
        for (var i = 0; i < width; i++) {
            let y = 0
            for (var j = 0; j < sim.size; j++) {
                y += a[j]*Math.sin(f[j] * sim.t + i / l[j])
            }
            y /= sim.size
            ctx.lineTo(i, height/2 + y * height/2)
        }
        ctx.stroke()
    }
}

SimVisJs.start('my_simulation')

export default (
    <SimVisApp style={{width:600, margin:'auto'}}>
        <Visualizer width={600} height={200} sim_name={'my_simulation'} draw_func={draw_func_all} />
        <span> #0 </span>
        <Visualizer width={600} height={50} sim_name={'my_simulation'} draw_func={draw_func(0)} />
        <span> #1 </span>
        <Visualizer width={600} height={50} sim_name={'my_simulation'} draw_func={draw_func(1)} />
        <span> #2 </span>
        <Visualizer width={600} height={50} sim_name={'my_simulation'} draw_func={draw_func(2)} />
        <span> #3 </span>
        <Visualizer width={600} height={50} sim_name={'my_simulation'} draw_func={draw_func(3)} />
    </SimVisApp>
)
