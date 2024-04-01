import { 
    resizeCanvas, 
    setupLinearGradient, 
    drawRect,
    drawMultipleStars, 
    applyShadow,
    drawLeftMountain,
    drawRightMountain,
} from "@/utils/canvas/canvasUtils";
import type { FigureCoords, MountainCoords } from "@/utils/canvas/canvasUtils";



export function main(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // resizing & coords
    resizeCanvas(canvas);

    // sky rect
    const skyRectCoords: FigureCoords = {
        x: 0,
        y: 0,
        width: canvas.width,
        height: canvas.height * 0.75,
    };

    const skyGradient = setupLinearGradient(ctx, [0, 0, 0, skyRectCoords.height], ['darkBlue', 'midBlue', 'cyan'], [0, 0.6, 0.86]);

    drawRect(ctx, skyGradient, skyRectCoords);

    // stars
    ctx.save();
    applyShadow(ctx, 7, 'white', 0, 0);

    drawMultipleStars(
        ctx, 
        10, 
        'white', 
        [skyRectCoords.width * 0.05, skyRectCoords.width * 0.95, skyRectCoords.height * 0.08, skyRectCoords.height * 0.55], 
        4,
    );


    // bottom - road rect
    ctx.restore();
    ctx.save();
    
    const roadRectCoords: FigureCoords = {
        x: 0,
        y: skyRectCoords.height,
        width: canvas.width,
        height: canvas.height - skyRectCoords.height,
    }

    drawRect(ctx, "purple", roadRectCoords);


    // mountains
    ctx.save();
    
    const mountainWidth = canvas.width * 0.4;
    const leftMountainYStart = skyRectCoords.height * 0.5;
    const leftMountainHeight = skyRectCoords.height;

    // left mountain
    const leftMountainCoords: MountainCoords = {
        x1: 0,
        y1: leftMountainYStart,
        x2: mountainWidth,
        y2: leftMountainHeight, 
    }

    drawLeftMountain(
        ctx,
        "mountainBlue",
        leftMountainCoords,
    );

    // right mountain
    const rightMountainXStart = canvas.width - mountainWidth;
    const rightMountainYStart = skyRectCoords.height * 0.5;
    const rightMountainYEnd = skyRectCoords.height;

    const rightMountainCoords: MountainCoords = {
        x1: rightMountainXStart,
        y1: rightMountainYStart,
        x2: canvas.width,
        y2: rightMountainYEnd, 
    }

    drawRightMountain(
        ctx,
        "mountainBlue",
        rightMountainCoords,
    );
}