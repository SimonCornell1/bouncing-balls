const canvas = document.getElementById("screen");
const ctx = canvas.getContext("2d"); // CanvasRenderingContext2D interface

//console.log('hi' + 'world'); use F12 in browser to open debugger and click console tab.

class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        Object.freeze(this); 
        // object is now read only but warning, we can write code this
        // p = new Position(0,0)
        // p.x = 50;
        // but the change is silently ignored (no exception thrown!)
    }
}

function drawRect(pos, w, h, colour) {
    ctx.fillStyle = colour;
    ctx.fillRect(pos.x, pos.y, w, h);
}

function drawCircle(pos, radius, colour) {
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
        this.coordinates = new Position(-1, -1); // negative coords indicates not yet drawn.
    }

    drawAt(position) {
        drawRect(position, this.width, this.height, this.colour);
        this.coordinates = position
    }
}

class Circle {
    constructor(radius, colour) {
        this.radius = radius;
        this.colour = colour;
        this.coordinates = new Position(-1, -1); // negative coords indicates not yet drawn.
    }

    drawAt(position) {
        drawCircle(position, this.radius, this.colour);
        this.coordinates = position
    }

    clear() {
        // background is always black for now
        drawCircle(this.coordinates, this.radius, 'BLACK');
    }

    moveTo(newPosition) {
        // TODO assert this is drawn
        this.clear();
        this.drawAt(newPosition);
    }
}

board = new Rectangle(canvas.width, canvas.height, "BLACK");
board.drawAt(new Position(0, 0));


earth = new Circle(10, "blue");
earth.drawAt(new Position(20, 100));



for (let i = 0; i < 30; i++) {
    setTimeout(function(){ 
        earth.moveTo(new Position(earth.coordinates.x + i, earth.coordinates.y))
    }, i*50);  
}

for (let i = 0; i < 30; i++) {
    setTimeout(function(){ 
        earth.moveTo(new Position(earth.coordinates.x - i, earth.coordinates.y))
    }, 1500 + i*50);  
}

//console.log(p.x);