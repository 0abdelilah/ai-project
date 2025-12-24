import { sleep } from './utils.js';

export let flipperL = document.getElementById("flipper-left");
export let flipperR = document.getElementById("flipper-right");

export async function triggerFlippers() {
    flipperL.classList.add("active");
    flipperR.classList.add("active");
    await sleep(100);
    flipperL.classList.remove("active");
    flipperR.classList.remove("active");
}
