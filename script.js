const params = new URLSearchParams(window.location.search);

const ID = params.get("id") || "";

// Read data from URL
let patient = params.get("patient") || "Unknown";
let time = params.get("time") || "-";
let mriPart = params.get("mri") || "-";
let date = params.get("date") || "-";
let status = params.get("status") || "PENDING";

// Language
let currentLang = "en";

const LANG = {
en:{
title:"MRI Appointment",
confirm:"CONFIRM",
cancel:"CANCEL",
reschedule:"RESCHEDULE",
patient:"Patient",
time:"Time",
mri:"MRI Part",
date:"Date",
status:"Status"
},
bm:{
title:"Temujanji MRI",
confirm:"SAHKAN",
cancel:"BATAL",
reschedule:"TUKAR TARIKH",
patient:"Pesakit",
time:"Masa",
mri:"Bahagian MRI",
date:"Tarikh",
status:"Status"
}
};

// Initial page
setLang("en");

// Confirm
document.getElementById("confirmBtn").onclick = function(){
sendResponse("CONFIRMED");
};

// Cancel
document.getElementById("cancelBtn").onclick = function(){

let reason = prompt(
currentLang=="en"
? "Reason for cancellation"
: "Sebab pembatalan"
);

if(reason){
sendResponse("CANCELLED - " + reason);
}

};

// Reschedule
document.getElementById("rescheduleBtn").onclick = function(){

let newDate = prompt(
currentLang=="en"
? "Enter new requested date"
: "Masukkan tarikh baru"
);

if(newDate){
sendResponse("RESCHEDULE - " + newDate);
}

};

// Fake backend
function sendResponse(response){

console.log({
id:ID,
status:response
});

// nanti kita tukar kepada Power Automate
finish(response);

}

// Finish
function finish(response){

status = response;

document.getElementById("statusBox").innerText =
LANG[currentLang].status + ": " + response;

document.querySelectorAll("button").forEach(btn=>{
btn.disabled=true;
btn.style.opacity="0.5";
});

document.querySelector(".card").style.display="none";
document.getElementById("thankYou").style.display="flex";

}

// Language Switch
function setLang(lang){

currentLang=lang;

// Slider
if(lang=="en"){
document.getElementById("langSlider").style.left="3px";
}
else{
document.getElementById("langSlider").style.left="46px";
}

// Title
document.getElementById("titleText").innerText=
LANG[lang].title;

// Buttons
document.getElementById("confirmBtn").innerText=
LANG[lang].confirm;

document.getElementById("cancelBtn").innerText=
LANG[lang].cancel;

document.getElementById("rescheduleBtn").innerText=
LANG[lang].reschedule;

// Patient Info
document.getElementById("patientText").innerText=
LANG[lang].patient + ": " + patient;

document.getElementById("timeText").innerText=
LANG[lang].time + ": " + time;

document.getElementById("mriText").innerText=
LANG[lang].mri + ": " + mriPart;

document.getElementById("dateText").innerText=
LANG[lang].date + ": " + date;

document.getElementById("statusBox").innerText=
LANG[lang].status + ": " + status;

}
