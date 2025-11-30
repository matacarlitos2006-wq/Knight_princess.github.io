$(document).ready(function () {
    const player = $('#player');
    const gameContainer = $('#game-container');
    let moveX = 0;
    let moveY = 0;

    // Starting position (so we can modify top later)
    player.css("top", gameContainer.height() - player.height() - 10);

    $(document).keydown(function (e) {
        if (e.key === 'ArrowLeft') moveX = -3;
        if (e.key === 'ArrowRight') moveX = 3;
        if (e.key === 'ArrowUp') moveY = -5; // jump upward
    });

    $(document).keyup(function (e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') moveX = 0;
        if (e.key === 'ArrowUp') moveY = 0;
    });

    function movePlayer() {
        let left = parseFloat(player.css('left'));
        let top = parseFloat(player.css('top'));

        // Horizontal movement
        let newLeft = left + moveX;
        if (newLeft >= 0 && newLeft <= gameContainer.width() - player.width()) {
            player.css('left', newLeft);
        }

        // Vertical movement (jump)
        let newTop = top + moveY;
        if (newTop >= 0 && newTop <= gameContainer.height() - player.height()) {
            player.css('top', newTop);
        }

        requestAnimationFrame(movePlayer);
    }

    movePlayer(); // start loop
});
