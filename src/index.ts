import * as PIXI from 'pixi.js';


interface Circle {
    readonly x: number,
    readonly y: number,
    readonly radius: number
}

function circle(stage: PIXI.Container, circle: Circle) {
    const graphics = new PIXI.Graphics();
    graphics.lineStyle(3, 0);
    graphics.drawCircle(circle.x, circle.y, circle.radius);
    stage.addChild(graphics);
}

const app = new PIXI.Application({
    width: 600,
    height: 600,
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

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0000FF);
graphics.lineStyle(5, 0x0000FF);
graphics.drawRect(20, 20, 60, 10);
app.stage.addChild(graphics);

circle(app.stage, { x: 300, y: 300, radius: 240 });