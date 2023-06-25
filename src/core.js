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


function drawRect(ctx, pos, width, height, colour) {
    // pos is the centre of the rectangle
    ctx.fillStyle = colour;
    ctx.fillRect(pos.x - width/2, pos.y - height/2, width, height);
}

function drawCircle(ctx, pos, radius, colour) {
    // pos is the centre of the circle.
    ctx.fillStyle = colour;
    ctx.beginPath();
    ctx.arc(pos.x, pos.y, radius, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();
}



class Rectangle {
    constructor(ctx, width, height, colour) {
        this.ctx = ctx;
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
        drawRect(this.ctx, this.coords, this.width, this.height, this.colour);
    }

    clear() {
        drawRect(this.ctx, this.coords, this.width, this.height, 'black');
    }

    drawAt(position) {
        this.coords = position;
        this.draw();
    }
}


class Circle {
    constructor(ctx, radius, colour) {
        this.ctx = ctx;
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
        drawCircle(this.ctx, this.coords, this.radius, this.colour);
    }

    clear() {
        // background is always black for now
        // +1 to workaround a problem with clear not fully working with slow moving circle.
        drawCircle(this.ctx, this.coords, this.radius + 1, 'BLACK');
    }

    tick() {
        this.clear();
        this.coords.x += this.velocity.x;
        this.coords.y += this.velocity.y;
        this.draw();
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
    constructor(ctx, position, backgroundColour, textColour) {
        this.ctx = ctx;
        this.coords = position;
        this.backgroundColour = backgroundColour;
        this.textColour = textColour
        this.font = "24px serif";
        this.counter = 0;
        this.panel = new Rectangle(this.ctx, 70, 30, this.backgroundColour);
        this.panel.setPosition(new Position(this.coords.x, this.coords.y));
    }

    tick() {
        this.counter += 1;
        this.panel.draw();
    
        this.ctx.fillStyle = this.textColour;
        this.ctx.strokeStyle = this.textColour;
        this.ctx.font = this.font; 
        this.ctx.fillText(this.counter, this.coords.x - 32, this.coords.y + 7);
    }
}

export { Counter, Velocity, Circle, Rectangle, Position };