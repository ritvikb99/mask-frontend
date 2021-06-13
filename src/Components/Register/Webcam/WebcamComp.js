import React from 'react';
import './WebcamComp.css';
import Webcam from 'react-webcam';

const WebcamComp = (props) => {
  const webcamRef = React.useRef(null);
  const mediaRecorderRef = React.useRef(null);
  const [capturing, setCapturing] = React.useState(false);
  const [recordedChunks, setRecordedChunks] = React.useState([]);
  var my_interval;
  const handleStartCaptureClick = React.useCallback(() => {
    var vidBox = document.getElementsByTagName('video')[0];
    my_interval = setInterval(() => {
      vidBox.classList.toggle('red');
    }, 1000);

    setTimeout(handleStopCaptureClick, 20000);
    setCapturing(true);
    mediaRecorderRef.current = new MediaRecorder(webcamRef.current.stream, {
      mimeType: 'video/webm',
    });
    mediaRecorderRef.current.addEventListener('dataavailable', handleDataAvailable);
    mediaRecorderRef.current.start();
  }, [webcamRef, setCapturing, mediaRecorderRef]);

  const handleDataAvailable = React.useCallback(
    ({ data }) => {
      if (data.size > 0) {
        setRecordedChunks((prev) => prev.concat(data));
      }
    },
    [setRecordedChunks]
  );

  const handleStopCaptureClick = React.useCallback(() => {
    var vidBox = document.getElementsByTagName('video')[0];
    clearInterval(my_interval);
    if (vidBox.classList.contains('red')) {
      vidBox.classList.remove('red');
    }
    mediaRecorderRef.current.stop();
    setCapturing(false);
  }, [mediaRecorderRef, webcamRef, setCapturing]);

  const handleDownload = React.useCallback(() => {
    var btn = document.getElementById('register');
    btn.classList.remove('disabled');
    if (recordedChunks.length) {
      const blob = new Blob(recordedChunks, {
        type: 'video/webm',
      });
      props.setBlob(blob);
      setRecordedChunks([]);
    }
  }, [recordedChunks]);

  return (
    <div className='wrapper'>
      <Webcam audio={false} ref={webcamRef} />
      <div className='buttons'>
        {capturing ? <button>Recording...</button> : <button onClick={handleStartCaptureClick}>Start Capture</button>}
        {recordedChunks.length > 0 && (
          <button className='satisfied' onClick={handleDownload}>
            Satisfied?
          </button>
        )}
      </div>
    </div>
  );
};

export default WebcamComp;
