let matrixLvl = 'first';
let yourRecord3x3 = '-';
let yourRecord4x4 = '-';
let yourRecord5x5 = '-';

// генерация таблицы и игра
let playArray = new Array();
let rndArray = new Array();
function genereteArray(arr, maxNum){
    for(let i = 1; i < maxNum+1;i++){
        arr.push(i);
    }
}

function generate(generateMaxNum){
    genereteArray(rndArray, generateMaxNum);
    document.querySelectorAll('.mainButton').forEach((element)=>{
        let rnd = Math.floor(Math.random() * (rndArray.length));
        element.innerHTML = rndArray[rnd];
        rndArray.splice(rnd,1);
        element.style.removeProperty('background');
        element.style.removeProperty('boxShadow');

        element.addEventListener('click',()=>{
            if(element.innerHTML == playArray[0]){
                element.innerHTML = '';
                element.style.background = 'none';
                element.style.boxShadow = 'none';
                playArray.shift();
                if(playArray.length == 0){
                    endGame();
                }
            }
        })
    })
}


let timeOn;
function switchOnTimer() {
    let ms = 0, s = 0, m = 0, time;
    timeOn = setInterval(() => {
        ms++;
        if(ms>9){
            ms=0;
            s++;
        }
        if(s>60){
            s=0;
            m++;
        }
        if(m != 0){
            time = m + '.' + addZero(s) + '.' + ms;
        }else{
            time = s + '.' + ms;
        }
        document.querySelector('.lastTime').innerHTML = time;
    }, 100);
}
function switchOffTimer() {
    clearInterval(timeOn);
}


function addZero(n){
    if(n<10){
        return '0' + n;
    }else{
        return n;
    }
}

function clearMatrix(){
    document.querySelectorAll('.mainButton').forEach((elem)=>{
        elem.innerHTML = '';
    })
}
function endGame(){
    fetch('lvls/'+matrixLvl+'Lvl.html').then(
        Response =>{
            return Response.text();
        }
    ).then(
        text =>{
            document.querySelector('.btnsDiv').innerHTML = text;
        }
    ).then(
        result =>{
            if(matrixLvl == 'first'){
                if(yourRecord3x3 == '-'){
                    yourRecord3x3 = parseFloat(document.querySelector('.lastTime').innerHTML);
                }else{
                    yourRecord3x3 = yourRecord3x3<document.querySelector('.lastTime').innerHTML ? yourRecord3x3 : parseFloat(document.querySelector('.lastTime').innerHTML);
                }
                saveRecord(yourRecord3x3,'first');
            }else if(matrixLvl == 'second'){
                if(yourRecord4x4 == '-'){
                    yourRecord4x4 = parseFloat(document.querySelector('.lastTime').innerHTML);
                }else{
                    yourRecord4x4 = yourRecord4x4<document.querySelector('.lastTime').innerHTML? yourRecord4x4 : parseFloat(document.querySelector('.lastTime').innerHTML);
                }
                saveRecord(yourRecord4x4,'second');
            }else if(matrixLvl == 'third'){
                if(yourRecord5x5 == '-'){
                    yourRecord5x5 = parseFloat(document.querySelector('.lastTime').innerHTML);
                }else{
                    yourRecord5x5 = yourRecord5x5<document.querySelector('.lastTime').innerHTML? yourRecord5x5 : parseFloat(document.querySelector('.lastTime').innerHTML);
                }
                saveRecord(yourRecord5x5,'third');
            }
            
        }
    )
    generate();
    clearMatrix();
    switchOffTimer();
    document.querySelector('.lastTime').style.color = '#ff0000';
    playOn = false;
    document.querySelector('.startBtn').innerHTML = 'Начать';
}


function startedTimer(startedNumber){
    document.querySelector('.startedTimerDiv').style.display = 'flex'; 
    document.querySelector('.startedTimerDiv').innerHTML = startedNumber;
    document.querySelector('.startedTimerDiv').style.transition = 'all 1s';
    setTimeout(()=>{
        document.querySelector('.startedTimerDiv').style.transform = 'translate(-50%,-50%) scale(0.5)';
    }, 10);
    setTimeout(()=>{
        document.querySelector('.startedTimerDiv').style.transition = 'none';
    },1010)
    setTimeout(()=>{
        document.querySelector('.startedTimerDiv').style.transform = 'translate(-50%,-50%) scale(1)';
    },1020)
    setTimeout(()=>{
        if(startedNumber > 1){
            startedNumber--;
            startedTimer(startedNumber);
        }else{   
            document.querySelector('.startedTimerDiv').style.display = 'none';   
        }
    },1050)
}

//бинды кнопок
let playOn = false;
document.querySelector('.startBtn').addEventListener('click', ()=>{
    if(document.querySelectorAll('.mainButton').length > 0){
        playOn = !playOn;
    }
    if(playOn){
        document.querySelector('.startBtn').innerHTML = 'Стоп';
        document.querySelector('.lastTime').style.color = '#fff';
        document.querySelector('.lastTime').innerHTML = '-';
        startedTimer(3);
        setTimeout(()=>{
            generate(document.querySelectorAll('.mainButton').length);
            playArray = [];
            genereteArray(playArray, document.querySelectorAll('.mainButton').length);
            switchOnTimer();
        },3300)
    }else{
        document.querySelector('.startBtn').innerHTML = 'Начать';
        switchOffTimer();
        clearMatrix();
        document.querySelector('.lastTime').innerHTML = '-'
    }
});

