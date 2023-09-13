var zmija;
var superhrana;
var jedinica=25;
var rezultat=0;
var br_jedinica;
var nivo,tabla;
//zmija pocetak
var zmijaX;
var zmijaY;
var vreme;
//hrana
var hranaX, hranaY,superhranaX,superhranaY;
var interval,interval2;
//niz divova od kojih svaki predstavlja clanak zmije
var zmija_divovi=[];
var rezultati = [];
var korisnik;
var hrana;

$(document).ready(function(){

    var gameSound = document.getElementById("gameSound");
    var gameOver=document.getElementById("gameOver");

    zmijaX= jedinica*4;
    zmijaY= jedinica*4;
    nivo=parseInt(localStorage.getItem('nivo'));
    velicina_table=parseInt(localStorage.getItem('tabla'));
    console.log(zmijaX);
    console.log(zmijaY);


    if(velicina_table==20){
        $("#tabla20").show();
        br_jedinica=8;
        zmija=document.getElementById("zmija1");
        hrana=document.getElementById("hrana1");
        tabla=document.getElementById("tabla20");
        superhrana=document.getElementById("superhrana1");
    }
    else if(velicina_table==50){
        $("#tabla50").show();
        br_jedinica=16;
        zmija=document.getElementById("zmija2");
        hrana=document.getElementById("hrana2");
        tabla=document.getElementById("tabla50");
        superhrana=document.getElementById("superhrana2");
    }
    else{
        $("#tabla100").show();
        br_jedinica=24;
        zmija=document.getElementById("zmija3");
        hrana=document.getElementById("hrana3");
        tabla=document.getElementById("tabla100");
        superhrana=document.getElementById("superhrana3");
    }
    //brzina zmijice u zavisnosti od izabranog niova
    if(nivo==1) vreme=400;
    else if(nivo==2) vreme=250;
    else vreme=100;

    zmija.style.backgroundImage="url('zmijica-dodatno/slike/slik.png')";
    zmija.style.backgroundColor="rgb(76, 182, 76)";
    zmija.style.borderRadius="50%";
    zmija.style.backgroundSize="cover";

    hrana_koord();
    //superhrana();
    //interval2=setInterval(superhrana, 10000);
    postavi();
    postavi_superhrana();
    
    interval2=setInterval(postavi_superhrana, 10000);
    console.log(hranaX);
    console.log(hranaY);
    document.addEventListener('keydown', pomeraj);
    interval=setInterval(postavi, vreme);
    
})

var poXosi=0;
var poYosi=0;

function postavi_superhrana(){
    superhranaX=Math.floor(Math.random()*br_jedinica)*jedinica;
    superhranaY=Math.floor(Math.random()*br_jedinica)*jedinica;
    if(superhranaX==zmijaX && superhranaY==zmijaY || superhranaX==hranaX || superhranaY==hranaY){
        superhranaX=Math.floor(Math.random()*br_jedinica)*jedinica;
        superhranaY=Math.floor(Math.random()*br_jedinica)*jedinica;
    }
    superhrana.style.position="absolute";
    superhrana.style.left = superhranaX+"px";
    superhrana.style.top = superhranaY+"px";
    
}
function pomeraj(event){
    gameSound.play(); // Plays the sound
    if (event.key === 'ArrowUp' && poYosi==0) {
        poYosi=-25;
        poXosi=0;
      } else if (event.key === 'ArrowDown' && poYosi==0) {
        poYosi=25;
        poXosi=0;
      } else if (event.key === 'ArrowLeft' && poXosi==0) {
        poXosi=-25
        poYosi=0;
      } else if (event.key === 'ArrowRight' && poXosi==0) {
        poXosi=25;
        poYosi=0;
      }
}

