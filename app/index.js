import clock from "clock";
import * as document from "document";
import { preferences } from "user-settings";
import { me as appbit } from "appbit";
import { today } from "user-activity";
import { battery } from "power";
import { charger } from "power";

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
const stepsLabel = document.getElementById("stepsLabel");
const goodWork = document.getElementById("goodWork");
const batteryLabel = document.getElementById("batteryLabel");
const batteryIcon = document.getElementById("batteryIcon");
const dateLabel = document.getElementById("dateLabel");
const monthLabel = document.getElementById("monthLabel");

batteryLabel.text = ((battery.chargeLevel) + "%")
batteryCalc();
// Update the <text> element every tick with the current time
clock.ontick = (evt) => {
  
  //Clock
  let now = evt.date;
  let hours = now.getHours();
  let date = now.getDate();
  let month = now.getMonth();
  if (preferences.clockDisplay === "12h") {
    // 12h format
    hours = hours % 12 || 12;
  } else {
    // 24h format
    hours = zeroPad(hours);
  }
  let mins = zeroPad(now.getMinutes());
  myLabel.text = `${hours}:${mins}`;
  
  // Step count
  if (appbit.permissions.granted("access_activity")) {
    let stepsValue = today.adjusted.steps;
    if (stepsValue >= 10000){
      goodWork.style.opacity = 1;
    } else {
      goodWork.style.opacity = 0;
    }
      console.log(stepsValue);
      stepsLabel.text = stepsValue;
  }
  
  //Date Month shenanigans
  console.log(date, month + 1);
  dateLabel.text = date;
  monthLabel.text = month + 1;
}

battery.onChange = (charger, evt) => {
  batteryCalc();
}

// Function to change battery icons
function batteryCalc(){
  batteryLabel.text = ((battery.chargeLevel) + "%");
    
  if (charger.connected === true) {
    batteryIcon.href = "batteries/charging-battery.png"
  } else {
    if (battery.chargeLevel > 90) {
      batteryIcon.href = "batteries/full-battery.png";
    } else if (battery.chargeLevel > 60){
      batteryIcon.href = "batteries/used-battery.png"
    } else if (battery.chargeLevel > 40){
      batteryIcon.href = "batteries/half-battery.png"
    } else if (battery.chargeLevel > 25){
      batteryIcon.href = "batteries/low-battery.png"
    } else if (battery.chargeLevel > 0){
      batteryIcon.href = "batteries/recharge-battery.png"
    }
  }
}