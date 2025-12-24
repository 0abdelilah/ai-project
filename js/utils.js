export function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export function isColliding(el1, el2) {
    const r1 = el1.getBoundingClientRect();
    const r2 = el2.getBoundingClientRect();
    return !(r1.top > r2.bottom || r1.bottom < r2.top || r1.left > r2.right || r1.right < r2.left);
}

export function getAngle(el) {
    const style = getComputedStyle(el).transform;
    if (!style || style === "none") return 0;

    const values = style.match(/matrix\((.+)\)/)[1].split(', ');
    const a = parseFloat(values[0]);
    const b = parseFloat(values[1]);

    return Math.atan2(b, a) * (180 / Math.PI);
}
