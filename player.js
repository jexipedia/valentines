$(document).ready(function() {
    const audio = document.getElementById('audio');
    const playButton = $('.play i');
    const currentTime = $('.current-time');
    const totalTime = $('.total-time');
    const progressBar = $('.current');
    let isPlaying = false;

    // Expand button functionality
    $('#expand-button').click(function() {
        $('.player').toggleClass('expand');
    });

    // Play/Pause functionality
    $('.play').click(function() {
        if (isPlaying) {
            audio.pause();
            playButton.removeClass('fa-pause').addClass('fa-play');
        } else {
            audio.play();
            playButton.removeClass('fa-play').addClass('fa-pause');
        }
        isPlaying = !isPlaying;
    });

    // Update time
    audio.addEventListener('timeupdate', function() {
        const current = audio.currentTime;
        const duration = audio.duration;
        
        // Update progress bar
        const progress = (current / duration) * 100;
        progressBar.css('width', progress + '%');
        
        // Update time displays
        currentTime.text(formatTime(current));
        totalTime.text(formatTime(duration));
    });

    // Format time function
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    // Click on timeline to seek
    $('.line').click(function(e) {
        const rect = this.getBoundingClientRect();
        const pos = (e.clientX - rect.left) / rect.width;
        audio.currentTime = pos * audio.duration;
    });

    // Forward/Backward functionality
    $('.forward').click(function() {
        audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
    });

    $('.backward').click(function() {
        audio.currentTime = Math.max(audio.currentTime - 10, 0);
    });

    // Heart functionality
    $('.heart').click(function() {
        $(this).toggleClass('active');
        if ($(this).hasClass('active')) {
            $(this).css('color', 'var(--red)');
        } else {
            $(this).css('color', '');
        }
    });

    // Initialize total time
    audio.addEventListener('loadedmetadata', function() {
        totalTime.text(formatTime(audio.duration));
    });
}); 