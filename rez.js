$(document).ready(function(){

    var JSONrez = localStorage.getItem("svi_rezultati");
    var rezultati = JSON.parse(JSONrez);

    var tabela = document.getElementById("div");
    var duzina;
    if(rezultati && rezultati.length>10) duzina=10;
    else duzina=rezultati.length;
    for (var i = 0; i < duzina; i++) {
        var rez = rezultati[i];
        var red = document.createElement("tr");
        if(i==0)  red.style.backgroundColor="goldenrod";
        else if(i==1) red.style.backgroundColor="silver";
        else if(i==2) red.style.backgroundColor="rgba(218, 85, 32, 0.582)";
        var polje1 = document.createElement("td");
        var polje2 = document.createElement("td");
        polje1.textContent = rez.ime;
        polje2.textContent = rez.rez;

        
        red.appendChild(polje1);
        red.appendChild(polje2);
        
        tabela.appendChild(red);
    }

    //document.getElementById("m").innerHTML=localStorage.getItem("ime")+" - "+localStorage.getItem("rez");
    //localStorage.removeItem("ime");
    //localStorage.removeItem("rez");

    var row = document.createElement("tr");
    var nameCell = document.createElement("td");
    var scoreCell = document.createElement("td");
    nameCell.textContent = localStorage.getItem("ime");
    scoreCell.textContent = localStorage.getItem("rez");
    console.log(localStorage.getItem("ime"));
    console.log(localStorage.getItem("rez"));
    nameCell.style.border="3px solid #000";
    scoreCell.style.border="3px solid #000";
    // Append the cells to the row
    row.appendChild(nameCell);
    row.appendChild(scoreCell);
    
    tabela.appendChild(row);

})