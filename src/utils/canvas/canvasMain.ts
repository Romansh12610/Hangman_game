import { 
    resizeCanvas, 
    setupLinearGradient, 
    drawRect,
    drawStar, 
} from "@/utils/canvas/canvasUtils";

export function main(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    // resizing & coords
    resizeCanvas(canvas);

    // sky rect
    const skyGradient = setupLinearGradient(ctx, [0, 0, canvas.width * 0.08, canvas.height], ['darkBlue', 'midBlue', 'cyan'], [0, 0.55, 0.7]);

    ctx.save();
    ctx.translate(-canvas.width * 0.2, 0);
    ctx.rotate(5 * Math.PI / 180 * -1);
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#0af";

    drawRect(ctx, skyGradient, 0, 0, canvas.width * 1.5, canvas.height - canvas.height * 0.25);

    ctx.restore();

    ctx.shadowBlur = 10;
    ctx.shadowColor = "#fff";

    // stars
    for (let i = 0; i < 10; ++i) {
        const starX = Math.floor(Math.random() * canvas.width * 0.85) + canvas.width * 0.1;
        const starY = Math.floor(Math.random() * (canvas.height * 0.6)) + canvas.height * 0.05;
        drawStar(ctx, 'white', starX, starY, 5);
    }
}