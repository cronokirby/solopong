import * as PIXI from 'pixi.js';

const WIDTH = 600;
const HEIGHT = 600;
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };
const RADIUS = 240;


interface Pos {
    readonly x: number;
    readonly y: number;
}

interface Circle {
    readonly pos: Pos;
    readonly radius: number;
}

function circle(stage: PIXI.Container, circle: Circle) {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(3, 0);
    graphics.drawCircle(circle.pos.x, circle.pos.y, circle.radius);
    stage.addChild(graphics);
}


class Paddle {
    private static readonly WIDTH = 90;
    private mouse: PIXI.interaction.InteractionData;
    private graphics: PIXI.Graphics;

    constructor(app: PIXI.Application) {
        this.mouse = app.renderer.plugins.interaction.mouse;
        this.graphics = new PIXI.Graphics();
        this.graphics.beginFill(0x0000FF);
        this.graphics.lineStyle(5, 0x0000FF);
        this.graphics.drawRect(0, 0, Paddle.WIDTH, 10);
        app.stage.addChild(this.graphics);
    }

    update(deltaS: number) {
        const mousePos = this.mouse.global;
        const dir = { x: mousePos.x - CENTER.x, y: mousePos.y - CENTER.y };
        const dirScale = Math.sqrt(dir.x * dir.x + dir.y * dir.y);
        const unitDir = { x: dir.x / dirScale, y: dir.y / dirScale };
        const shiftRadius = RADIUS + 2;
        const { x, y } = { x: unitDir.x * shiftRadius + CENTER.x, y: unitDir.y * shiftRadius + CENTER.y };

        const ortho = { x: unitDir.y, y: unitDir.x };
        this.graphics.x = x + ortho.x * Paddle.WIDTH / 2;
        this.graphics.y = y - ortho.y * Paddle.WIDTH / 2;

        const piAngle = unitDir.y >= 0 ? Math.acos(unitDir.x) : -Math.acos(unitDir.x);
        const angle = piAngle * 180 / Math.PI + 90;
        this.graphics.angle = angle;
    }
}


const app = new PIXI.Application({
    width: WIDTH,
    height: HEIGHT,
    resolution: devicePixelRatio,
    backgroundColor: 0xFFFFFF,
    antialias: true
});

window.addEventListener('load', () => {
    const gameEl = document.getElementById('game');
    if (gameEl) {
        gameEl.appendChild(app.view);
    }
})

circle(app.stage, { pos: CENTER, radius: RADIUS });
const paddle = new Paddle(app);

app.ticker.add(() => {
    const deltaS = app.ticker.deltaMS / 1000;
    paddle.update(deltaS);
})