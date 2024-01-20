import WaveSurfer from 'wavesurfer.js'


const WaveTrack = () => {
    const wavesurfer = WaveSurfer.create({
    container: document.body,
    waveColor: 'rgb(200, 0, 200)',
    progressColor: 'rgb(100, 0, 100)',
    url: '/examples/audio/audio.wav',
  })
  
  wavesurfer.on('click', () => {
    wavesurfer.play()
  })
  return (
    <>
      <div className="wave-track">


      </div>
    </>
  );
};
