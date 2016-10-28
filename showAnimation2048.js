/**
 * Created by hc on 2016/10/21.
 */

function showNumWithAnimation (i, j, randomNum) {
    var numCell = $("#number-cell-"+i+"-"+j);
    numCell.css('background-color',getNumberCellBackgroundColor(randomNum));
    numCell.css('color',getNumberColor(randomNum));
    numCell.text(randomNum);

    numCell.animate({
        width: cellWidth,
        height: cellWidth,
        top: getPosTop(i,j),
        left: getPosLeft(i,j)
    },50)

}

function showMoveAnimation(fromX,fromY,toX,toY) {
    var numCell = $("#number-cell-"+fromX+"-"+fromY);
    numCell.animate({
        top:getPosTop(toX,toY),
        left:getPosLeft(toX,toY)
    },200)
}


function updateScore() {
    $("#score").text(score);
}