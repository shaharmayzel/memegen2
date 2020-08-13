let gSelectedImgId;
let gMeme;
let gCurrLine = 1;
// let gSearch;
let gPictures;
const KEY = 'srchs';



//img data
const gImgs = [{
    id: 1,
    src: 'imgs/1.jpg',
    cat: 'funny'
},
{
    id: 2,
    src: 'imgs/2.jpg',
    cat: 'cute'
},
{
    id: 3,
    src: 'imgs/3.jpg',
    cat: 'cute'
},
{
    id: 4,
    src: 'imgs/4.jpg',
    cat: 'cute'
},
{
    id: 5,
    src: 'imgs/5.jpg',
    cat: 'weird'
},
{
    id: 6,
    src: 'imgs/6.jpg',
    cat: 'funny'
}

] 
//search
function getGallery(search) {
    loadFromStorage(KEY);
    let imgsToDis = []
   for(let i=0; i<gImgs.length; i++) {
        if (gImgs[i].cat === search) {
            imgsToDis.push(gImgs[i])
        }
    }
//    _saveUserSrches(search)
   return imgsToDis;

}

// function _saveUserSrches(searches) {
//     saveToStorage(KEY, searches)
    
// }

// function bringSerches() {
//     const srchs = loadFromStorage(KEY);
//     if (!srchs) return;
//     return srchs;
// }
//global imgs
//TODO; make a smaller database
//when ad imgs change to let



//uppdate chosen id
function uppdateCurrImg(imgId) {
    gSelectedImgId = imgId;
}




//newline

function newLine() {
  
    gMeme.numOfLines++;
    gCurrLine = gMeme.numOfLines;
    let x;
    let y;
    if (gCurrLine === 1) {
        x = gCanvas.width / 2
        y = gCanvas.height / 6
    }

    if (gCurrLine === 2) {
        x = gCanvas.width / 2
        y = (gCanvas.height / 6) * 5
    }
    else {
        x = gCanvas.width / 2
        y = gCanvas.height / 2

    }

    gMeme.lines.push({})
    gMeme.lines[gCurrLine - 1].x = x;
    gMeme.lines[gCurrLine - 1].y = y;
    gMeme.lines[gCurrLine - 1].size = gCanvas.width / 12;

}

//switch line

function switchLine() {
    if (gCurrLine < gMeme.numOfLines) {
        gCurrLine++;
    }
    else if (gCurrLine === gMeme.numOfLines) {
        gCurrLine = 1;
    }

}





//updatelinehight 

function textUp(id) {

    gMeme.lines[gCurrLine - 1].y -= gCanvas.width / 70
    addingText(id);

}
function textDown(id) {

    gMeme.lines[gCurrLine - 1].y += gCanvas.width / 70
    addingText(id);

}

function textBigger(id) {
    gMeme.lines[gCurrLine - 1].size += gCanvas.width / 70
    addingText(id);
}
function textSmaller(id) {
    gMeme.lines[gCurrLine - 1].size -= gCanvas.width / 70
    addingText(id);
}





//global curent meme

function createMeme() {

    gMeme = {
        selectedImgId: gSelectedImgId,
        selectedLineIdx: 0,
        numOfLines: 1,
        lines: [{
            txt: '',
            x: gCanvas.width / 2,
            y: gCanvas.width / 6,
            size: gCanvas.width / 12
            // size: 20,
            // align: 'left',
            // color: 'red'
        }]
    }

    drawImg()
}

//new canv
function newCanv() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');
}


//img
function drawImg(id) {


    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = getSrcById(id);

}





//text

function addingText(id) {
    const input = document.querySelector('.text-input')
    textChange(input.value, gCurrLine);
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);


    var img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);

        gCtx.strokeStyle = 'black';
        gCtx.fillStyle = 'white';
        gCtx.textBaseline = 'middle';
        gCtx.textAlign = 'center';
        for (let i = 0; i < gMeme.lines.length; i++) {
            gCtx.font = `${gMeme.lines[i].size}px 'impact'`;
            const txt = getText(i);
            let x = gMeme.lines[i].x
            let y = gMeme.lines[i].y
            gCtx.fillText(txt, x, y);
        }
    }
    img.src = getSrcById(id);




}


function textChange(text, currLine) {
    gMeme.lines[currLine - 1].txt = text;
    gMeme.lines[currLine - 1].txt = text;
    console.log(gMeme);
}

function getText(currLine) {
    return gMeme.lines[currLine].txt;
}


//geting data

function getSrcById(id) {
    var imgId = parseFloat(id)
    let src;
    for (var i = 0; i < gImgs.length; i++) {
        if (gImgs[i].id === imgId) {
            src = gImgs[i].src
        }
    }
    return src
}

function getCurrLine() {
    return gCurrLine;
}


//downoad
function downloadToLocal(elLink) {
    const data = gCanvas.toDataURL();
    /// show base64 string
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}