function hrana_koord(){
    hranaX=Math.floor(Math.random()*br_jedinica)*jedinica;
    hranaY=Math.floor(Math.random()*br_jedinica)*jedinica;
    if(hranaX==zmijaX && hranaY==zmijaY){
        hranaX=Math.floor(Math.random()*br_jedinica)*jedinica;
        hranaY=Math.floor(Math.random()*br_jedinica)*jedinica;
    }
}


function postavi(){
    //pojela
    if(zmijaX==hranaX && zmijaY==hranaY || zmijaX==superhranaX && zmijaY==superhranaY){
        if(zmijaX==hranaX && zmijaY==hranaY)
        {
            rezultat++;
        }
        else
        {
            rezultat+=10;
        }
        document.getElementById("rez").innerHTML="REZULTAT: "+rezultat;
        var novi_div=document.createElement("div");
        novi_div.classList.add("zmija");
        novi_div.style.position="absolute";
        novi_div.style.left = zmijaX+"px";
        novi_div.style.top = zmijaY+"px";
        zmija_divovi.push(novi_div);
        //tabla.appendChild(novi_div);
        
        if(zmijaX==hranaX && zmijaY==hranaY)
        {
            hrana_koord();
        }
        else
        {
            clearInterval(interval2);
            postavi_superhrana();
            interval2=setInterval(postavi_superhrana,10000);
        }
    }
    
    
    if(zmijaX==(br_jedinica)*jedinica || zmijaX<0 || zmijaY<0 || zmijaY==(br_jedinica)*jedinica){
        clearInterval(interval2);
        gameSound.pause();
        gameOver.play();
        var igrac=prompt("Unesite Vase ime: ");
        //localStorage.setItem(igrac,rezultat);
        //clearInterval(interval2);
        
        korisnik = {
            ime: igrac,
            rez: rezultat
        };

        // ovo radim da bi se sacuvalo poslednje igrano ime i rezultat
        localStorage.setItem("ime",igrac);
        localStorage.setItem("rez",rezultat);
        
        var JSONrez = localStorage.getItem("svi_rezultati");
        rezultati = JSON.parse(JSONrez);
        if(rezultati==null)
            rezultati=[];
        rezultati.push(korisnik);
        rezultati.sort(function(a, b) {
           return b.rez - a.rez;
        })
        var JSONrez = JSON.stringify(rezultati);
        localStorage.setItem("svi_rezultati", JSONrez);
        window.location.href="zmijica-rezultati.html";
        clearInterval(interval);
        //clearInterval(interval2);
        //clearInterval(interval2);
        
        
    }
    

    for(let i=zmija_divovi.length-1;i>0;i--){
       zmija_divovi[i].position="absolute";
       zmija_divovi[i].style.left=zmija_divovi[i-1].style.left;
       zmija_divovi[i].style.top=zmija_divovi[i-1].style.top;
       
    }

    if(zmija_divovi.length){
        //zmija_divovi[0]=zmija;
        zmija_divovi[0].position="absolute";
        zmija_divovi[0].style.left = zmijaX + "px";
        zmija_divovi[0].style.top = zmijaY + "px";
    }

    //hrana
    hrana.style.position="absolute";
    hrana.style.left = hranaX+"px";
    hrana.style.top = hranaY+"px";

    
     //zmija
    zmijaX+=poXosi;
    zmijaY+=poYosi;
    zmija.style.position="absolute";
    zmija.style.left = zmijaX+"px";
    zmija.style.top = zmijaY+"px";


    for(let i=0;i<zmija_divovi.length;i++){
        tabla.appendChild(zmija_divovi[i]);
    }
    
    for(let i=0;i<zmija_divovi.length;i++){
        if(zmijaX==parseInt(zmija_divovi[i].style.left) && zmijaY==parseInt(zmija_divovi[i].style.top))
        {
            clearInterval(interval2);
            gameSound.pause();
            gameOver.play();
            var igrac=prompt("Unesite Vase ime: ");
            localStorage.setItem(igrac,rezultat);
            window.location.href="zmijica-rezultati.html";
            clearInterval(interval);
        }
    }
   
}
    
    