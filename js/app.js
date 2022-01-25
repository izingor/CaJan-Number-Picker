'use strict';

var gNums;
var clickCount;
var gameDiff;
var interval;

function init() {
    document.querySelector('.btn').classList.add('hide');
    document.querySelector('.msg').innerText = '';
    while (Math.sqrt(gameDiff) % 1 !== 0) {
        var gameDiff = +prompt('Enter number of cells for the game');
    }
    clickCount = 1;
    createNums(gameDiff);
    renderBoard(gNums);
    timer(gameDiff);

}

function timer(gameDiff) {
    var timestamp = Date.now();
    var elTimer = document.querySelector('.timer');
    var interval = setInterval(function () {
        var elTitle = document.querySelector('.msg');
        var delta = Date.now() - timestamp;

        elTimer.innerText = delta / 1000;
        if (clickCount === gameDiff + 1) {
            clearInterval(interval);
            elTitle.innerText = 'VICTORY';
            document.querySelector('.btn').classList.remove('hide');
            document.querySelector('.btn').innerText = 'Try again!';
        }
    }, 20);

}



function cellClick(ev) {
    var str = clickCount.toString();
    var num = ev.innerText;
    if (num === str) {
        ev.classList.add('clicked');
        clickCount++;
    }

}

function renderBoard(nums) {
    var elTable = document.querySelector('.board');
    var strHtml = '';
    var length = Math.sqrt(nums.length);
    for (var i = 0; i < length; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < length; j++) {
            strHtml += `<td onclick="cellClick(this)">${nums.pop()}</td>`;
        }
        strHtml += '</tr>';
    }
    elTable.innerHTML = strHtml;
}

function createNums(boardSize) {
    gNums = [];
    for (var i = 1; i <= boardSize; i++) {
        gNums.push(i);
    }
    gNums = shuffleArray(gNums);

}

function shuffleArray(nums) {
    for (var i = nums.length - 1; i > 0; i--) {
        var random = Math.floor(Math.random() * (i + 1));
        var temp = nums[i];
        nums[i] = nums[random];
        nums[random] = temp;
    }
    return nums;
}