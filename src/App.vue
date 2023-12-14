<script></script>

<template>
    <section id="demos" class="invisible">
        <h2>Demo: Webcam continuous detection</h2>
        <p>
            Hold some objects up close to your webcam to get a real-time detection! When ready click
            "enable webcam" below and accept access to the webcam.
        </p>
        <div>
            This demo uses a model trained on the COCO dataset. It can identify 80 different classes
            of object in an image.
            <a
                href="https://github.com/amikelive/coco-labels/blob/master/coco-labels-2014_2017.txt"
                target="_blank"
                >See a list of available classes</a
            >
        </div>
        <div id="liveView" class="videoView">
            <button id="webcamButton" class="mdc-button mdc-button--raised">
                <span class="mdc-button__ripple"></span>
                <span class="mdc-button__label">ENABLE WEBCAM</span>
            </button>
            <video id="webcam" autoplay playsinline></video>
        </div>
    </section>
</template>

<style scoped></style>
