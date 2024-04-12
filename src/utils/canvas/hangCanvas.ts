import { colors } from "./canvasUtils";
import { Line } from "./line";
import { Ellipse } from "./ellipse";

export interface XYcoords {
    x: number; 
    y: number;
}

interface ConstructorArgs {
    ctx: CanvasRenderingContext2D
    lineWidth: number;
    velocityPx: number;
    strokeColor: string;
    clearColor: string;
}

export class HangCanvas {
    ctx: CanvasRenderingContext2D
    canvasEl: HTMLCanvasElement;
    canvasWidth: number;
    canvasHeight: number;
    lineWidth: number;
    strokeColor: string;
    clearColor: string;
    startPosition: XYcoords;
    velocityPx: number;
    steps: {
        line1: Line | null;
        line2: Line | null;
        line3: Line | null;
        line3Angle: Line | null;
        line4: Line | null;
        // temp
        head: Ellipse | null;
        body: Ellipse | null;
        leftArm: Line | null;
        rightArm: Line | null;
        leftLeg: Line | null;
        rightLeg: Line | null;
    };
    headRadius: number;
    bodyRadius: XYcoords;
    armLength: XYcoords;
    footLength: XYcoords;

    constructor({ ctx, lineWidth, velocityPx, strokeColor, clearColor }: ConstructorArgs) {
        this.ctx = ctx;
        this.canvasEl = ctx.canvas;
        this.canvasWidth = this.canvasEl.clientWidth;
        this.canvasHeight = this.canvasEl.clientHeight;
        this.velocityPx = velocityPx;
        this.lineWidth = lineWidth;
        this.strokeColor = strokeColor;
        this.clearColor = clearColor;
        this.startPosition = {
            x: this.canvasWidth * 0.1,
            y: this.canvasHeight * 0.9,
        };
        this.steps = {
            line1: null,
            line2: null,
            line3: null,
            line3Angle: null,
            line4: null,
            head: null,
            body: null,
            leftArm: null,
            rightArm: null,
            leftLeg: null,
            rightLeg: null,
        };
        this.headRadius = 20;
        this.bodyRadius = {
            x: 30,
            y: 50
        };
        this.armLength = {
            x: 40,
            y: 30,
        };
        this.footLength = {
            x: 30,
            y: 60,
        };
        this.initSetup();
    }
    
    clearCanvas() {
        this.ctx.fillStyle = colors['white'];
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
    }

    resizeCanvas() {
        const displayWidth = this.canvasEl.clientWidth;
        const displayHeight = this.canvasEl.clientHeight;

        const shouldResize = displayWidth !== this.canvasEl.width || displayHeight !== this.canvasEl.height;

        
        if (shouldResize) {
            this.canvasEl.width = displayWidth;
            this.canvasEl.height = displayHeight;
        }
    }

    initSetup() {
        this.resizeCanvas();
        this.drawBackground();
        this.ctx.strokeStyle = this.strokeColor;
        this.ctx.lineWidth = this.lineWidth;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startPosition.x, this.startPosition.y);

