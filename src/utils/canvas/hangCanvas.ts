import { resizeCanvas, colors } from "./canvasUtils";
import { Line } from "./line";


export class HangCanvas {
    ctx: CanvasRenderingContext2D
    canvasEl: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    currentPosition: {
        x: number;
        y: number;
    };
    velocityPx: number;

    constructor(ctx: CanvasRenderingContext2D, velocityPx: number, lineWidth: number) {
        this.ctx = ctx;
        this.canvasEl = ctx.canvas;
        this.canvasWidth = this.canvasEl.clientWidth;
        this.canvasHeight = this.canvasEl.clientHeight;
        this.velocityPx = velocityPx;

        // init operations
        resizeCanvas(this.canvasEl);
        this.ctx.fillStyle = colors['black'];
        this.ctx.lineWidth = lineWidth;

        this.currentPosition = {
            x: this.canvasWidth * 0.05,
            y: this.canvasHeight * 0.9,
        }

        this.ctx.beginPath();
        this.ctx.moveTo(this.currentPosition.x, this.currentPosition.y);
    }

    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
    }   

    // bottom hor line
    drawFirstLine() {
        const firstLine = new Line({
            x1: this.currentPosition.x,
            y1: this.currentPosition.y,
            x2: this.canvasWidth * 0.35,
            y2: this.canvasHeight * 0.05,
            xv: this.velocityPx,
            yv: this.velocityPx,
        });

        requestAnimationFrame(() => firstLine.draw(this.ctx));
    }

    // vertical line
    /* drawSecondLine() {
        const secondLine = new Line({
            x1: 
        });
    } */
}
