var tamanho = 0;
var pcvic=0;
var plvic2=0;
var plvic3=0;
var valor=0;
var gamename;
var namegame;

var tela = document.getElementById("tela");
var gc = tela.getContext("2d");
gc.strokeStyle = "royalblue"; 
//gc.fillText = "white"
gc.fillStyle ="royalblue";  
gc.font = '60px serif';
gc.fillText("Olá mundo!",200,100);

  //limpar o tabuleiro
  function limpar(){
    var div = document.getElementById("tabuleiro");
    while(div.firstChild){
      div.removeChild(div.firstChild);
    }
  }

  //entrar nas configuracoes
  function login() {
    
    document.getElementById("conf").style.display="block";
    document.getElementById("start").style.display="block";
    document.getElementById("entrar").style.display="none";
    var user = document.getElementById("user").value;
    document.getElementById("username").innerHTML = user;
    document.getElementById("entrou").style.display="block";
    document.getElementById("log").style.display="block";
    document.getElementById("ft").disabled = false;

  }

  //verificar se está player vs computador
  function players(){
    //se esta a jogar player vs player
    if (document.getElementById("pvp").checked == true) {
      var tamanho = document.getElementById("colunas").value;
      if(tamanho>10 || Number.isInteger(tamanho) || tamanho<1){
        alert("Error! size is between 1 and 10.\n Choose another value");
        }else {
          join();
          tabu();
          playerPlay();
        }
    }
      //jogar contra o pc
      else{  
        tamanho = document.getElementById("colunas").value;
        console.log(tamanho);
        if(tamanho>10 || tamanho<1)
          alert("Error! size is between 1 and 10.\n Choose another value");
          else{ 
            if(Number.isInteger(tamanho)){
              alert("Must insert an integer value");            
            }
            else{ 
              tabu();
              vez();
            }
            document.getElementById("ft").disabled = false; }
      }
  }
  //verificar tamanho do tabuleiro e faze-lo
  function tabu(){ 
    pecas();
    formatopecas();
    document.getElementById("tabuleiro").style.display="inline-table";
    document.getElementById("conf").style.display="none";
    document.getElementById("give").style.display="block";
    document.getElementById("log").style.display="block";
    document.getElementById("start").style.display="none";
    document.getElementById("entrar").style.display="none";
    document.getElementById("ft").style.display="block";
    document.getElementById("entrou").style.display="block";
  }

  //cria as pecas
  function pecas() {
    tamanho = document.getElementById("colunas").value;
    valor = 0;
    for (var i = 0; i < tamanho; i++) {
      for (var j = 0; j <= i; j++) {
        var btn = document.createElement("BUTTON");
        document.getElementById("tabuleiro").appendChild(btn);
        btn.setAttribute("class","peca"+i);
        valor++;
      }
      var para = document.createElement("P");
      var element = document.getElementById("tabuleiro");
      element.appendChild(para);
    }
  }

  //css das pecas
  function formatopecas(){
    for (var i = 0; i <  valor; i++) {
      var peca = document.getElementsByClassName("peca"+i);
      for (var j = 0; j <  peca.length; j++) {
        document.getElementsByClassName("peca"+i)[j].style.backgroundColor="orange";
        document.getElementsByClassName("peca"+i)[j].style.width="5%";
        document.getElementsByClassName("peca"+i)[j].style.height="5%";
        document.getElementsByClassName("peca"+i)[j].style.padding="8px 18px";
        document.getElementsByClassName("peca"+i)[j].style.visibility="visible";
      }
    }
  }

  //quem comeca primeiro
  function vez() {
    if(document.getElementById("pvc").checked == true){
      if(document.getElementById("com").checked == true){
        alert("Computer's Turn");
        computerPlay();
      }
      else{
        alert("Player's Turn");
        playerPlay();
      }
    }
  }

  //verificar quem ganhou
 
  function jogada() {

    if(document.getElementById("pvc").checked == true){
        if (gameover()==0) {
          document.getElementById("ft").disabled = true;
          alert("Player Won!");
          var user = document.getElementById("user").value;
          if ( document.getElementById("nome2").innerHTML == "Name") {
            document.getElementById("nome2").innerHTML = user;
            plvic2++;
          }
          else {
            if ( document.getElementById("nome3").innerHTML == "Name") {
              document.getElementById("nome3").innerHTML = user;
              plvic3++;
            }
          }
        }
        else{
          alert("Computer's Turn");
          computerPlay();
          if(gameover()==0){
            document.getElementById("ft").disabled = true;
            alert("Computer Won!");
            pcvic++;
          }
          //computador won
          document.getElementById("pontos1easy").innerHTML = pcvic;
        }
        //player Won
        document.getElementById("pontos2easy").innerHTML = plvic2;
        document.getElementById("pontos3easy").innerHTML = plvic3;

      }
    }
  //verifica se tabuleiro esta vazio e retorna 1 ou 0
 
  function gameover() {
    var total=0;
    for (var i = 0; i < valor; i++) {
      var comprimento = document.getElementsByClassName("peca"+i).length;
      for (var j = 0; j < comprimento; j++) {
        if (document.getElementsByClassName("peca"+i)[0].style.visibility == "hidden") {
          total++;
        }
      }
    }
    if(total==valor){
      alert("Game Over!");
      return 0;
    }
    else return 1;
  }

  //jogada do computador random
  function computerPlay() {
    //escolhe linha
    var x = Math.floor((Math.random() * tamanho) + 0);
    var peca = document.getElementsByClassName("peca"+x);
    //escolhe coluna
    var y = Math.floor((Math.random() * peca.length) + 0);
    if(document.getElementsByClassName("peca"+x)[y].style.visibility == "visible"){
      remover.apply(this, [x,y]);
      alert("Player's Turn");
      playerPlay();
    }
    else computerPlay();
  }

  //remove peca
  function remover(linha,coluna){
    var comprimento = document.getElementsByClassName("peca"+linha).length;
    for (var i = coluna; i < comprimento ; i++) {
      document.getElementsByClassName("peca"+linha)[i].style.visibility = "hidden";
      
    }
    var pecasremove = comprimento - coluna;
    notify.apply(this,[linha,pecasremove]);
    desativabotoes();
  }

  //jogada do player
  function playerPlay() {
      var comprimento = 0 ;
      var buttons=0;
    for (var i = 0; i < tamanho; i++) {
       buttons = document.getElementsByClassName("peca"+i);
       comprimento = buttons.length;
       for (var j = 0; j < i+1; j++) {
         buttons[j].setAttribute("onclick","remover("+i+","+j+")");

        }
    }

  }

  function desativabotoes(){
      var comprimento = 0 ;
      var buttons=0;
      //console.log("desativabotoes");
      for (var i = 0; i < tamanho; i++) {
          buttons = document.getElementsByClassName("peca"+i);
          comprimento = buttons.length;
          for (var j = 0; j < i+1; j++) {
              buttons[j].setAttribute("onclick","");
            }
          }
  }
  //se carregar no giveup
  function giveup(){
    ranking();
      leave();
      document.getElementById("colunas").value="";
      document.getElementById("tabuleiro").style.display="none";
      document.getElementById("entrar").style.display="none";
      document.getElementById("conf").style.display="block";
      document.getElementById("start").style.display="block";
      document.getElementById("give").style.display="none";
      document.getElementById("log").style.display="block";
      document.getElementById("ft").style.display="none";
      document.getElementById("entrou").style.display="block";

      if(gameover()==1){
          alert("Go Home Loser!");
      }

      limpar();
  }

  //se fizer logout
  function logout(){
    ranking();
    
    document.getElementById("colunas").value="";
    document.getElementById("tabuleiro").style.display="none";
    document.getElementById("entrar").style.display="block";
    document.getElementById("give").style.display="none";
    document.getElementById("conf").style.display="none";
    document.getElementById("log").style.display="none";
    document.getElementById("ft").style.display="none";
    document.getElementById("entrou").style.display="none";
    
    alert("See you next time!");
    limpar();
     

  }

  function displayQuote() {
    document.getElementById("inst").style.display="block";
  }

  function hiddeQuote() {
    document.getElementById("inst").style.display="none";
  }

  function displayRank() {
    document.getElementById("rank").style.display="block";
  }

  function hiddeRank() {
    document.getElementById("rank").style.display="none";
  }
    
  function registo() {
    var user = document.getElementById("user").value;
    var passi = document.getElementById("pass").value;
    if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008"+"/register",true);
  
    
    var objt = { nick:user, pass:passi};
    var stri =JSON.stringify(objt);
   // console.log(stri);
    xhr.send(stri); 

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        var data = xhr.responseText;
       // console.log(data);
        alert('Bem-vindo!');
        login();
      }else{ 
        if(xhr.status==400){
          var erro = xhr.responseText;
          if(erro == '{"error":"User registered with a different password"}'){
            //console.log(erro);
            alert('Check username and/or password');
          }
        }
      }
          
    }
    
  }

  
  function join(callback){
    //group , nick ,pass,size
    var user = document.getElementById("user").value;
    var passi = document.getElementById("pass").value;
    var tamanho = document.getElementById("colunas").value;
    if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
    var xhr = new XMLHttpRequest();
    xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008"+"/join",true);
    
    var objt = {group: 40, nick: user, pass: passi, size: tamanho};
    var stri =JSON.stringify(objt);
   // console.log(stri);
    xhr.send(stri); 

    xhr.onreadystatechange = function() {
      if(xhr.readyState == 4 && xhr.status == 200){
        var jogo = xhr.responseText;
        var gname =JSON.parse(jogo);
        gamename = gname.game;
        //console.log(gamename);//da o gamename
        if (callback && typeof(callback) === "function") {
          callback(gamename);
        }       
        
        update(gamename);
        var url = "http://twserver.alunos.dcc.fc.up.pt:8008/update?nick"+user+"&game"+gamename;
        //cria objeto de comunicaçao
        var eventSource = new EventSource(url); 
        
        //erro na comunicacao
        eventSource.onerror = function(event) { 
         // var dataerror = JSON.parse(event.data);
         alert("conexao nao foi feita");
         } 
        //conexao estabelecida
        eventSource.onstart = function(event) { 
          //var datastart = JSON.parse(event.data);
          alert("conexao estabelecida");
         } 
        
        
        // nova msg recebida
        eventSource.onmessage = function(event) { 
          var datamessages = JSON.parse(event.data);
          if(datamessages =={})alert("À espera do outro jogador!")
         } 
         eventSource.close();

         alert('O jogo foi criado');
      }
          
    }
    
  }

  function leave(){
    //nick pass game
    gname();
    var user = document.getElementById("user").value;
    var passi = document.getElementById("pass").value;
     if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
     var xhr = new XMLHttpRequest();
     xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008"+"/leave",true);
   
     
     var objt = { nick: user,pass:passi, game:gamename };
     var stri =JSON.stringify(objt);
     console.log(stri);
     xhr.send(stri); 
 
     xhr.onreadystatechange = function() {
       if(xhr.readyState == 4 && xhr.status == 200){
         var data = xhr.responseText;
         console.log(data);
         alert('O jogador desistiu do tempo');
         
       }
           
     }     
  }
   
  function gname(){
    var ganame= join(function(gamename){ return (gamename); });
    console.log(ganame);
  }


   function notify( linha ,  pecass){
    //nick,pass,game,stack,pieces
   
     var user = document.getElementById("user").value;
     var passi = document.getElementById("pass").value;
     if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
     var xhr = new XMLHttpRequest();
     xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008"+"/notify",true);
   
     var objt = { nick: user, pass: passi, game: gamename, stack: linha+1 , pieces:pecass};
     var stri =JSON.stringify(objt);
     console.log(stri);
     xhr.send(stri); 
 
     xhr.onreadystatechange = function() {
       if(xhr.readyState == 4 && xhr.status == 200){
         var data = xhr.responseText;
       }
           
     }    
  }

  function update(gamename){
    //com GET
    //nick,game
    //gname();
    //group , nick ,pass,size
    var user = document.getElementById("user").value;
    var source = new EventSource("http://twserver.alunos.dcc.fc.up.pt:8008/update?nick"+user+"&game"+gamename);
    source.onmessage = function(event) {
    	alert("ola amigos esta no onmessage");
      var serverRes = JSON.parse(event.data);
      if(!serverRes.error){
       	alert("ola amigos nao deu erro");
        opponent = serverRes.opponent;
        alert("adversario: " + JSON.stringify(opponent));
        alert("jogador: " + name);
        if(serverRes.opponent!==undefined){
         	alert("adversario existe!");
         	document.getElementById("waiting").style.display='none';
          
          if(diff == "beginner"){
		       	alert("vai criar tabela beginner");
		        createTable(5,7);
          }
          
			  }
		    if(serverRes.turn == user){ 
		        player = 0; 
		        document.getElementById("turn").innerHTML="TURN: USER"; 
		    }			
		    if(serverRes.turn == opponent){
		        player = 1;
		        document.getElementById("turn").innerHTML="TURN: OPPONENT"; 
		    }    
		    	    
		    if(serverRes.winner !== undefined){
	            source.close();
	            ranking(diff);
	            alert("o jogo acabou");
            }
        }
    	  else{
      		alert("deu erro: " + JSON.stringify(serverRes));
      	}
    }




    /*var objt = { nick: user,game: gamename };
    var stri =JSON.stringify(objt);
    console.log(stri);
    xhr.send(stri); */
    /*
    xhr.onreadystatechange = function() {
    if(xhr.readyState == 4 && xhr.status == 200){
      var data = xhr.responseText;
      console.log(data);
      //alert('O jogo foi criado');
         
    }
           
     }*/
            
                
  }

  function ranking(){
    //size           
     var tamanho = document.getElementById("colunas").value;
     if(!XMLHttpRequest) { console.log("XHR não é suportado"); return; }
     var xhr = new XMLHttpRequest();
     xhr.open("POST","http://twserver.alunos.dcc.fc.up.pt:8008"+"/ranking",true);
     xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
     
     var objt = {size: tamanho};
     var stri =JSON.stringify(objt);
     console.log(stri);
     xhr.send(stri); 
 
     xhr.onreadystatechange = function() {
       if(xhr.readyState == 4 && xhr.status == 200){
         var data = xhr.responseText;
         console.log(data);
        // alert('O jogo foi criado');
         
       }
           
     }
                        
  }
/*
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.strokeText("Hello World",10,50);
  */