        // initializing parts
        this.initFirstLine();
        this.initSecondLine();
        this.initThirdLine();
        this.initThirdLineAngle();
        this.initFourthLine();
        this.initHead();
        this.initBody();
        this.initLeftArm();
        this.initRightArm();
        this.initLeftLeg();
        this.initRightLeg();
    }

    // init background
    drawBackground() {
        this.ctx.fillStyle = colors['white'];
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);
        this.ctx.save();
    }

    initFirstLine() {
        const yValue = this.startPosition.y;

        this.steps.line1 = new Line({
            x1: this.startPosition.x,
            y1: yValue,
            x2: this.canvasWidth * 0.4,
            y2: yValue,
            xv: this.velocityPx,
            yv: 0,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: true,
        });
    }

    drawFirstLine() {
        requestAnimationFrame(() => {
            if (this.steps.line1) {
                this.steps.line1.draw(this.ctx);
            }
        });
    }

    initSecondLine() {
        const xValue = this.canvasWidth * 0.15;

        this.steps.line2 = new Line({
            x1: xValue,
            y1: this.canvasHeight * 0.9,
            x2: xValue,
            y2: this.canvasHeight * 0.1,
            xv: 0,
            yv: this.velocityPx,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: false,
        });
    }

    drawSecondLine() {
        requestAnimationFrame(() => {
            if (this.steps.line2) {
                this.steps.line2.draw(this.ctx);
            }
        });
    }

    initThirdLine() {
        const yValue = this.canvasHeight * 0.1;

        this.steps.line3 = new Line({
            x1: this.canvasWidth * 0.1,
            y1: yValue,
            x2: this.canvasWidth * 0.9,
            y2: yValue,
            xv: this.velocityPx,
            yv: 0,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: true,
        });
    }

    drawThirdLine() {
        requestAnimationFrame(() => {
            if (this.steps.line3) {
                this.steps.line3.draw(this.ctx);
            }
        });
    }

    initThirdLineAngle() {
        const x = {
            start: this.canvasWidth * 0.15,
            end: this.canvasWidth * 0.25,
        };
        const y = {
            start: this.canvasHeight * 0.2,
            end: this.canvasHeight * 0.1,
        }
        const xLength = x.end - x.start;
        const yLength = y.start - y.end;
        const slope = yLength / xLength;

        this.steps.line3Angle = new Line({
            x1: x.start,
            y1: y.start,
            x2: x.end,
            y2: y.end,
            xv: 0.8,
            yv: 0.8 * slope,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: false,
        });
    }

    drawThirdLineAngle() {
        requestAnimationFrame(() => {
            if (this.steps.line3Angle) {
                this.steps.line3Angle.draw(this.ctx);
            }
        });
    }

    initFourthLine() {
        const xValue = this.canvasWidth * 0.75;

        this.steps.line4 = new Line({
            x1: xValue, 
            y1: this.canvasHeight * 0.1,
            x2: xValue,
            y2: this.canvasHeight * 0.3,
            xv: 0,
            yv: 2,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: true,
        });
    }

    drawFourthLine() {
        requestAnimationFrame(() => {
            if (this.steps.line4) {
                this.steps.line4.draw(this.ctx);
            }
        });
    }

    initHead() {
        this.steps.head = new Ellipse({
            x: this.canvasWidth * 0.75,
            y: this.canvasHeight * 0.3 + this.headRadius,
            radiusX: this.headRadius,
            radiusY: this.headRadius,
            isClockWise: false,
            velocityDeg: 5,
            strokeColor: colors['black'],
            clearColor: colors['white'],
        });
    }

    drawHead() { 
        requestAnimationFrame(() => {
            if (this.steps.head) {
                this.steps.head.draw(this.ctx);
            }
        });
    }

    initBody() {
        this.steps.body = new Ellipse({
            x: this.canvasWidth * 0.75,
            y: (this.canvasHeight * 0.3 + this.headRadius * 2) + this.bodyRadius.y,
            radiusX: this.bodyRadius.x,
            radiusY: this.bodyRadius.y,
            isClockWise: false,
            velocityDeg: 5,
            strokeColor: colors['black'],
            clearColor: colors['white'],
        });
    }

    drawBody() {
        requestAnimationFrame(() => {
            if (this.steps.body) {
                this.steps.body.draw(this.ctx);
            }
        });
    }

    initLeftArm() {
        const xStart = (this.canvasWidth * 0.75) - (this.bodyRadius.x * 0.95);
        const yStart = (this.canvasHeight * 0.3 + this.headRadius * 2) + (this.bodyRadius.y * 0.6);
        const slope = this.armLength.y / this.armLength.x;
        const xv = 2;
        const yv = 2 * slope;


        this.steps.leftArm = new Line({
            x1: xStart,
            y1: yStart,
            x2: xStart - this.armLength.x,
            y2: yStart + this.armLength.y,
            xv,
            yv,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: false,
            isTopToBottom: true,
        });
    }

    drawLeftArm() {
        requestAnimationFrame(() => {
            if (this.steps.leftArm) {
                this.steps.leftArm.draw(this.ctx);
            }
        });
    }

    initRightArm() {
        const xStart = (this.canvasWidth * 0.75) + (this.bodyRadius.x * 0.95);
        const yStart = (this.canvasHeight * 0.3 + this.headRadius * 2) + (this.bodyRadius.y * 0.6);
        const slope = this.armLength.y / this.armLength.x;
        const xv = 2;
        const yv = 2 * slope;

        this.steps.rightArm = new Line({
            x1: xStart,
            y1: yStart,
            x2: xStart + this.armLength.x,
            y2: yStart + this.armLength.y,
            xv,
            yv,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: true,
        });
    }

    drawRightArm() {
        requestAnimationFrame(() => {
            if (this.steps.rightArm) {
                this.steps.rightArm.draw(this.ctx);
            }
        });
    }

    initLeftLeg() {
        const xStart = (this.canvasWidth * 0.75) - (this.bodyRadius.x * 0.5);
        const yStart =  (this.canvasHeight * 0.3 + this.headRadius * 2) + (this.bodyRadius.y * 1.8);
        const slope = this.footLength.y / this.footLength.x;

        this.steps.leftLeg = new Line({
            x1: xStart,
            y1: yStart,
            x2: xStart - this.footLength.x,
            y2: yStart + this.footLength.y,
            xv: 2,
            yv: 2 * slope,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: false,
            isTopToBottom: true,
        });
    }

    drawLeftLeg() {
        requestAnimationFrame(() => {
            if (this.steps.leftLeg) {
                this.steps.leftLeg.draw(this.ctx);
            }
        });
    }

    initRightLeg() {
        const xStart = (this.canvasWidth * 0.75) + (this.bodyRadius.x * 0.5);
        const yStart =  (this.canvasHeight * 0.3 + this.headRadius * 2) + (this.bodyRadius.y * 1.8);
        const slope = this.footLength.y / this.footLength.x;

        this.steps.rightLeg = new Line({
            x1: xStart,
            y1: yStart,
            x2: xStart + this.footLength.x,
            y2: yStart + this.footLength.y,
            xv: 2,
            yv: 2 * slope,
            strokeColor: this.strokeColor,
            clearColor: this.clearColor,
            isLeftToRight: true,
            isTopToBottom: true,
        });
    }

    drawRightLeg() {
        requestAnimationFrame(() => {
            if (this.steps.rightLeg) {
                this.steps.rightLeg.draw(this.ctx);
            }
        });
    }
}
