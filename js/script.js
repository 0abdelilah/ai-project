let launchBtn = document.getElementById("launch-btn");
launchBtn.onclick = releaseBall;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function releaseBall() {
    console.log("Ball released");

    let ball = document.getElementById("ball");
    let i = parseInt(window.getComputedStyle(ball).bottom);


    while (i >= 0) {
        ball.style.bottom = i + "px";
        i--;
        await sleep(0.00000001)
    }
}

addEventListener("keydown",async  (event) => {
    console.log(event.key)
    if (event.key === " ") {
        await triggerFlippers()
    }
})

async function triggerFlippers() {
    let flipperL = document.getElementById("flipper-left");
    let flipperR = document.getElementById("flipper-right");

    flipperL.classList.add("active");
    flipperR.classList.add("active");

    await sleep(100)

    flipperL.classList.remove("active");
    flipperR.classList.remove("active");
}