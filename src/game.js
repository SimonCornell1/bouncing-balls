import * as core from './core.js';


//console.log('hi' + 'world'); use F12 in browser to open debugger and click console tab.


function ObjectTick(obj) {
    console.log('..........' + typeof(obj));
    obj.tick();
}

class App {
    constructor(ctx) {
        this.ctx = ctx;
        this.board = new core.Rectangle(this.ctx, canvas.width, canvas.height, "black");    
    
        this.board.drawAt(new core.Position(0, 0));

        this.counter = new core.Counter(ctx, new core.Position(40, 30), "red", "white");

        //earth = new Rectangle(30, 30, "blue");
        //earth.setVelocity(new Velocity(1,0));
        //earth.drawAt(new Position(20, 100));
    
        this.mars = new core.Circle(this.ctx, 10, "red");
        this.mars.setVelocity(new core.Velocity(1,0));
        this.mars.drawAt(new core.Position(20, 60));
    }

    
    tick() {
        this.counter.tick();
        
        this.mars.tick();
        
        //setTimeout(ObjectTick, 5000, this.mars);
    

        let period = 100; // milli-seconds
        var that = this;
        setTimeout( function() { that.tick(); }, period);
    }

}

/*
Variables declared by let are only available inside the block where they're defined. 
Variables declared by var are available throughout the function in which they're declared
*/




const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d"); // CanvasRenderingContext2D interface
let app = new App(ctx)
app.tick();



//startUp();
//tick();



/*
for (let i = 0; i < 30; i++) {
    setTimeout(function(){ 
        earth.moveTo(new Position(earth.coords.x + i, earth.coords.y))
    }, i*50);  
}

for (let i = 0; i < 30; i++) {
    setTimeout(function(){ 
        earth.moveTo(new Position(earth.coords.x - i, earth.coords.y))
    }, 1500 + i*50);  
}
*/
//console.log(p.x);