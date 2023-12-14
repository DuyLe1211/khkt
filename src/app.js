import {
    ObjectDetector,
    FilesetResolver
} from 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2'

const demosSection = document.getElementById('demos')

let objectDetector
let runningMode = 'IMAGE'

// Initialize the object detector
const initializeObjectDetector = async () => {
    const vision = await FilesetResolver.forVisionTasks(
        'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.2/wasm'
    )
    objectDetector = await ObjectDetector.createFromOptions(vision, {
        baseOptions: {
            modelAssetPath: `https://storage.googleapis.com/mediapipe-models/object_detector/efficientdet_lite0/float16/1/efficientdet_lite0.tflite`,
            delegate: 'GPU'
        },
        scoreThreshold: 0.5,
        runningMode: runningMode
    })
    demosSection.classList.remove('invisible')
}
initializeObjectDetector()

let video = document.getElementById('webcam')
const liveView = document.getElementById('liveView')
let enableWebcamButton
// Check if webcam access is supported.
function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
}

// Keep a reference of all the child elements we create
// so we can remove them easilly on each render.
var children = []

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
    enableWebcamButton = document.getElementById('webcamButton')
    enableWebcamButton.addEventListener('click', enableCam)
} else {
    console.warn('getUserMedia() is not supported by your browser')
}

// Enable the live webcam view and start detection.
async function enableCam(event) {
    if (!objectDetector) {
        console.log('Wait! objectDetector not loaded yet.')
        return
    }

    // Hide the button.
    enableWebcamButton.classList.add('removed')

    // getUsermedia parameters
    const constraints = {
        video: true
    }

    // Activate the webcam stream.
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function (stream) {
            video.srcObject = stream
            video.addEventListener('loadeddata', predictWebcam)
        })
        .catch((err) => {
            console.error(err)
            /* handle the error */
        })
}

let lastVideoTime = -1
async function predictWebcam() {
    // if image mode is initialized, create a new classifier with video runningMode.
    if (runningMode === 'IMAGE') {
        runningMode = 'VIDEO'
        await objectDetector.setOptions({ runningMode: 'VIDEO' })
    }
    let startTimeMs = performance.now()

    // Detect objects using detectForVideo.
    if (video.currentTime !== lastVideoTime) {
        lastVideoTime = video.currentTime
        const detections = objectDetector.detectForVideo(video, startTimeMs)
        controlVideoDetections(detections)
    }
    // Call this function again to keep predicting when the browser is ready.
    window.requestAnimationFrame(predictWebcam)
}

const firebaseConfig = {
    apiKey: 'AIzaSyC3m_gFqvqeCRhrkWihMTMteIKNBgg1j8I',
    authDomain: 'khkt-847e4.firebaseapp.com',
    databaseURL: 'https://khkt-847e4-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'khkt-847e4',
    storageBucket: 'khkt-847e4.appspot.com',
    messagingSenderId: '336365070071',
    appId: '1:336365070071:web:2dcd5601fbe8288dad15f2',
    measurementId: 'G-ZNY7881QQ7'
}
firebase.initializeApp(firebaseConfig)

let database = firebase.database()
let firebaseRef = database.ref('person')

firebaseRef.set('0')

function controlVideoDetections(result) {
    console.log(result.detections)
    firebaseRef.set(`${result.detections.length}`)
}
