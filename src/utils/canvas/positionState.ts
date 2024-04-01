export class PositionState {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    currentX: number;
    currentY: number;

    constructor(startX: number, startY: number, endX: number, endY: number) {
        // start values
        this.startX = startX;
        this.startY = startY;
        // end values
        this.endX = endX;
        this.endY = endY;
        // state
        this.currentX = startX;
        this.currentY = startY;
    }


    // Increasing
    public increaseX(xVal: number) {
        const increaseX = this.endX * xVal;
        this.currentX += increaseX;

        // overflow checking
        if (this.currentX > this.endX) {
            this.currentX = this.endX;
        }
    }

    public increaseY(yVal: number) {
        const increaseY = this.endY * yVal;
        this.currentY += increaseY;

        // overflow checking
        if (this.currentY > this.endY) {
            this.currentY = this.endY;
        }
    }

    public increaseBoth(xVal: number, yVal: number) {
        const increaseX = this.endX * xVal;
        
        this.currentX += increaseX;
        
        const increaseY = this.endY * yVal;
        this.currentY += increaseY;

        // overflow checking
        if (this.currentX > this.endX) {
            this.currentX = this.endX;
        }
        if (this.currentY > this.endY) {
            this.currentY = this.endY;
        }
    }


    // Decreasing
    public decreaseX(xVal: number) {
        const decreaseX = this.endX * xVal;
        this.currentX -= decreaseX;

        // undeflow checking
        if (this.currentX < this.startX) {
            this.currentX = this.startX;
        }
    }

    public decreaseY(yVal: number) {
        const decreaseY = this.endY * yVal;
        this.currentY -= decreaseY;

        // undeflow checking
        if (this.currentY < this.startY) {
            this.currentY = this.startY;
        }
    }

    public decreaseBoth(xVal: number, yVal: number) {
        const decreaseX = this.endX * xVal;
        this.currentX -= decreaseX;

        const decreaseY = this.endY * yVal;
        this.currentY -= decreaseY;

         // underflow checking
         if (this.currentX < this.startX) {
            this.currentX = this.startX;
        }
        if (this.currentY < this.startY) {
            this.currentY = this.startY;
        }
    }
    
    // Getter
    public getPosition(): [number, number] {
        return [Math.round(this.currentX), Math.round(this.currentY)];
    }
}