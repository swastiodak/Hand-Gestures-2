prediction1 = ""
prediction2 = ""

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png',
    png_quality: 90
});

camera=document.getElementById("camera");

Webcam.attach('#camera');

function takeSnapshot() {
    Webcam.snap(function (dataUri) {
        document.getElementById("result").innerHTML = "<img id='capturedImage' src='" + dataUri + "'>";
    });
}

console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/xgBIV36Pl/model.json", modelLoaded);

function modelLoaded() {
    console.log("model has loaded");
}

function speak() {
    var synth = window.speechSynthesis;
    speakData1 = "the first prediction is " + prediction1;
    speakData2 = "and the second prediction is " + prediction2;
    var utterThis = new SpeechSynthesisUtterance(speakData1 + speakData2);
    synth.speak(utterThis);
}

function predict() {
    img=document.getElementById("capturedImage");
    classifier.classify(img,gotResult);
}

function gotResult(error,result){
    if(error){
    console.error(error);
} else {
    console.log(result);
    document.getElementById("resultGestureName1").innerHTML=result[0].label;
    document.getElementById("resultGestureName2").innerHTML=result[1].label;
    prediction1=result[0].label;
    prediction2=result[1].label;
    speak();
}
}