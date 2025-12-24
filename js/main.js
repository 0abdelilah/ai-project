import {  ball, resume } from './ball.js';
import { flipperL, flipperR, triggerFlippers } from './flippers.js';

let launchBtn = document.getElementById("launch-btn");
let resetBtn = document.getElementById("reset-btn");

launchBtn.onclick = resume;
/*
resetBtn.onclick = launch;
*/
addEventListener("keydown", async (event) => {
    if (event.key === " ") {
        event.preventDefault();
        await triggerFlippers();
    }
});
