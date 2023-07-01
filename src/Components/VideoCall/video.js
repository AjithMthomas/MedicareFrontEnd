import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

export default function Video(props) {
  const { users, tracks } = props;
  const [gridSpacing, setGridSpacing] = useState(12);

  useEffect(() => {
    setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
  }, [users, tracks]);

  return (
    <div className="h-full ">
      <Grid container className="h-full">
        <Grid item xs={gridSpacing} className="h-full border-2  border-black">
          <AgoraVideoPlayer
            videoTrack={tracks[1]}
            className="h-full w-full"
          />
          <h1 className="">Name</h1>
        </Grid>
        {users.length > 0 &&
          users.map((user) => {
            if (user.videoTrack) {
              return (
                <Grid item xs={gridSpacing} className="h-full  border-black" key={user.uid}>
                  <AgoraVideoPlayer
                    videoTrack={user.videoTrack}
                    className="h-full w-full"
                  />
                  
                </Grid>
              );
            } else return null;
          })}
      </Grid>
    </div>
  );
}
