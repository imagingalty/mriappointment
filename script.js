const params = new URLSearchParams(window.location.search);
const ID = params.get("id");


// temporary data

let patient = "Abdul Haris";
let time = "10:30 AM";
let mriPart = "MRI Brain";
let date = "5 July 2026";
let status = "PENDING";


// language setting

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


// initial page load

setLang("en");



// confirm button

document.getElementById("confirmBtn").onclick =
function(){

sendResponse("CONFIRMED");

};



// cancel button

document.getElementById("cancelBtn").onclick =
function(){

let reason = prompt(

currentLang == "en"
? "Reason for cancellation"
: "Sebab pembatalan"

);

if(reason){

sendResponse("CANCELLED - " + reason);

}

};



// reschedule button

document.getElementById("rescheduleBtn").onclick =
function(){

let newDate = prompt(

currentLang == "en"
? "Enter new requested date"
: "Masukkan tarikh baru"

);

if(newDate){

sendResponse("RESCHEDULE - " + newDate);

}

};



// fake backend for now

function sendResponse(response){

console.log({

orderId: ID,
status: response

});

// later connect to backend

finish(response);

}



// after submit

function finish(response){

status = response;


// update status text before hide

document.getElementById("statusBox").innerText =
LANG[currentLang].status + ": " + response;


// disable buttons

document.querySelectorAll("button")
.forEach(b => {

b.disabled = true;

});


// hide card

document.querySelector(".card").style.display =
"none";


// show thank you page

document.getElementById("thankYou").style.display =
"flex";

}



// language switch

function setLang(lang){

currentLang = lang;


// move slider

if(lang=="en"){

document.getElementById("langSlider")
.style.left = "3px";

}

else{

document.getElementById("langSlider")
.style.left = "46px";

}


// title

document.getElementById("titleText").innerText =
LANG[lang].title;


// buttons

document.getElementById("confirmBtn").innerText =
LANG[lang].confirm;

document.getElementById("cancelBtn").innerText =
LANG[lang].cancel;

document.getElementById("rescheduleBtn").innerText =
LANG[lang].reschedule;


// field labels translate

document.getElementById("patientText").innerText =
LANG[lang].patient + ": " + patient;

document.getElementById("timeText").innerText =
LANG[lang].time + ": " + time;

document.getElementById("mriText").innerText =
LANG[lang].mri + ": " + mriPart;

document.getElementById("dateText").innerText =
LANG[lang].date + ": " + date;

document.getElementById("statusBox").innerText =
LANG[lang].status + ": " + status;

}