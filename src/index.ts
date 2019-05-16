import * as PIXI from 'pixi.js';


const app = new PIXI.Application({
    width: 400,
    height: 400,
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
graphics.drawRect(0, 0, 60, 10);
graphics.x = 20;
graphics.y = 20;
graphics.visible = true;

app.stage.addChild(graphics);
