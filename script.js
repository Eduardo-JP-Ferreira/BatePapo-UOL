let constante = 0;
let nomeUsuario;
let usuario ={};
let guardaMensagem={};

entrada();
buscarMensagens()
function entrada(){
    nomeUsuario = prompt("Digite o nome do Usuário:");
    
    usuario =
    {
        name: `${nomeUsuario}`
    };
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    request.then(alerta);
    request.catch(entrada);
    
}
console.log("deu certo");
function alerta(resposta){
    console.log("ok");
    let ConfirmaUsuarioOnline = setInterval(informaServidor, 5000);
    let AtualizarChat = setInterval(buscarMensagens, 3000);
}
function informaServidor(){
    const informaNomeParaServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/status',usuario);
    informaNomeParaServidor.then(usuarioOnline);

    informaNomeParaServidor.catch(usuarioNaoOnline);
}
function usuarioOnline(){
    console.log("Confirma Usuário Online");
}
function usuarioNaoOnline(){
    console.log("Usuário Offline");
    entrada();
}
function enviarMensagem(){
    console.log("cliquei");
    const mensagemEnviada = document.querySelector('.campoMensagem').value;
    console.log(mensagemEnviada);
    const mensagem = 
    {
        from: `${usuario.name}`,
	    to: "todos",
	    text: `${mensagemEnviada}`,
	    type: "message"
    }
    const enviaMensagemServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    enviaMensagemServidor.then(buscarMensagens);
    enviaMensagemServidor.catch(erroMensagem);
}
function buscarMensagens(){
    const respostaMensagemEnviada = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    respostaMensagemEnviada.then(processarResposta);
    respostaMensagemEnviada.catch(erroMensagem);
}
function processarResposta(resposta) {
    console.log(resposta.data);
    guardaMensagem={};
    guardaMensagem = resposta.data;
    const listaMensagens = document.querySelector('ul');
    listaMensagens.innerHTML = '';
    for(let i=0; i<guardaMensagem.length; i++){
        if(guardaMensagem[i].type == "status"){
            if(i==99){
                let template = `
                <li data-test="message" class="ultimo status">
                    (${guardaMensagem[i].time}) ${guardaMensagem[i].from} para ${guardaMensagem[i].to}: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template; 
            }
            else{
                let template = `
                <li data-test="message" class="status">
                    (${guardaMensagem[i].time }) ${guardaMensagem[i].from } para ${guardaMensagem[i].to}: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template;
            }

        }
        else{
            if(i==99){
                let template = `
                <li data-test="message" class="ultimo msg">
                    (${guardaMensagem[i].time}) ${guardaMensagem[i].from} para ${guardaMensagem[i].to}: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template; 
            }
            else{
                let template = `
                <li data-test="message" class="msg">
                    (${guardaMensagem[i].time }) ${guardaMensagem[i].from } para ${guardaMensagem[i].to}: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template;
            }
        }

    }
    const scrol = document.querySelector('.ultimo');
    scrol.scrollIntoView();

}
function erroMensagem(){
    alert("Deu erro carai");
}
