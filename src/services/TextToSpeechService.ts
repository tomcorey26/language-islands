export function speakSpanish(text: string) {
  const msg = new SpeechSynthesisUtterance(text);
  const voices = window.speechSynthesis.getVoices();
  msg.voice = voices.filter(function (voice) {
    // get mexican spanish voice
    return voice.lang === 'es-MX';
  })[0];
  window.speechSynthesis.speak(msg);
}
