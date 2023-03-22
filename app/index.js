import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import { me as appbit } from "appbit";
import { today } from "user-activity";

function zeroPad(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// Update the clock every minute
clock.granularity = "minutes";

// Get a handle on the <text> element
const myLabel = document.getElementById("myLabel");
const stepsLabel = document.getElementById("stepsLabel")

// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  let now = evt.date;
  let hours = now.getHours();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(now.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  if (appbit.permissions.granted("access_activity")) {
    let stepsValue = (today.adjusted.steps);
    try{
        console.log(stepsValue);
        stepsLabel.text = stepsValue;
    } catch {
        stepsLabel.text = 0;
    }
 }
}