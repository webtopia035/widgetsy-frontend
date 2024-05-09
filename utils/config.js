// Constants.js
const production = {
  url: "https://widgetsy-backend-production.up.railway.app",
};
const development = {
  url: "http://localhost:8000",
};
export const config =
  process.env.NODE_ENV === "development" ? development : production;
