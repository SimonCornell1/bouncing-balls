const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d"); // CanvasRenderingContext2D interface

//console.log('hi' + 'world'); use F12 in browser to open debugger and click console tab.

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        // Object.freeze(this); 
        // object is now read only but warning, we can write code this
        // p = new Position(0,0)
        // p.x = 50;
        // but the change is silently ignored (no exception thrown!)
    }
}

function drawRect(pos, width, height, colour) {
    // pos is the centre of the rectangle
    ctx.fillStyle = colour;
    ctx.fillRect(pos.x - width/2, pos.y - height/2, width, height);
}

function drawCircle(pos, radius, colour) {
    // pos is the centre of the circle.
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}

class Rectangle {
    constructor(width, height, colour) {
        this.width = width
        this.height = height
        this.colour = colour;
        this.coords = new Position(-1, -1); // negative coords indicates not yet drawn.
        this.velocity = new Velocity(0, 0);
    }

    setPosition(position) {
        this.coords = position;
    }

    setVelocity(v) {
        this.velocity = v;
    }

    tick() {
        this.clear();
        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
        this.draw();
    }

    draw() {
        drawRect(this.coords, this.width, this.height, this.colour);
    }

    clear() {
        drawRect(this.coords, this.width, this.height, 'black');
    }

    drawAt(position) {
        this.coords = position;
        this.draw();
    }
}


class Circle {
    constructor(radius, colour) {
        this.radius = radius;
        this.colour = colour;
        this.coords = new Position(-1, -1); // negative coords indicates not yet drawn.
        this.velocity = new Velocity(0, 0);
    }

    setPosition(position) {
        this.coords = position;
    }

    setVelocity(v) {
        this.velocity = v
    }

    draw() {
        drawCircle(this.coords, this.radius, this.colour);
    }

    clear() {
        // background is always black for now
        // +1 to workaround a problem with clear not fully working with slow moving circle.
        drawCircle(this.coords, this.radius + 1, 'BLACK');
    }

    tick() {
        this.clear();
        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
        //this.draw();
    }

    drawAt(position) {
        this.coords = position
        this.draw();
    }

    

    moveTo(newPosition) {
        // TODO assert this is drawn
        this.clear();
        this.drawAt(newPosition);
    }
}


class Velocity {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}


class Counter {
    constructor(position, backgroundColour, textColour) {
        this.coords = position;
        this.backgroundColour = backgroundColour;
        this.textColour = textColour
        this.font = "24px serif";
        this.counter = 0;
        this.panel = new Rectangle(70, 30, this.backgroundColour);
        this.panel.setPosition(new Position(this.coords.x, this.coords.y));
    }

    tick() {
        this.counter += 1;
        this.panel.draw();
    
        ctx.fillStyle = this.textColour;
        ctx.strokeStyle = this.textColour;
        ctx.font = this.font; 
        ctx.fillText(this.counter, this.coords.x - 32, this.coords.y + 7);
    }
}

function startUp() {
    board = new Rectangle(canvas.width, canvas.height, "black");
    board.drawAt(new Position(0, 0));
    
    //earth = new Rectangle(30, 30, "blue");
    //earth.setVelocity(new Velocity(1,0));
    //earth.drawAt(new Position(20, 100));

    mars = new Circle(10, "red");
    mars.setVelocity(new Velocity(0,0));
    mars.drawAt(new Position(20, 60));
/*
    mercury = new Circle(5, "yellow");
    mercury.setVelocity(new Velocity(1,0));
    mercury.drawAt(new Position(20, 90));

*/

    //box = new Rectangle(100, 100, 'yellow');
    //box.drawAt(new Position(200,200));

    //ball = new Circle(50, "white");
    //ball.drawAt(new Position(200,200));


    //ball = new Circle(40, "black");
    //ball.drawAt(new Position(200,200));
}

counter = new Counter(new Position(40, 30), "red", "white");

function MarsTick() {
    mars.tick();
}


function tick() {
    counter.tick();
    period = 100; // milli-seconds

    //earth.tick();
    setTimeout(MarsTick,   5000);
  //  mercury.tick();
    setTimeout(tick, period);
}

startUp();
tick();



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