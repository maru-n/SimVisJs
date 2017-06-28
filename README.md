# SimVisJs

Skelton project of (dynamical system) simulation visualizer.

## Getting Started

### install Node.js and npm

On OSX, [nodebrew](https://github.com/hokaccha/nodebrew) is recomended.

### Setup and run

download zip or clone this repository

move to the directory and run

```shell-session
$ npm install
$ npm start
```

## Edit Simulation, Visualization and Application

### Simulation object

You can add simulation objects on your app by SimVisJs.register(sim_name, sim_object).

sim_name is unique identifier for the simulation.

Simulation object have to include 2 functions, init and update().

init() will executed at first time you start the simulation and update() will run every frame.

```js
SimVisJs.register('my_sim', {
    init() {
        this.color = 'red'
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
```

This is simple code of circular motion.

### Visualization function

When you want to visualize your simulation on display, you make your draw function.

draw function will be passed 2 arguments, first is html canvas object and second is simulation object you registered above.

```js
let draw_func = function(canvas, sim) {
    const ctx = canvas.getContext('2d')

    ctx.fillStyle = 'white'
    ctx.beginPath()
    ctx.rect(0, 0, canvas.width, canvas.height)
    ctx.fill()
    
    ctx.fillStyle = sim.color
    ctx.beginPath()
    ctx.arc(canvas.width/2 + sim.x * 100, canvas.height/2 + sim.y * 100, 10, 0, Math.PI*2,true)
    ctx.fill()
}
```

this code visualize above circular motion simulation by scaling to target canvas.

### Application component (user interface)

If you edit your application interface, you can edit App (React component).

Don't worry if you have no knowledge aboug React or JSX, it is like html and you can learn how to use components by example codes.


## Examples

### How to run it
edit /src/index.js

```diff
-- import App from './App';
++ import App from './examples/ExampleName'
```


## Comments

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app) ([documentation](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md)).
