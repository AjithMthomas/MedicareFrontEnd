import React, { useState } from 'react';
import { Button } from '@material-ui/core';
import VideoCall from '../../Components/VideoCall/videoCall';

function VideoCalls() {
  const [inCall, setInCall] = useState(false);

  return (
    <div className="h-screen flex justify-center items-center">
      {inCall ? (
        <VideoCall setInCall={setInCall} />
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={() => setInCall(true)}
          className="py-3 px-6 rounded-md bg-blue-500 text-white hover:bg-blue-600"
        >
          Join Call
        </Button>
      )}
    </div>
  );
}

export default VideoCalls;
