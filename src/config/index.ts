const {
  VITE_VIDEO_BASE_URL,
  VITE_IMG_BASE_URL,
  VITE_API_BASE_URL,
  VITE_WS_BASE_URL,
  VITE_WS_ALERT_URL,
  VITE_WS_LIVE_URL,
  VITE_APP_TITLE,
} = import.meta.env;

export const config = {
  videoBaseUrl: VITE_VIDEO_BASE_URL,
  imgBaseUrl: VITE_IMG_BASE_URL,
  httpBaseUrl: VITE_API_BASE_URL,
  wsBaseUrl: VITE_WS_BASE_URL,
  wsAlertUrl: VITE_WS_ALERT_URL,
  wsLiveUrl: VITE_WS_LIVE_URL,
  title: VITE_APP_TITLE,
  timeout: 1000 * 60 * 0.5,
  awaitTime: 30,
};

console.log("env", import.meta.env);
