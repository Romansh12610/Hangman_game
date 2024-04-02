export class PositionState {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    currentX: number;
    currentY: number;
    deltaX: number;
    deltaY: number;
    isXReversed: boolean;
    isYReversed: boolean;

    constructor(startX: number, startY: number, endX: number, endY: number, isXReversed: boolean = false, isYReversed: boolean = false) {
        // start values
        this.startX = startX;
        this.startY = startY;
        // end values
        this.endX = endX;
        this.endY = endY;
        // distance by difference
        this.deltaX = Math.abs(endX - startX);
        this.deltaY = Math.abs(endY - startY);
        if (isYReversed) {
            console.log(`deltaX: ${this.deltaX} ; deltaY: ${this.deltaY}`);
        }
        // state
        this.currentX = startX;
        this.currentY = startY;
        // flags for order manip
        // reverse means that we are
        // going from larger value to small value
        this.isXReversed = isXReversed;
        this.isYReversed = isYReversed;
    }


    // Increasing
    public increaseX(xVal: number) {
        const increaseX = this.deltaX * xVal;
        this.currentX += increaseX;

        // overflow checking
        if (!this.isXReversed && this.currentX > this.endX) {
            this.currentX = this.endX;
        }
        else if (this.isXReversed && this.currentX > this.startX) {
            this.currentX = this.startX;
        }
    }

    public increaseY(yVal: number) {
        const increaseY = this.deltaY * yVal;
        this.currentY += increaseY;

        // overflow checking
        if (this.isYReversed && this.currentY > this.endY) {
            this.currentY = this.endY;
        }
        else if (this.isYReversed && this.currentY > this.startY) {
            this.currentY = this.startY;
        }
    }

    public increaseBoth(xVal: number, yVal: number) {
        const increaseX = this.deltaX * xVal;
        
        this.currentX += increaseX;
        
        const increaseY = this.deltaY * yVal;
        this.currentY += increaseY;

        // overflow checking
        // x
        if (!this.isXReversed && this.currentX > this.endX) {
            this.currentX = this.endX;
        }
        else if (this.isXReversed && this.currentX > this.startX) {
            this.currentX = this.startX;
        }

        // y
        if (!this.isYReversed && this.currentY > this.endY) {
            this.currentY = this.endY;
        }
        else if (this.isYReversed && this.currentY > this.startY) {
            this.currentY = this.startY;
        }
    }


    // Decreasing
    public decreaseX(xVal: number) {
        const decreaseX = this.deltaX * xVal;
        this.currentX -= decreaseX;

        // undeflow checking
        if (!this.isXReversed && this.currentX < this.startX) {
            this.currentX = this.startX;
        }
        else if (this.isXReversed && this.currentX < this.endX) {
            this.currentX = this.endX;
        }
    }

    public decreaseY(yVal: number) {
        const decreaseY = this.deltaY * yVal;
        this.currentY -= decreaseY;

        // undeflow checking
        if (!this.isYReversed && this.currentY < this.startY) {
            this.currentY = this.startY;
        }
        else if (this.isYReversed && this.currentY < this.endY) {
            this.currentY = this.endY;
        }
    }

    public decreaseBoth(xVal: number, yVal: number) {
        const decreaseX = this.deltaX * xVal;
        this.currentX -= decreaseX;

        const decreaseY = this.deltaY * yVal;
        this.currentY -= decreaseY;

        // underflow checking
        //x
        if (!this.isXReversed && this.currentX < this.startX) {
            this.currentX = this.startX;
        }
        else if (this.isXReversed && this.currentX < this.endX) {
            this.currentX = this.endX;
        }

        //y
        if (!this.isYReversed && this.currentX < this.startY) {
            this.currentY = this.startY;
        }
        else if (this.isYReversed && this.currentX < this.endY) {
            this.currentY = this.endY;
        }
    }
    
    // Getter
    public getPosition(): [number, number] {
        return [Math.round(this.currentX), Math.round(this.currentY)];
    }
}