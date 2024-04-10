interface LineConstructorArgs {
    // start
    x1: number;
    y1: number;
    // end
    x2: number;
    y2: number;
    // velocity
    xv: number;
    yv: number;   
}

export class Line {
     // start
     x1: number;
     y1: number;
     // end
     x2: number;
     y2: number;
     // velocity
     xv: number;
     yv: number;
     // curr
     currX: number;
     currY: number;  
    
    constructor(obj: LineConstructorArgs) {
        this.x1 = obj.x1;
        this.x2 = obj.x2;
        this.y1 = obj.y1;
        this.y2 = obj.y2;
        this.xv = obj.xv;
        this.yv = obj.yv;
        this.currX = obj.x1;
        this.currY = obj.y1;
    }

    draw(ctx: CanvasRenderingContext2D) {
        ctx.clearRect(this.x1, this.y1, this.currX, this.currY);
        this.moveToStart(ctx);

        if (this.currX < this.x2) {
            this.currX += this.xv
        }
        if (this.currY < this.y2) {
            this.currY += this.yv;
        }

        ctx.lineTo(this.currX, this.currY);
        ctx.fill();

        // should draw again
        if (this.currX < this.x1 || this.currY < this.x2) {
            requestAnimationFrame(() => this.draw(ctx));
        }
    }

    moveToStart(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.x1, this.y1);
    }
}