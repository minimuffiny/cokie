/**
 * Initialize game variables
 */
// Button B event to buy a Clicker
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    buyClicker()
})
// Function to purchase a Grandma
function buyGrandma () {
    if (score >= grandmaCost) {
        score += 0 - grandmaCost
        grandmasOwned += 1
        // Increase cost by 15% with each purchase
        grandmaCost = Math.floor(grandmaCost * 1.15)
        updateCPS()
        info.setScore(score)
        game.splash("Grandma purchased!", "Total Grandmas: " + grandmasOwned)
    } else {
        game.splash("Not enough cookies!", "You need " + (grandmaCost - score) + " more.")
    }
}
// Button A click event to increase cookies by clicking the cookie
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    score += 1
    info.setScore(score)
    music.baDing.play()
    cookie.startEffect(effects.spray, 100)
})
// Function to purchase a Clicker
function buyClicker () {
    if (score >= clickerCost) {
        score += 0 - clickerCost
        clickersOwned += 1
        // Increase cost by 15% with each purchase
        clickerCost = Math.floor(clickerCost * 1.15)
        updateCPS()
        info.setScore(score)
        game.splash("Clicker purchased!", "Total Clickers: " + clickersOwned)
    } else {
        game.splash("Not enough cookies!", "You need " + (clickerCost - score) + " more.")
    }
}
// Button Menu event to buy a Grandma
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    buyGrandma()
})
// Update CPS based on Clickers and Grandmas owned
function updateCPS () {
    cookiesPerSecond = clickersOwned * clickerCPS + grandmasOwned * grandmaCPS
}
let cookiesPerSecond = 0
let clickersOwned = 0
let grandmasOwned = 0
let score = 0
let cookie: Sprite = null
let grandmaCPS = 0
let clickerCPS = 0
let grandmaCost = 0
let clickerCost = 0
// Starting cost for Clicker
clickerCost = 15
// Starting cost for Grandma
grandmaCost = 100
// CPS per Clicker
clickerCPS = 0.1
// CPS per Grandma (higher than Clicker)
grandmaCPS = 1
let lastUpdateTime = game.runtime()
// Create the cookie sprite
cookie = sprites.create(img`
    ..............bbbbbbb...........
    ...........bb66663333baa........
    .........bb3367776333663aa......
    ........b33333888333389633aa....
    .......b3333333333333389633aa...
    ......b34443333333333338633bae..
    .....b3455433333333334443333ae..
    ....b33322333dddd3333455233daee.
    ...b3d333333dd3bbbb33322333dabe.
    ..b3d333333d3bb33bb33333333da4e.
    ..bd33333333b33aab3333333223a4ee
    .b3d3663333b33aab33366332442b4ee
    .bd3b983333a3aa3333387633ee3b4ee
    .bd6983333baaa333333387633bb4bee
    b3d6833333bba333333333863ba44ebe
    bdd3333333bb3333333333333a44bebe
    add666633333322333366333ba44bbbe
    ad67776333332442336983d3a444b4e.
    add888b333333ee3369833d3a44b44e.
    add333333333333336833d3a444b4e..
    a3dd3333344433333dddd3a444b44e..
    ab33ddd325543333dd33aa444b44e...
    .eabb3dd32233333baaa4444b44e....
    .ebabb3d333d33baa444443b44e.....
    ..ebaab3ddd3aaa4444433b44e......
    ..eebbaab33a44444333b444e.......
    ...eeebbaab444b333b4444e........
    ....ebeeebbbbbbbb4444ee.........
    .....eebbbb44444444ee...........
    .......eeebbb444eee.............
    ..........eeeeee................
    ................................
    `, SpriteKind.Player)
cookie.setPosition(80, 60)
// Show the score on the screen
info.setScore(score)
// Add cookies per second (CPS) periodically
game.onUpdateInterval(1000, function () {
    score += Math.floor(cookiesPerSecond)
    info.setScore(score)
})
