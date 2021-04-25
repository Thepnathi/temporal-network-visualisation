// Basic settings to gather the window dimension of the browser

function windowWidth() {
    let width = window.innerWidth
    || document.documentElement.clientWidth
    || document.body.clientWidth;
    return width
}

function windowHeight() {
    let height = window.innerHeight
    || document.documentElement.clientHeight
    || document.body.clientHeight;
    return height
}
