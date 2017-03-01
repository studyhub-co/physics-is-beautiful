export var playAudio = function(key) {
    if (SoundSingleton.soundEnabled) {
        var audio = new Audio(SoundSingleton.soundFiles[key]);
        audio.play();
    }
}