document.querySelector('.resetBtn').addEventListener('click',()=>{
    if(document.querySelectorAll('.mainButton').length > 0){
        clearMatrix();
        switchOffTimer();
        document.querySelector('.lastTime').style.color = '#fff';
        document.querySelector('.lastTime').innerHTML = '-';
        playOn = true;
        document.querySelector('.startBtn').innerHTML = 'Стоп';
        startedTimer(3);
        setTimeout(()=>{
            generate(document.querySelectorAll('.mainButton').length);
            playArray = [];
            genereteArray(playArray, document.querySelectorAll('.mainButton').length);
            switchOnTimer();
        },3300)
    }
})

// кнопки старта/ресета/уровня
document.querySelector('.nextBtn').addEventListener('mouseenter', ()=>{
    document.querySelector('.nextBtn').style.display = 'none';
    document.querySelector('.nextBtnHovered').style.display = 'flex';
});
document.querySelector('.nextBtnHovered').addEventListener('mouseleave', ()=>{
    document.querySelector('.nextBtn').style.display = 'flex';
    document.querySelector('.nextBtnHovered').style.display = 'none';
});

document.querySelectorAll('.lvlBtn').forEach((elem)=>{
    elem.addEventListener('click', ()=>{
        if(matrixLvl != elem.dataset.lvl || document.querySelector('.menuDiv')){
            matrixLvl = elem.dataset.lvl;
            switchOffTimer();
            checkMenu(false);
        }
        document.querySelector('.lastTime').style.color = '#fff';
        document.querySelector('.lastTime').innerHTML = '-';
        document.querySelector('.startBtn').innerHTML = 'Начать';
    })
})

// движение меню
fetch('./components/menu.php').then(
    Response =>{
        return Response.text();
    }
).then(
    text =>{
        document.querySelector('.btnsDiv').innerHTML = text;
    }
)
function goMenuTo(turn, src){
    if(turn == 'right'){
        document.querySelector('.btnsDiv').children[1].style.transform = 'translateX(100%)';
    }else{
        document.querySelector('.btnsDiv').children[1].style.transform = 'translateX(-100%)';
    }
    setTimeout(()=>{
        document.querySelector('.btnsDiv').innerHTML = '';
        fetch(src).then(
            Response =>{
                return Response.text();
            }
        ).then(
            text =>{
                document.querySelector('.btnsDiv').innerHTML = text;
                if(turn == 'right'){
                    document.querySelector('.btnsDiv').children[1].style.transform = 'translateX(-100%)';
                }else{
                    document.querySelector('.btnsDiv').children[1].style.transform = 'translateX(100%)';
                }
                setTimeout(()=>{
                    goMenuFrom();
                    
                    if(src == './components/menu.php'){
                        document.querySelector('.yourRecord3x3').innerHTML = yourRecord3x3.toString();
                        document.querySelector('.yourRecord4x4').innerHTML = yourRecord4x4.toString();
                        document.querySelector('.yourRecord5x5').innerHTML = yourRecord5x5.toString();
                    }
                },10)
            }
        )
    },1000)
}
function goMenuFrom(){
    document.querySelector('.btnsDiv').children[1].style.transform = 'none';
}



let homeMenuActive = true;
function checkMenu(toHome){
    if(homeMenuActive){
        goMenuTo('left','lvls/'+matrixLvl+'Lvl.html');
        homeMenuActive = false;
    }else{
        if(toHome){
            goMenuTo('right','./components/menu.php');
            homeMenuActive = true;
        }else{
            goMenuTo('left','lvls/'+matrixLvl+'Lvl.html');
            homeMenuActive = false;
        }
    }
}
document.querySelector('.homeIcon').addEventListener('click',()=>{
    checkMenu(true);
})

// сохранение рекордов

function saveRecord(record, lvl) {

    let params = new URLSearchParams();
    params.set('record',record);
    params.set('lvl','none');
    if(lvl == 'first'){
        params.set('lvl','3x3');
    }else if(lvl == 'second'){
        params.set('lvl','4x4');
    }else if(lvl == 'third'){
        params.set('lvl','5x5');
    }
    console.log(params.toString());

    fetch('./safeRecs.php', {
            method: 'POST',
            body: params,
        })
        .then(response => {
            return response.text();
        })
        .then(text => {
            console.log('Данные ' + record + ' and lvl : '+ lvl + ' записаны на сервер');
        });
}
// document.querySelector('.take').addEventListener('click', ()=>{
//     console.log('log');
    
//     fetch('dir/massge.txt').then(
//         Response =>{
//             return Response.text();
//         }
//     ).then(
//         text => {
//             s = String(text);
//             document.querySelector('.txt').innerHTML = text.slice(7,11);
            
//         }
//     )
// })