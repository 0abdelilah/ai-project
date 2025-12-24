import { isColliding, getAngle } from './utils.js';
import { flipperL, flipperR } from './flippers.js';
import { sleep } from './utils.js';

export let ball = document.getElementById("ball");

let posX = 200;
let posY = 380;
let velocityX = 0;
let velocityY = 0;

const gravity = -0.2; // downward pull
const ballSize = 27;

let rId;
let isPaused = false;
let flipperLHit = false;
let flipperRHit = false;

const flipperLHitbox = document.querySelector(".flipper-left .hitbox");
const flipperRHitbox = document.querySelector(".flipper-right .hitbox");


async function updateBall() {
    if (isPaused) return;

    // apply gravity
    velocityY += gravity;
    posX += velocityX;
    posY += velocityY;

    const div = document.getElementsByClassName("playfield")[0];
    const w = parseInt(getComputedStyle(div).width) - ballSize;
    const h = parseInt(getComputedStyle(div).height) - ballSize;

    // boundaries
    if (posX <= 0) { posX = 0; velocityX = Math.abs(velocityX); }
    if (posX >= w) { posX = w; velocityX = -Math.abs(velocityX); }
    if (posY <= 0) { posY = 0; pause(); }
    if (posY >= h) { posY = h; velocityY = -Math.abs(velocityY); }

    if (isColliding(ball, flipperLHitbox)) {
        if (!flipperLHit) {
            console.log("collided with flipperL");
            kickBall(getAngle(flipperLHitbox), 5, true); // correct element
            flipperLHit = true;
        }
    } else flipperLHit = false;

    if (isColliding(ball, flipperRHitbox)) {
        if (!flipperRHit) {
            console.log("collided with flipperR");
            kickBall(getAngle(flipperRHitbox), 5, true);
            flipperRHit = true;
        }
    } else flipperRHit = false;


    ball.style.left = posX + "px";
    ball.style.bottom = posY + "px";

    rId = requestAnimationFrame(updateBall);
}

export function kickBall(flipperAngle, flipperSpeed, isLeftFlipper = false) {
    // convert angle to radians
    const angle = (flipperAngle * Math.PI) / 180;

    // base velocity from flipper angle
    let vx = Math.cos(angle) * flipperSpeed;
    let vy = -Math.sin(angle) * flipperSpeed; // upward

    // make sure ball moves away from flipper
    if (isLeftFlipper && vx > 0) vx = -vx;
    if (!isLeftFlipper && vx < 0) vx = -vx;
    if (vy > 0) vy = -vy; // always kick upward

    // apply to ball
    velocityX = vx;
    velocityY = vy;
}

// pause/resume
export function pause() {
    isPaused = true;
    velocityX = 0;
    velocityY = 0;
    posY = 350;
    posX = 152;
    ball.style.bottom = posY + "px";
    ball.style.left = posX + "px";
    console.log("paused");
}

export function resume() {
    if (isPaused) {
        isPaused = false;
        updateBall();
        console.log("resumed");
    }
}

// start loop
updateBall();

// ball control functions
export function releaseBall() {
    velocityY = -5;
    velocityX = 0;
}


