export function createGridArray(gridNo, greenSquareNo){
    let arrayLength = gridNo * gridNo;
    let gridArray = Array(arrayLength).fill(0);
    let randomGreenSquares = [];

    if(arrayLength < greenSquareNo){
        console.error("ERROR: Number of green squares cannot be more than number of grids!");
        return null;
    }

    for(let i = 0; i < greenSquareNo; i++){
        // check so that there are no duplicates
        while(true){
            let randomNum = Math.floor(Math.random() * arrayLength);
            if(!randomGreenSquares.includes(randomNum)){
                randomGreenSquares.push(randomNum);
                break;
            }
        }
        
    }
    
    console.log(randomGreenSquares);
    for(let i = 0; i < greenSquareNo; i++){
        gridArray[randomGreenSquares[i]] = 1;
    }
    return gridArray;
}

// return gridNo, greenSquareNo, and divGridStyle based on current level
export function switchCurrentLevel(currentLevel){
    let gridNo = 0;
    let greenSquareNo = 0;

    switch(currentLevel){
        case(1):
            console.log('in level 1');
            gridNo = 3;
            greenSquareNo = 3;
            break;

        case(2):
            console.log('in level 2');
            gridNo = 3;
            greenSquareNo = 4;
            break;
        
        case(3):
            console.log('in level 3');
            gridNo = 4;
            greenSquareNo = 4;
            break;

        case(4):
            console.log('in level 4');
            gridNo = 4;
            greenSquareNo = 5;
            break;

        case(5):
            console.log('in level 5');
            gridNo = 4;
            greenSquareNo = 6;
            break;

        case(6):
            console.log('in level 6');
            gridNo = 5;
            greenSquareNo = 5;
            break;

        case(7):
            console.log('in level 7');
            gridNo = 5;
            greenSquareNo = 6;
            break;

        case(8):
            console.log('in level 8');
            gridNo = 5;
            greenSquareNo = 7;
            break;
        
        case(9):
            console.log('in level 9');
            gridNo = 6;
            greenSquareNo = 6;
            break;

        case(10):
            console.log('in level 10');
            gridNo = 7;
            greenSquareNo = 7;
            break;

        default:
            console.error("ERROR: Corresponding level " + currentLevel + " not defined!");;
            break;
    }

    return [gridNo, greenSquareNo];
}