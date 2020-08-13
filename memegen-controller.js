//todo: 
// suport dif sizes of screen
// change every letter switch
// icons
//

var gId;
var currLine;




//onload gallery
function init() {
    let innerHTML = ``;
    innerHTML += `
        <img src="imgs/1.jpg" id="1" onclick="onClickImg(id)">
        <img src="imgs/2.jpg" id="2" onclick="onClickImg(id)">
        <img src="imgs/3.jpg" id="3" onclick="onClickImg(id)">
        <img src="imgs/4.jpg" id="4" onclick="onClickImg(id)">
        <img src="imgs/5.jpg" id="5" onclick="onClickImg(id)">
        <img src="imgs/6.jpg" id="6" onclick="onClickImg(id)">

   `;

    const mainCont = document.querySelector('.main-container');
    mainCont.innerHTML = innerHTML;

    // serchMod();


}

//picking the image

function onClickImg(id) {
    gId = parseFloat(id)
    uppdateCurrImg(id)
    renderMemeGen(id)
    drawImg(id);
    createMeme();
    animation();
}

//starting canvas 


function renderMemeGen(id) {
    let innerHTML = ``;

    innerHTML += `
                 
                 <div class="canvas-container">
                    <canvas id="myCanvas"></canvas>
                 </div>
                 <div class="pannel">
                 <div class="input-cont">
                 <input type="text" class="text-input" placeholder="chaging line 1"  onkeyup="onAddingText()"></input>
                 </div>
                 
                 <div class=control-pan>
                 <div class="line-mod">
                 <button class="line-modf" type="button" onclick="onSaveLine()" ontouch="onSaveLine()">save</button>
                 <button class="line-modf" type="button" onclick="onNewLine()"  ontouch="onNewLine()">new line</button>
                 <button class="line-modf" type="button" onclick="onSwitch()" ontouch="onSwitch()">switch</button>
                 </div>
                 <div class="text-mod">
                 <button class="text-up" onclick="onTextUp()" ontouch="onTextUp()">🔼</button>
                 <button class="text-down" onclick="onTextDown()" ontouch="onTextDown()">🔽</button>
                 <button class="size-up" onclick="onTextBigger()" ontouch="onTextBigger()">➕</button>
                 <button class="size-down" onclick="onTextSmaller()" ontouch="onTextSmaller()">➖</button>
                 </div>
                 </div>
                 <div>
                 <a href="#" onclick="downloadCanvas(this)" download=""  class="download" ontouch="downloadCanvas(this)">  <h1 class="ml6">
                 <span class="text-wrapper">
                   <span class="letters">DOWNLOAD</span>
                 </span>
               </h1> </a>
                 
                
    `;

    const mainCont = document.querySelector('.main-container');
    const canvCont = document.querySelector('.canv-cont');
    canvCont.innerHTML = innerHTML;

    canvCont.style.display = "flex"
    mainCont.style.display = "none"

    newCanv();

    // window.addEventListener('resize', function(){
    //     // gCanvas.width = window.innerWidth;
    //     // gCanvas.height = window.innerHeight;
    //     resizeCanvas()
    // })

}




function onSaveLine() {
    
    onAddingText();
    document.querySelector('.text-input').value = "";
}

function onNewLine() {
    
    if (document.querySelector('.text-input').value !== "") {
        newLine();
        document.querySelector('.text-input').value = "";
    }
    const currLine = getCurrLine();

    document.querySelector('.input-cont').innerHTML = ` <input type="text" class="text-input" placeholder="chaging line ${currLine}"  onkeyup="onAddingText()"></input>`
}

//search

function requestedImg(imgs) {
    const mainCont = document.querySelector('.main-container');
    let innerHTML = ``;
    if (!imgs.length) {
        innerHTML += `<button onclick="init()">x</button><h2>nothing to show<h2>`
    }
    else {
        innerHTML += `<button onclick="init()">x</button>`

        for (let i = 0; i < imgs.length; i++) {
            innerHTML += `
        <img src="${imgs[i].src}" id="${imgs[i].id}" onclick="onClickImg(id)">

   `;
        }

    }

    mainCont.innerHTML = innerHTML;
}

function search() {
    let search = document.querySelector('.searchBy')
    let imgsToDis = getGallery(search.value);
    requestedImg(imgsToDis);
    search.value = ""
}

// function serchMod() {
//     const serches = bringSerches();
//     for (let i=0; i<serches.length; i++) {
//         console.log(serches[i]);
//         // if(serches[i]===)
//     }
// }

//switch

function onSwitch() {
    document.querySelector('.text-input').value = "";
    switchLine();
    const currLine = getCurrLine();

    document.querySelector('.input-cont').innerHTML = ` <input type="text" class="text-input" placeholder="chaging line ${currLine}"  onkeyup="onAddingText()"></input>`
}

//text mod.

function onTextUp() {
    textUp(gId);
}
function onTextDown() {
    textDown(gId);
}



function onTextBigger() {
    textBigger(gId);
}

function onTextSmaller() {
    textSmaller(gId);
}




// clear canvas


function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
}

// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
// }


//adding text


function onAddingText() {
    //TODO: change in service;
    addingText(gId);


}

function onMoveUp() {

}
function onMoveDown() {

}
// function onRemovingText(ev, input) {
//     //TODO: change in service;
// console.log(ev);
// if(ev.keycode === 8) {

//     let txt = input.value
//         gCtx.lineWidth = '2';
//         gCtx.strokeStyle = 'red';
//         gCtx.fillStyle = 'white';
//         gCtx.font = '40px Ariel';
//         gCtx.textAlign = 'center';
//         gCtx.fillText(txt, 200, 200);
//         gCtx.strokeText(txt, 200, 200);

// }

// }


//download 
function downloadCanvas(elLink) {
    downloadToLocal(elLink);
}



// function resizeCanvas() {
//     const elContainer = document.querySelector('.canvas-container');
//     // Note: changing the canvas dimension this way clears the canvas
//     gCanvas.width = elContainer.offsetWidth;
//     gCanvas.height = elContainer.offsetHeight;
//     addingText(gId);
// }


// exiting back to gallery


function renderGallery() {
    //are you sure? 
    let innerHTML = ``;
    innerHTML += ` <img src="imgs/2.jpg" id='1' onclick="onClickImg(id)">`;
    const mainCont = document.querySelector('.main-container');
    mainCont.innerHTML = innerHTML;

}









function animation() {
    var textWrapper = document.querySelector('.ml6 .letters');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({ loop: true })
        .add({
            targets: '.ml6 .letter',
            translateY: ["1.1em", 0],
            translateZ: 0,
            duration: 750,
            delay: (el, i) => 50 * i
        }).add({
            targets: '.ml6',
            opacity: 0,
            duration: 1000,
            easing: "easeOutExpo",
            delay: 1000
        });
}




