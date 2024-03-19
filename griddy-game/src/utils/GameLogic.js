export function createGridArray(gridNo, greenSquareNo){
    let arrayLength = gridNo * gridNo;
    let gridArray = Array(arrayLength).fill(0);
    console.log(gridArray);
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
    console.log(gridArray);
    return gridArray;
}