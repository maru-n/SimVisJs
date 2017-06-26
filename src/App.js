import React from 'react';
import SimVisJs from './libs/SimVisJs.js'
import {Visualizer} from './libs/components.js'


SimVisJs.register('my_sim', {
    init() {
    },
    
    update() {
    },
})

let draw_func = function(canvas, sim) {
}


class App extends React.Component {
    render() {
        return (
            <div className="App" style={{width:600, margin:'auto'}}>
                <Visualizer width={600} height={400} sim_name={'my_sim'} draw_func={draw_func} />
            </div>
        );
    }
}

export default App;
