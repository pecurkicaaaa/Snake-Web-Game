$(document).ready(function(){

    
    $("#igra").click(function(){
        let osnovni_nivo=document.getElementById("radio1");
        let srednji_nivo=document.getElementById("radio2");
        let napredni_nivo=document.getElementById("radio3");
    
        let tabla20=document.getElementById("radio4");
        let tabla50=document.getElementById("radio5");
        let tabla100=document.getElementById("radio6");
    
        if(osnovni_nivo.checked){
            localStorage.setItem('nivo',1);
        }
        else if(srednji_nivo.checked){
            localStorage.setItem('nivo',2);
        } 
        else if(napredni_nivo.checked){
            localStorage.setItem('nivo',3);
        }

        if(tabla20.checked){
            localStorage.setItem('tabla',20);
        }
        else if(tabla50.checked){
            localStorage.setItem('tabla',50);
        }
        else if(tabla100.checked){
            localStorage.setItem('tabla',100);
        }
       
       
        window.location.href = "zmijica-igra.html";
        
        
    })


});

