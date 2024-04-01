import { PositionState } from "./positionState";

// export stuff
export { 
    resizeCanvas, 
    drawRect,
    drawStar,
    drawMultipleStars, 
    setupLinearGradient, 
    setupRadialGradient,
    applyShadow,
    drawLeftMountain,
    drawRightMountain,
};

// Colors
export const colors = {
    white: "#fffffc",
    black: "#000",
    gray: "#bbb",
    darkBlue: "#1f217e",
    midBlue: "#4e76fa",
    mountainBlue: "#000657",
    cyan: "#51cbe9",
    purple: "#2d0868",
    lightPurple: "#2f10b8",
}

export type ColorsType = keyof typeof colors;
// gradient types
type LinearGradientColors = ColorsType[];
type LinearGradientPositions = [x1: number, y1: number, x2: number, y2: number];
type RadialGradientPositions = [innerX: number, innerY: number, innerRadius: number, outerX: number, outerY: number, outerRadius: number];

// resize to screen size
function resizeCanvas(canvas: HTMLCanvasElement) {
    if (!document) return;

    const windowWidth = document.documentElement.clientWidth;
    const windowHeight = document.documentElement.clientHeight;

    const needResize = canvas.width !== windowWidth || canvas.height !== windowHeight;

    if (needResize) {
        canvas.width = windowWidth;
        canvas.height = windowHeight;
    }
}

// Drawing shapes
// export type RectParams = [x: number, y: number, width: number, height: number];
export interface FigureCoords {
    x: number;
    y: number;
    width: number;
    height: number;
}
type ColorParam = ColorsType | CanvasGradient;

function drawRect(ctx: CanvasRenderingContext2D, fillValue: ColorParam, rectCoords: FigureCoords) {
    
    if (typeof fillValue === 'string') {
        const color = colors[fillValue];
        ctx.fillStyle = color;
    } else {
        // if its a gradient
        ctx.fillStyle = fillValue;
    }

    const { x, y, width, height } = rectCoords;
    ctx.fillRect(x, y, width, height);
}


// Stars

function drawStar(ctx: CanvasRenderingContext2D, fillColor: ColorsType, strokeColor: ColorsType, centerX: number, centerY: number, radius: number) {

    ctx.fillStyle = colors[fillColor];
    ctx.strokeStyle = colors[strokeColor];

    ctx.moveTo(centerX + radius, centerY);
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

    ctx.fill();
}


function drawMultipleStars(
    ctx: CanvasRenderingContext2D, 
    count: number, 
    colors: [fillColor: ColorsType, strokeColor: ColorsType], 
    coordBorders: [minX: number, maxX: number, minY: number, maxY: number], 
    radius: number,
) {

    const [minX, maxX, minY, maxY] = coordBorders;
    // horizontal span for 1 star
    const horizontalItemSpan = maxX / count;

    // colors
    const [fillColor, strokeColor] = colors;

    for (let i = 0; i < count; ++i) {
        let currentMinXBorder = horizontalItemSpan * i;
        if (i === 0) {
            currentMinXBorder += minX;
        }

        const currentMaxXBorder = horizontalItemSpan * (i + 1);

        // center coords
        const starXCoord = Math.floor(Math.random() * (currentMaxXBorder - currentMinXBorder)) + currentMinXBorder;
        const starYCoord = Math.floor(Math.random() * (maxY - minY)) + minY;

        drawStar(ctx, fillColor, strokeColor, starXCoord, starYCoord, radius);
    }
}


// mountains
function drawLeftMountain(ctx: CanvasRenderingContext2D, fillColor: ColorsType, coords: FigureCoords) {

    ctx.fillStyle = colors[fillColor];
    ctx.beginPath();

    // current position state (to relative coords)
    const currPos = new PositionState(coords.x, coords.y, coords.width, coords.height);

    ctx.moveTo(...currPos.getPosition());

    // 1 vert
    currPos.increaseBoth(0.05, 0.05);
    ctx.lineTo(...currPos.getPosition());

    // 2 vert
    currPos.increaseX(0.06);
    currPos.decreaseY(0.05);
    ctx.lineTo(...currPos.getPosition());
    
    // 3 vert
    currPos.increaseBoth(0.22, 0.35);
    ctx.lineTo(...currPos.getPosition());
    
    // 4 vert
    currPos.increaseX(0.07);
    currPos.decreaseY(0.1);
    ctx.lineTo(...currPos.getPosition());
    
    // 5 vert
    currPos.increaseX(0.14);
    currPos.decreaseY(0.07);
    ctx.lineTo(...currPos.getPosition());
    
    // 6 vert
    currPos.increaseBoth(0.17, 0.38);
    ctx.lineTo(...currPos.getPosition());

    // 7 vert
    currPos.increaseX(0.15);
    currPos.decreaseY(0.01);
    ctx.lineTo(...currPos.getPosition());

    // 8 vert: end
    // intentionally overflow
    currPos.increaseBoth(1, 1);
    ctx.lineTo(...currPos.getPosition());

    ctx.lineTo(0, currPos.currentY);
    ctx.closePath();
    ctx.fill();
}


// right mountain
function drawRightMountain(ctx: CanvasRenderingContext2D, fillColor: ColorsType, coords: FigureCoords) {

}


// Styling shapes / for shapes
function setupLinearGradient(ctx: CanvasRenderingContext2D, positions: LinearGradientPositions, colorsInput: LinearGradientColors, colorStops: number[]) {

    const linearGradient = ctx.createLinearGradient(...positions);
    for (let i = 0; i < colorsInput.length; ++i) {
        linearGradient.addColorStop(colorStops[i], colors[colorsInput[i]]);
    }

    return linearGradient;
}

function setupRadialGradient(ctx: CanvasRenderingContext2D, positions: RadialGradientPositions, colorsInput: LinearGradientColors, colorStops: number[]) {

    const radialGradient = ctx.createRadialGradient(...positions);
    for (let i = 0; i < colorsInput.length; ++i) {
        radialGradient.addColorStop(colorStops[i], colors[colorsInput[i]]);
    }

    return radialGradient;
}


// shadow
function applyShadow(ctx: CanvasRenderingContext2D, shadowBlur: number, shadowColor: ColorsType, yOffset: number = 0, xOffset: number = 0) {
    ctx.shadowBlur = shadowBlur;
    ctx.shadowColor = colors[shadowColor];
    ctx.shadowOffsetY = yOffset;
    ctx.shadowOffsetX = xOffset;
}