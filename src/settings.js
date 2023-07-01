import { createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appId = "12554c22a9074814a545ca9e1b02dc47";
const token =
  "007eJxTYMgyCDspw5hiISigkcIaZfJrndTZ3Ff9x0SVBC1X7V0VmabAYGhkamqSbGSUaGlgbmJhaJJoamKanGiZaphkYJSSbGJe9mleSkMgI4OrYwETIwMEgvgsDLmJmXkMDAD8pxtU";

  export const config = { mode: "rtc", codec: "vp8", appId: appId, token: token };
  export const useClient = createClient(config);
  export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
  export const channelName = "main";