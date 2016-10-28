/**
 * Created by hc on 2016/10/21.
 */

documentWidth = window.screen.availWidth;
gridWidth = 0.92 * documentWidth;
cellWidth = 0.18 * documentWidth;
cellMargain = 0.04 * documentWidth;

function  getPosTop(i,j) {
    return cellMargain + i * ( cellMargain + cellWidth );
}

function  getPosLeft(i,j) {
    return cellMargain + j * ( cellMargain + cellWidth );
}

function getNumberCellBackgroundColor( number ){
    switch( number ){
        case 2:return "#eee4da";break;
        case 4:return "#ede0c8";break;
        case 8:return "#f2b179";break;
        case 16:return "#f59563";break;
        case 32:return "#f67c5f";break;
        case 64:return "#f65e3b";break;
        case 128:return "#edcf72";break;
        case 256:return "#edcc61";break;
        case 512:return "#9c0";break;
        case 1024:return "#33b5e5";break;
        case 2048:return "#09c";break;
        case 4096:return "#a6c";break;
        case 8192:return "#93c";break;
    }

    return "black";
}

function getNumberColor( number ){
    if( number <= 4 )
        return "#776e65";

    return "white";
}


function nospace( border ) {
    for(var i=0; i<4; i++ ) {
        for (var j = 0; j < 4; j++) {
            if(border[i][j] == 0) {
                return false;
            }
        }
    }
    return true ;
}

function canMoveLeft( border ) {
    for(var i=0; i<4; i++ ) {
        for (var j = 1; j < 4; j++) {
            if(border[i][j] != 0) {
                if(border[i][j-1] == 0 || border[i][j-1] == border[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveRight( border ) {
    for( var i=0; i<4; i++ ) {
        for( var j = 2; j >= 0; j-- ) {
            if( border[i][j] != 0 ) {
                if(border[i][j+1] == 0 || border[i][j+1] == border[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}


function canMoveUp( border ) {
    for( var j=0; j<4; j++ ) {
        for( var i = 1; i < 4; i++ ) {
            if( border[i][j] != 0 ) {
                if(border[i-1][j] == 0 || border[i-1][j] == border[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function canMoveDown( border ) {
    for( var j=0; j<4; j++ ) {
        for( var i = 2; i >= 0; i-- ) {
            if( border[i][j] != 0 ) {
                if(border[i+1][j] == 0 || border[i+1][j] == border[i][j]) {
                    return true;
                }
            }
        }
    }
    return false;
}

function noBlockHorizontal(row,col1,col2,boarder) {
    for(var i=col1+1; i<col2; i++)
        if (boarder[row][i] != 0)
            return false;
    return true;
}

function noBlockVertical(col,row1,row2,boarder) {
    for(var i=row1+1; i<row2; i++)
        if (boarder[i][col] != 0)
            return false;
    return true;
}

function nomove( board ){
    if( canMoveLeft( board ) ||
        canMoveRight( board ) ||
        canMoveUp( board ) ||
        canMoveDown( board ) )
        return false;

    return true;
}
