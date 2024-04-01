// export stuff
export { 
    resizeCanvas, 
    drawRect,
    drawStar, 
    setupLinearGradient, 
    setupRadialGradient 
};

// Colors
export const colors = {
    white: "#fffffc",
    darkBlue: "#1f217e",
    midBlue: "#4e76fa",
    cyan: "#51cbe9",
    purple: "#4f3a9b",
    lightPurple: "#473fb8",
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
type RectParams = [x: number, y: number, width: number, height: number];
type ColorParam = ColorsType | CanvasGradient;

function drawRect(ctx: CanvasRenderingContext2D, fillValue: ColorParam, ...rectParams: RectParams) {
    
    if (typeof fillValue === 'string') {
        const color = colors[fillValue];
        ctx.fillStyle = color;
    } else {
        // if its a gradient
        ctx.fillStyle = fillValue;
    }

    ctx.fillRect(...rectParams);
}


// Stars

function drawStar(ctx: CanvasRenderingContext2D, fillColor: ColorsType, centerX: number, centerY: number, radius: number) {

    ctx.fillStyle = colors[fillColor];
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);

    ctx.fill();
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