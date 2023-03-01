var puntoA = {
    x: 4,
    y: 8
    }

var puntoB = {
    x: 7,
    y: 9
}

var vector = {
    x: 0,
    y: 0
}

function calculaVector(pi,pf) {
    vector.x = pf.x - pi.x;
    vector.y = pf.y - pi.y;  
    
    console.log(vector.x+","+vector.y);
}

calculaVector(puntoA,puntoB);


