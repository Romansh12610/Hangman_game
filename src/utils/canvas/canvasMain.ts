import { 
    resizeCanvas, 
    setupLinearGradient, 
    drawRect,
    drawMultipleStars, 
    applyShadow,
    drawLeftMountain,
    drawRightMountain,
    drawStripe,
} from "@/utils/canvas/canvasUtils";
import type { FigureCoords, MountainCoords, StripeCoords } from "@/utils/canvas/canvasUtils";



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
        12, 
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
    const leftMountainYStart = skyRectCoords.height * 0.6;
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
    const rightMountainYStart = skyRectCoords.height * 0.6;
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


    // Stripes
    ctx.globalAlpha = 0.3;

    const STRIPE_BIG_HEIGHT = skyRectCoords.height * 0.15;
    const STRIPE_THIN_HEIGHT = STRIPE_BIG_HEIGHT * 0.35;

    const skyStripe1LeftYStart = skyRectCoords.height * 0.18;
    const skyStripe1LeftYEnd = skyStripe1LeftYStart + STRIPE_BIG_HEIGHT;
    const skyStripe1RightYStart = skyStripe1LeftYStart + STRIPE_BIG_HEIGHT * -0.15;
    const skyStripe1RightYEnd = skyStripe1RightYStart + STRIPE_THIN_HEIGHT + 10;

    // Stripe 1 sky
    const skyStripe1Coords: StripeCoords = {
        x1: 0,
        x2: canvas.width,
        leftYStart: skyStripe1LeftYStart,
        leftYEnd: skyStripe1LeftYEnd,
        rightYStart: skyStripe1RightYStart,
        rightYEnd: skyStripe1RightYEnd,
    }

    drawStripe(ctx, "cyan", skyStripe1Coords);

    // Stripe 2 sky
    const skyStripe2LeftYStart = skyStripe1Coords.leftYEnd + STRIPE_THIN_HEIGHT;
    const skyStripe2LeftYEnd = skyStripe2LeftYStart + STRIPE_THIN_HEIGHT;

    const skyStripe2Coords: StripeCoords = {
        x1: 0,
        x2: canvas.width,
        leftYStart: skyStripe2LeftYStart,
        leftYEnd: skyStripe2LeftYEnd,
        rightYStart: skyStripe2LeftYStart + 30,
        rightYEnd: skyStripe2LeftYStart + 10 + STRIPE_BIG_HEIGHT,
    }

    drawStripe(ctx, "cyan", skyStripe2Coords);

    // Stripe road (bottom)
    const roadStripeCoords: StripeCoords = {
        x1: 0,
        x2: canvas.width,
        leftYStart: roadRectCoords.y + 35,
        leftYEnd: roadRectCoords.y + 35 + STRIPE_BIG_HEIGHT,
        rightYStart: roadRectCoords.y + 25,
        rightYEnd: roadRectCoords.y + 30 + STRIPE_THIN_HEIGHT,
    }

    drawStripe(ctx, "lightPurple", roadStripeCoords);
}