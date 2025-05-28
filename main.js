onload = () => {
    const c = setTimeout(() => {
      document.body.classList.remove("not-loaded");
      clearTimeout(c);
    }, 1000);
  };

document.addEventListener('DOMContentLoaded', function() {
    const playButton = document.getElementById('playButton');
    const audio = document.getElementById('valentineAudio');
    const playIcon = playButton.querySelector('.play-icon');
    let isPlaying = false;

    playButton.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playIcon.textContent = '▶';
        } else {
            audio.play();
            playIcon.textContent = '⏸';
        }
        isPlaying = !isPlaying;
    });

    // Handle audio ended event
    audio.addEventListener('ended', function() {
        isPlaying = false;
        playIcon.textContent = '▶';
    });
});