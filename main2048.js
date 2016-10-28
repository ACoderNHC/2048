/**
 * Created by hc on 2016/10/21.
 */
var board = new Array();
var score = 0;
var hasConflicted = new Array();

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;

$(document).ready(function() {
    prepareForMobile();
    newgame();
});

document.addEventListener("touchstart", function(event) {
    startX = event.touches[0].pageX;
    startY = event.touches[0].pageY;

});


document.addEventListener("touchend", function(event) {
    endX = event.changedTouches[0].pageX;
    endY = event.changedTouches[0].pageY;

    var deltaX = endX - startX;
    var deltaY = endY - startY;

    if( (Math.abs( deltaX ) < 0.3*documentWidth) && (Math.abs( deltaY ) < 0.3*documentWidth) )
        return;

    if ( Math.abs(deltaX) >= Math.abs(deltaY) ) {
        // x 轴
        if ( deltaX > 0 ) {
            // move right
            if( moveRight() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        } else {
            // move left
            if( moveLeft() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }
    }
    else {
        // y 轴
        if ( deltaY > 0 ) {
            // move down
            if( moveDown() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        } else {
            // move up
            if( moveUp() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
        }

    }

});

function prepareForMobile() {

    if (documentWidth > 500) {
        gridWidth = 500;
        cellWidth = 100;
        cellMargain = 20;
    }

    $("#grid-container").css("width",gridWidth - 2 * cellMargain);
    $("#grid-container").css("height",gridWidth - 2 * cellMargain);
    $("#grid-container").css("padding",cellMargain);
    $("#grid-container").css("border-radius",0.02 * gridWidth);

    $(".grid-cell").css("width",cellWidth);
    $(".grid-cell").css("height",cellWidth);
    $(".grid-cell").css("border-radius",0.02 * cellWidth );
}

function newgame(){
    // 初始化棋盘
    init();
    // 随机生成两个数字
    generateOneNumber();
    generateOneNumber();

}

function init() {
    for(var i=0; i<4; i++ ) {
         for (var j = 0; j < 4; j++) {
             var gridCell = $("#grid-cell-" + i + "-" + j);
             gridCell.css('top', getPosTop(i, j));
             gridCell.css('left', getPosLeft(i, j));
         }
     }

    for(var i=0; i<4; i++) {
        board[i] = new Array();
        hasConflicted[i] = new Array();
        for(var j=0; j<4; j++)
            board[i][j] = 0;
            hasConflicted[i][j] = false;
    }

    score = 0;

    updateForView();
}

function updateForView() {
    $(".number-cell").remove();
    for(var i=0; i<4; i++)
        for(var  j=0; j<4; j++) {
            $("#grid-container").append('<div class="number-cell" id="number-cell-'+i+'-'+j+'"></div>');
            var  theNumberCell = $("#number-cell-"+i+"-"+j);
            if(board[i][j] == 0) {
                theNumberCell.css('width','0px');
                theNumberCell.css('height','0px');
                theNumberCell.css('top',getPosTop(i,j) + cellWidth / 2 );
                theNumberCell.css('left',getPosLeft(i,j) + cellWidth / 2 );
            }
            else {
                theNumberCell.css('width', cellWidth );
                theNumberCell.css('height', cellWidth );
                theNumberCell.css('top',getPosTop(i,j));
                theNumberCell.css('left',getPosLeft(i,j));
                theNumberCell.css('background-color',getNumberCellBackgroundColor(board[i][j]));
                theNumberCell.css('color',getNumberColor(board[i][j]));
                theNumberCell.text(board[i][j]);
            }

            hasConflicted[i][j] = false;
        }

    $(".number-cell").css("line-height", cellWidth + "px" );
    $(".number-cell").css("font-size", 0.6 *  cellWidth + "px" );
}


function  generateOneNumber() {
    if (nospace(board)) {
        return false;
    }

    // 随机一个位置
    var randomX = parseInt(Math.floor(Math.random() * 4));
    var randomY = parseInt(Math.floor(Math.random() * 4));

    var times = 0;
    while(times < 50) {
        if (board[randomX][randomY] == 0) {
            break;
        }
        randomX = parseInt(Math.floor(Math.random() * 4));
        randomY = parseInt(Math.floor(Math.random() * 4));

        times++;
    }

    if (times == 50) {
        // 人工赋值
        for ( var i = 0; i < 4; i++)
            for ( var j = 0; j < 4; j++ )
                if ( board[i][j] == 0 ) {
                    randomX = i;
                    randomY = j;
                }
    }

    // 随机一个数字
    var randomNum = Math.random() < 0.5 ? 2 : 4;

    // 在随机位置插入一个随机数字
    board[randomX][randomY] = randomNum;

    //  动画效果
    showNumWithAnimation(randomX,randomY,randomNum);

    return true;

}

$(document).keydown( function(event) {
    switch (event.keyCode) {
        case  37: // left
            event.preventDefault();
            if( moveLeft() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case  38: // up
            event.preventDefault();
            if( moveUp() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case  39: // right
            event.preventDefault();
            if( moveRight() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        case  40: // down
            event.preventDefault();
            if( moveDown() ) {
                setTimeout("generateOneNumber()",210);
                setTimeout("isGameOver()",300);
            }
            break;
        default: // default
            break;

    }
});

function moveLeft() {
    if ( !canMoveLeft(board) )
        return false;

    for( var i=0; i<4; i++ ) {
        for( var j = 1; j < 4; j++ ) {
            if( board[i][j] != 0 ) {
                for(var k=0; k<j; k++) {
                    if( board[i][k] == 0 && noBlockHorizontal(i,k,j,board) ) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i,k,j,board) && !hasConflicted[i][k] ) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        updateScore();
                        continue;
                    }
                }}
        }
    }
    setTimeout('updateForView()',200);
    return true;

}

function moveRight() {
    if ( !canMoveRight(board) )
        return false;

    for( var i=0; i<4; i++ ) {
        for( var j = 2; j >= 0; j-- ) {
            if( board[i][j] != 0 ) {
                for(var k = 3; k > j; k-- ) {
                    if( board[i][k] == 0 && noBlockHorizontal(i,j,k,board) ) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[i][k] == board[i][j] && noBlockHorizontal(i,j,k,board) && !hasConflicted[i][k] ) {
                        showMoveAnimation(i,j,i,k);
                        board[i][k] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[i][k] = true;
                        score += board[i][k];
                        updateScore();
                        continue;
                    }
                }}
        }
    }
    setTimeout('updateForView()',200);
    return true;

}


function moveUp() {
    if ( !canMoveUp(board) )
        return false;

    for( var j = 0; j < 4; j++ ) {
        for( var i = 1; i < 4; i++ ) {
            if( board[i][j] != 0 ) {
                for(var k=0; k<i; k++) {
                    if( board[k][j] == 0 && noBlockVertical(j,k,i,board) ) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical(j,k,i,board) && !hasConflicted[k][j] ) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore();
                        continue;
                    }
                }}
        }
    }
    setTimeout('updateForView()',200);
    return true;

}


function moveDown() {
    if ( !canMoveDown(board) )
        return false;

    for( var j = 0; j < 4; j++ ) {
        for( var i = 3; i >= 0; i-- ) {
            if( board[i][j] != 0 ) {
                for(var k = 3; k > i; k-- ) {
                    if( board[k][j] == 0 && noBlockVertical(j,i,k,board) ) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] = board[i][j];
                        board[i][j] = 0;
                        continue;
                    }
                    else if( board[k][j] == board[i][j] && noBlockVertical(j,i,k,board) && !hasConflicted[k][j] ) {
                        showMoveAnimation(i,j,k,j);
                        board[k][j] += board[i][j];
                        board[i][j] = 0;
                        hasConflicted[k][j] = true;
                        score += board[k][j];
                        updateScore();
                        continue;
                    }
                }
            }
        }
    }
    setTimeout('updateForView()',200);
    return true;

}

function isGameOver() {
    if ( nospace(board) && nomove(board) ) {
        alert("游戏已结束!");
        newgame();
    }
}