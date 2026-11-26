
function toCartesian(r, theta, [x, y]) {
    angleMode(DEGREES);
    p = [r * cos(theta), r * sin(theta)];
    if (x != undefined) p[0] += x;
    if (y != undefined) p[1] += y;

    return p
}

function newAah(size, [x, y]) {
    if (x === undefined) x = 0;
    if (y === undefined) y = 0;
    if (size === undefined) size = 100;

    let aah = {
        length: size/2, // Expected length of each arm in pixels
        lengthSD: 0,    // Standard deviation of arm length
        thetaSD: 2,     // Standard deviation of arm angle
        arms: [],       // Array of arms
        poly: [],       // Enclosing polygon
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
    stroke(R, G, B, 100);
    aah.arms.forEach(arm => {
        line(arm.start[0], arm.start[1], arm.stop[0], arm.stop[1]);
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
        const aah = newAah(randomGaussian(size, sizeSD), [x, y]);

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
            drawAah(aah);
            ++drawCount;
        }
    }

    return drawCount;
}