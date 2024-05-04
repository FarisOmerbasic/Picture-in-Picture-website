const videoElement = document.getElementById('video');
const button = document.getElementById('button');
const fullscreenButton = document.getElementById('fullscreenButton');

// Prompt to select media stream, pass it to video element and play
async function selectMediaStream() {
    try {
        const mediaStream = await navigator.mediaDevices.getDisplayMedia();
        videoElement.srcObject = mediaStream;
        videoElement.onloadedmetadata = () => {
            videoElement.play();
        };
    } catch (error) {


    }
}

button.addEventListener('click', async () => {
    // Disable button during the process
    button.disabled = true;
    try {
        // Start Picture in Picture
        await videoElement.requestPictureInPicture();
    } catch (error) {
        console.error('Error starting Picture in Picture:', error);
        // Display error to user
    } finally {
        // Reset button
        button.disabled = false;
    }
});

fullscreenButton.addEventListener('click', () => {
    if (document.fullscreenElement) {
        document.exitFullscreen();
    } else {
        videoElement.requestFullscreen().catch((err) => {
            console.error('Error toggling fullscreen mode:', err);
        });
    }
});

selectMediaStream();
