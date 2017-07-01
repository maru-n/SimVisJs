import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {SimVisApp, Visualizer, PlayButton, InitButton, StepButton} from './libs/components.js'

const WIDTH = 800
const HEIGHT = 600

SimVisJs.register('game_of_life', {
    width: WIDTH,
    height: HEIGHT,
    init() {
        this.cells = [...Array(this.width)].map(() => Array(this.height));
        this.cellsNext = [...Array(this.width)].map(() => Array(this.height));
        for(let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++) {
                this.cells[x][y] = Math.floor(Math.random()*2);
            }
        }
    },
    
    update() {
        const width = this.width
        const height = this.height
        for(let x = 0; x < width; x++) {
            for (let y = 0; y < height; y++) {
                const nw = this.cells[(x-1+width)%width][(y-1+height)%height];
                const n  = this.cells[ x               ][(y-1+height)%height];
                const ne = this.cells[(x+1)%width      ][(y-1+height)%height];
                const w  = this.cells[(x-1+width)%width][y]
                const c  = this.cells[ x               ][y]
                const e  = this.cells[(x+1)%width      ][y]
                const sw = this.cells[(x-1+width)%width][(y+1)%height];
                const s  = this.cells[ x               ][(y+1)%height];
                const se = this.cells[(x+1)%width      ][(y+1)%height];
                const nsum = nw + n + ne + w + e + sw + s + se;
                let new_state = 0;
                if ( nsum===3 || (nsum===2 && c===1)) {
                    new_state = 1;
                }
                this.cellsNext[x][y] = new_state;
            }
        }
        const tmp = this.cellsNext;
        this.cellsNext = this.cells;
        this.cells = tmp;
    },
})

let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d');
    let imgData = ctx.createImageData(sim.width, sim.height);
    for(let x = 0; x < sim.width; x++) {
        for (let y = 0; y < sim.height; y++) {
            const s = sim.cells[x][y]
            const i = x + y*sim.width;
            imgData.data[i*4+0] = (1-s)*255;
            imgData.data[i*4+1] = (1-s)*255;
            imgData.data[i*4+2] = (1-s)*255;
            imgData.data[i*4+3] = 255;
        }
    }
    ctx.putImageData(imgData, 0, 0);
}

export default (
    <SimVisApp style={{width:WIDTH, margin:'auto'}}>
        <Visualizer
            width={WIDTH} height={HEIGHT}
            display_width={WIDTH} display_height={HEIGHT}
            switch_fullscreen={true}
            sim_name={'game_of_life'} draw_func={draw_func} />
        <div>
            <PlayButton sim_name={'game_of_life'} />
            <StepButton sim_name={'game_of_life'} />
            <InitButton sim_name={'game_of_life'} />
        </div>
    </SimVisApp>
)
