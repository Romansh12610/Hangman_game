
interface EllipseConstructorArgs {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    isClockWise: boolean;
    velocityDeg: number;
    // colors
    strokeColor: string;
    clearColor: string;
}

export class Ellipse {
    x: number;
    y: number;
    radiusX: number;
    radiusY: number;
    isClockWise: boolean;
    velocityDeg: number;
    // colors
    strokeColor: string;
    clearColor: string;
    startPosition: {
        x: number;
        y: number;
    };
    angles: {
        start: number;
        end: number;
        current: number,
    };
    isDrawnToEnd: boolean;

    constructor ({ x, y, radiusX, radiusY, isClockWise, strokeColor, clearColor, velocityDeg }: EllipseConstructorArgs) {
        this.x = x,
        this.y = y,
        this.radiusX = radiusX;
        this.radiusY = radiusY;
        this.isClockWise = isClockWise;
        this.velocityDeg = velocityDeg;
        this.strokeColor = strokeColor,
        this.clearColor = clearColor,
        this.startPosition = {
            x: x + radiusX,
            y: y,
        };
        this.angles = {
            start: 0,
            end: 360,
            current: 0,
        };
        this.isDrawnToEnd = false;
    }

    draw(ctx: CanvasRenderingContext2D) {
        this.clearEllipse(ctx);
        this.moveToStart(ctx);
        ctx.strokeStyle = this.strokeColor;

        if (this.angles.current < this.angles.end) {
            this.angles.current += this.velocityDeg;

            ctx.ellipse(
                this.x,
                this.y,
                this.radiusX,
                this.radiusY,
                0,
                this.angles.start,
                this.degToRad(this.angles.current),
                this.isClockWise,
            );
            ctx.stroke();
        }

        const shouldDraw = this.angles.current < this.angles.end;
        if (shouldDraw) {
            requestAnimationFrame(() => this.draw(ctx));
        } else {
            this.isDrawnToEnd = true;
        }
    }

    moveToStart(ctx: CanvasRenderingContext2D) {
        ctx.moveTo(this.startPosition.x, this.startPosition.y);
    }
    
    clearEllipse(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.clearColor;
        ctx.fillRect(this.x - this.radiusX, this.y - this.radiusY, this.x + this.radiusX, this.y + this.radiusY);
    }

    degToRad(angleDeg: number) {
        return angleDeg * Math.PI / 180;
    }
}