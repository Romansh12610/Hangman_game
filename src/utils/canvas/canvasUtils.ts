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
    drawStripe
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

function drawStar(ctx: CanvasRenderingContext2D, fillColor: ColorsType, centerX: number, centerY: number, radius: number) {

    ctx.fillStyle = colors[fillColor];

    ctx.moveTo(centerX + radius, centerY);
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

    ctx.fill();
}


function drawMultipleStars(
    ctx: CanvasRenderingContext2D, 
    count: number, 
    fillColor: ColorsType, 
    coordBorders: [minX: number, maxX: number, minY: number, maxY: number], 
    radius: number,
) {

    const [minX, maxX, minY, maxY] = coordBorders;
    // horizontal span for 1 star
    const horizontalItemSpan = maxX / count;

    for (let i = 0; i < count; ++i) {
        let currentMinXBorder = horizontalItemSpan * i;
        if (i === 0) {
            currentMinXBorder += minX;
        }

        const currentMaxXBorder = horizontalItemSpan * (i + 1);

        // center coords
        const starXCoord = Math.floor(Math.random() * (currentMaxXBorder - currentMinXBorder)) + currentMinXBorder;
        const starYCoord = Math.floor(Math.random() * (maxY - minY)) + minY;

        drawStar(ctx, fillColor, starXCoord, starYCoord, radius);
    }
}


// mountains
export interface MountainCoords {
    x1: number;
    y1: number;
    x2: number;
    y2: number;
}

function drawLeftMountain(ctx: CanvasRenderingContext2D, fillColor: ColorsType, coords: MountainCoords) {

    ctx.fillStyle = colors[fillColor];
    ctx.beginPath();

    // current position state (to relative coords)
    const currPos = new PositionState(coords.x1, coords.y1, coords.x2, coords.y2);

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
function drawRightMountain(ctx: CanvasRenderingContext2D, fillColor: ColorsType, coords: MountainCoords) {

    ctx.fillStyle = colors[fillColor];
    ctx.beginPath();

    // declare position state
    // y in reverse order
    // starting from bottom left angle
    // decreasing y, increasing x
    const currPos = new PositionState(coords.x1, coords.y2, coords.x2, coords.y1, false, true);

    ctx.moveTo(...currPos.getPosition());

    // 1 vert
    currPos.increaseX(0.1);
    currPos.decreaseY(0.1);
    ctx.lineTo(...currPos.getPosition());

    // 2 vert
    currPos.increaseBoth(0.1, 0.02);
    ctx.lineTo(...currPos.getPosition());

    // 3 vert
    currPos.increaseX(0.15);
    currPos.decreaseY(0.25);
    ctx.lineTo(...currPos.getPosition());

    // 4 vert
    currPos.increaseBoth(0.05, 0.05);
    ctx.lineTo(...currPos.getPosition());

    // 5 vert
    currPos.increaseX(0.15);
    currPos.decreaseY(0.35);
    ctx.lineTo(...currPos.getPosition());

    // 6 vert
    currPos.increaseBoth(0.14, 0);
    ctx.lineTo(...currPos.getPosition());

    // 7 vert
    currPos.increaseX(0.14);
    currPos.decreaseY(0.35);
    ctx.lineTo(...currPos.getPosition());

    // 8 vert
    currPos.increaseBoth(0.05, 0.05);
    ctx.lineTo(...currPos.getPosition());

    // 9 end vert
    // over-/underflow are intentional
    currPos.increaseX(1);
    currPos.decreaseY(1);
    ctx.lineTo(...currPos.getPosition()); 

    ctx.lineTo(currPos.currentX, coords.y2);
    ctx.closePath();
    ctx.fill();
}


// Stripes
export interface StripeCoords {
    x1: number;
    x2: number;
    // left side
    leftYStart: number;
    leftYEnd: number;
    // right side
    rightYStart: number;
    rightYEnd: number;
}

// main func
function drawStripe(ctx: CanvasRenderingContext2D, fillColor: ColorsType, coords: StripeCoords) {

    const { x1, x2, leftYStart, leftYEnd, rightYStart, rightYEnd } = coords;

    ctx.fillStyle = colors[fillColor];
    ctx.beginPath();
    ctx.moveTo(x1, leftYStart);

    // 1 curve
    drawCurve(ctx, x1, leftYStart, x2, rightYStart);
    ctx.lineTo(x2, rightYEnd);

    // 2 curve (bottom)
    ctx.moveTo(x1, leftYStart);
    ctx.lineTo(x1, leftYEnd);
    drawCurve(ctx, x1, leftYEnd, x2, rightYEnd);

    // TEMP
    ctx.fill();
}


// helper for stripe
function drawCurve(ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) {

    const xDistance = x2 - x1;
    const deltaY = y2 - y1;
    // const to add slope
    const deltaAdd = deltaY / 2;
    // control points
    const cp1x = xDistance / 3;
    const cp1y = y1 + (deltaY / 3) + deltaAdd;

    const cp2x = xDistance / 3 * 2;
    const cp2y = y1 + (deltaY / 3 * 2) + deltaAdd;

    ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x2, y2);
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