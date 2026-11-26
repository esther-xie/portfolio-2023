
function toCartesian(r, theta, [x, y]) {
    angleMode(DEGREES);
    p = [r * cos(theta), r * sin(theta)];
    if (x != undefined) p[0] += x;
    if (y != undefined) p[1] += y;

    return p
}

var allgrass = [];

function newAah(size, [x, y]) {
    if (x === undefined) x = 0;
    if (y === undefined) y = 0;
    if (size === undefined) size = 100;
    // let d = dist(x, y, mouseX, mouseY);
    // if (d<500){
    //     size = 500;}
    let aah = {
        length: size/2, // Expected length of each arm in pixels
        lengthSD: 0,    // Standard deviation of arm length
        thetaSD: 2,     // Standard deviation of arm angle
        arms: [],       // Array of arms
        poly: [],       // Enclosing polygon
        x: x,
        y: y,
    };

    aah.lengthSD = (0.05 + 0.05 * random()) * aah.length;

    const rotation = random(0, 45);
    for (let angle=0; angle<360; angle+=45) { //here decides the arm count
        const theta = randomGaussian(angle+rotation, aah.thetaSD);
        const r = randomGaussian(aah.length, aah.lengthSD);
        const gap = (0.05 + 0.05 * random()) * aah.length;
        let arm = {
            start: [],          // Draw line from here...
            stop: [],           // ...to here
            tipDiameter: gap,   // The tip diameter is the same as the gap for each line
        };
        arm.start = toCartesian(gap, theta, [x, y]);
        arm.stop = toCartesian(r, theta, [x, y]);
        aah.arms.push(arm);

        let vert = toCartesian(r + 5*gap, theta, [x, y]);   // Put a vertex out beyond the tip of the arm
        aah.poly.push(createVector(vert[0], vert[1]));
        vert = toCartesian(0.6*r, theta+22, [x, y]);  // Put a 2nd vertex about halfway to the next arm
        aah.poly.push(createVector(vert[0], vert[1]));
    }
    allgrass.push(aah);
    return aah;
}

function getall(){
    return allgrass;
}


function growAah(aah) {

    aah.lengthSD = (0.05 + 0.05 * random()) * aah.length;

    const rotation = random(0, 45);
    for (let angle=0; angle<360; angle+=25) { //here decides the arm count
        const theta = randomGaussian(angle+rotation, aah.thetaSD);
        const r = randomGaussian(aah.length, aah.lengthSD);
        const gap = (0.05 + 0.7 * random()) * aah.length;
        let arm = {
            start: [],          // Draw line from here...
            stop: [],           // ...to here
            tipDiameter: gap,   // The tip diameter is the same as the gap for each line
        };
        arm.start = toCartesian(gap, theta, [aah.x, aah.y]);
        arm.stop = toCartesian(r, theta, [aah.x, aah.y]);
        aah.arms.push(arm);

        let vert = toCartesian(r + 5*gap, theta, [aah.x, aah.y]);   // Put a vertex out beyond the tip of the arm
        aah.poly.push(createVector(vert[0], vert[1]));
        vert = toCartesian(0.6*r, theta+22, [aah.x, aah.y]);  // Put a 2nd vertex about halfway to the next arm
        aah.poly.push(createVector(vert[0], vert[1]));
    }
    // drawAah(aah);
    return aah;
}


function newnewAah(size, [x, y], al, an, pds, R, G, B) {
    if (x === undefined) x = 0;
    if (y === undefined) y = 0;
    size = al;

    let aah = {
        length: size/2, // Expected length of each arm in pixels
        lengthSD: 0,    // Standard deviation of arm length
        thetaSD: 2,     // Standard deviation of arm angle
        arms: [],       // Array of arms
        poly: [],       // Enclosing polygon
    };

    aah.lengthSD = (0.05 + 0.05 * random()) * aah.length;

    const rotation = random(0, 45);
    for (let angle=0; angle<360; angle+=(360/an)) { //here decides the arm count
        const theta = randomGaussian(angle+rotation, aah.thetaSD);
        const r = randomGaussian(aah.length, aah.lengthSD);
        const gap = (0.05 + 0.05 * random()) * pds;
        let arm = {
            start: [],          // Draw line from here...
            stop: [],           // ...to here
            tipDiameter: gap*5,   // The tip diameter is the same as the gap for each line
        };
        arm.start = toCartesian(gap, theta, [x, y]);
        arm.stop = toCartesian(r, theta, [x, y]);
        aah.arms.push(arm);

        let vert = toCartesian(r + 5*gap, theta, [x, y]);   // Put a vertex out beyond the tip of the arm
        aah.poly.push(createVector(vert[0], vert[1]));
        vert = toCartesian(0.6*r, theta+22, [x, y]);  // Put a 2nd vertex about halfway to the next arm
        aah.poly.push(createVector(vert[0], vert[1]));
    }

    // return aah;
    drawAah(aah, R, G, B);
}

function drawAah(aah, R, G, B) {
    fill(R, G, B);
    aah.arms.forEach(arm => {
        stroke(171, 172, 255, 200);
        line(arm.start[0], arm.start[1], arm.stop[0], arm.stop[1]);
        noStroke();
        circle(arm.stop[0], arm.stop[1], arm.tipDiameter);
    });
}

function drawAahs(n, size, box) {
    const margin = sizeAah/6;

    let polys = [];

    let drawCount = 0;
    let failCount = 0;

    while(drawCount < n) {
        const x = random(margin, box.width-margin);   // Random (x,y) for our aah, within margins
        const y = random(margin, box.height-margin);

        const sizeSD = 0.15 * size;
        const aah = newAah(randomGaussian(size, sizeSD), [x, y], drawCount);

        let conflict = false;
        for (let i=0; i<polys.length; ++i) {
            if(collidePolyPoly(aah.poly, polys[i], true)) {
                conflict = true;
                break;
            }
        }
        if(conflict) {
            ++failCount;
            if(failCount > n*3) {
                break;
            }
        } else {
            polys.push(aah.poly);
            drawAah(aah, 100, 100, 100);
            ++drawCount;
        }
    }

    return drawCount;
}
// function shouldbloom(aah){
//     let aah = aah;
//     let d = dist(aah.x, aah.y, mouseX, mouseY);
//     if (d<50){
//         return true;
//     }
// }

// function bloom(aah){
//     aah.length += 1;
//     if (aah.length >=100){
//         aah.length = 100;
//     }
//     drawAah(aah, 0, 0, 0);
// }