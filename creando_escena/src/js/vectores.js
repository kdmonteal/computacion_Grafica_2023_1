function calculateComponentVector(other,me,nameDraw) {
    /*var puntoA = {
        x: document.getElementById("puntoAX").value,
        y: document.getElementById("puntoAY").value,
        z: document.getElementById("puntoAZ").value
        }
    var puntoB = {
        x: document.getElementById("puntoBX").value,
        y: document.getElementById("puntoBY").value,
        z: document.getElementById("puntoBZ").value
    }*/
    calculaVector(document.getElementById(other).value,me.value,nameDraw);

}

function calculaVector(pi,pf,vr) {

    document.getElementById(vr).value = pf-pi;
    
    /*componenteX = pf.x - pi.x;
    componenteY = pf.y - pi.y;  
    componenteZ = pf.z - pi.z;

    console.log(vector.x+","+vector.y+" , "+vector.z);*/


}



