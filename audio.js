const sound1 = new Audio("./sounds/boom.wav");
const sound2 = new Audio("./sounds/clap.wav");
const sound3 = new Audio("./sounds/hihat.wav");
const sound4 = new Audio("./sounds/kick.wav");
const sound5 = new Audio("./sounds/ride.wav");
const sound6 = new Audio("./sounds/snare.wav");
const sound7 = new Audio("./sounds/tink.wav");
const sound8 = new Audio("./sounds/tom.wav");

function playSounds(states) {
    
    let sounds = [];
    states.forEach(state => {
        switch(state) {
            case 1:
                sounds.push(sound1);
            case 2:
                sounds.push(sound2);
            case 3:
                sounds.push(sound3);
            case 4:
                sounds.push(sound4);
            case 5:
                sounds.push(sound5);
            case 6:
                sounds.push(sound6);
            case 7:
                sounds.push(sound7);
            case 8:
                sounds.push(sound8);
                
        }
    })

    // cells.forEach((rowArr, row) => {
    //     rowArr.forEach((colVal, col) => {
    //         switch(col) {
    //             case 1:
    //                 sounds.push(sound1);
    //             case 2:
    //                 sounds.push(sound2);
    //             case 3:
    //                 sounds.push(sound3);
    //             case 4:
    //                 sounds.push(sound4);
    //             case 5:
    //                 sounds.push(sound5);
    //             case 6:
    //                 sounds.push(sound6);
    //             case 7:
    //                 sounds.push(sound7);
    //             case 8:
    //                 sounds.push(sound8);
    //         }
            
    //     });
    // });

    sounds.forEach(sound => {
        sound.play();
    })
}