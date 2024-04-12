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
    // colors
    strokeColor: string;
    clearColor: string;
    // direction
    isLeftToRight: boolean;
    isTopToBottom: boolean;
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
    // colors
    strokeColor: string;
    clearColor: string;
    // direction
    isLeftToRight: boolean;
    isTopToBottom: boolean;
    isDrawnToEnd: boolean;

    constructor(obj: LineConstructorArgs) {
        this.x1 = obj.x1;
        this.x2 = obj.x2;
        this.y1 = obj.y1;
        this.y2 = obj.y2;
        this.xv = obj.xv;
        this.yv = obj.yv;
        this.currX = obj.x1;
        this.currY = obj.y1;
        this.strokeColor = obj.strokeColor;
        this.clearColor = obj.clearColor;
        this.isLeftToRight = obj.isLeftToRight;
        this.isTopToBottom = obj.isTopToBottom;
        this.isDrawnToEnd = false;
    }

    // test
    draw(ctx: CanvasRenderingContext2D) {
        this.clearLine(ctx);
        this.moveToCurrPos(ctx);
        
        // X direction
        if (this.isLeftToRight) {
            if (this.currX < this.x2) {
                this.currX += this.xv;
            }
        } else {
            if (this.currX > this.x2) {
                this.currX -= this.xv;
            }
        }

        // Y direction
        if (this.isTopToBottom) {
            if (this.currY < this.y2) {
                this.currY += this.yv;
            }
        } else {
            if (this.currY > this.y2) {
                this.currY -= this.yv;
            }
        }

        ctx.lineTo(this.currX, this.currY);
        ctx.strokeStyle = this.strokeColor;
        ctx.stroke();

        // should draw again
        const shouldDraw = ((this.isLeftToRight && this.currX < this.x2) || (!this.isLeftToRight && this.currX > this.x2)) || ((this.isTopToBottom && this.currY < this.y2) || (!this.isTopToBottom && this.currY > this.y2));

        if (shouldDraw) {
            requestAnimationFrame(() => this.draw(ctx));
        } else {
            this.isDrawnToEnd = true;
        }
    }

    moveToCurrPos(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(...this.getCurrentPos());
    }

    getCurrentPos(): [x: number, y: number] {
        return [this.currX, this.currY];
    }

    clearLine(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.clearColor;
        ctx.fillRect(this.x1, this.y1, this.x2, this.y2);
    }
}