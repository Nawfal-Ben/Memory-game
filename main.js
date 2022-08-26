// Variables
let start = document.querySelector(".start")
let startBtn = document.querySelector(".start button")
let player = document.querySelector(".name")
let tries = document.querySelector(".tries")
let blocks = document.querySelectorAll(".block")
let flippedBlocks = []

// Start the game
// startBtn.addEventListener("click", () => {
//     let name = prompt("Enter your name")
//     player.innerHTML = name || "Unknown"
//     start.remove()
// })

// Shuffle the blocks
let orders = []
while (orders.length < 20) {
    let randomOrder = Math.ceil(Math.random() * 20)
    if (!orders.includes(randomOrder)) orders.push(randomOrder)
}

// Start flipping the cards
blocks.forEach((block, i) => {
    block.style.order = orders[i]
    block.addEventListener("click", () => {
        // flip the block
        block.classList.add("flipped")
        flippedBlocks.push(block)

        // check the two flipped blocks
        if (flippedBlocks.length === 2) {
            document.querySelector(".blocks").style.pointerEvents = "none"
            if (flippedBlocks[0].dataset.technology !== flippedBlocks[1].dataset.technology) {
                setTimeout(() => {
                    // unflip the two blocks and continue playing
                    flippedBlocks[0].classList.remove("flipped")
                    flippedBlocks[1].classList.remove("flipped")
                    flippedBlocks.splice(0)
                    document.querySelector(".blocks").style.pointerEvents = "auto"
                    tries.innerHTML++
                    document.getElementById("fail").play()
                }, 1000)
            } else {
                setTimeout(() => {
                    flippedBlocks.splice(0)
                    document.querySelector(".blocks").style.pointerEvents = "auto"
                    document.getElementById("success").play()

                    // check if all blocks are flipped and play again
                    let allFlipped = Array.from(blocks).every(block => block.classList.contains("flipped"))
                    if (allFlipped) playAgain()
                }, 1000)
            }
        }
    })
})

function playAgain() {
    document.querySelector(".play-again").style.display = "grid"
    let playAgain = document.createElement("button")
    playAgain.innerHTML = "Play Again"
    document.querySelector(".play-again").appendChild(playAgain)
    playAgain.onclick = () => {
        blocks.forEach(block => block.classList.remove("flipped"))
        tries.innerHTML = 0
        document.querySelector(".play-again").remove()
    }
}