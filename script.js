let constante = 0;
let nomeUsuario;
let usuario ={};
let guardaMensagem={};

entrada();
function entrada(){
    nomeUsuario = prompt("Digite o nome do Usuário:");

    usuario =
    {
        name: `${nomeUsuario}`
    };
    const request = axios.post('https://mock-api.driven.com.br/api/v6/uol/participants', usuario);
    request.then(iniciaSistema);
    request.catch(erroGeral);
}
function iniciaSistema(){
    buscarMensagens();
    const ConfirmaUsuarioOnline = setInterval(informaServidor, 5000);
    const AtualizarChat = setInterval(buscarMensagens, 3000);
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
const input = document.getElementById("input");
input.addEventListener("keyup", function(event) {
     if (event.keyCode === 13) {
        event.preventDefault();
         document.getElementById("clicavel").click();
    }
});
function enviarMensagem(){
    const mensagemEnviada = document.querySelector('.campoMensagem').value;
    const mensagem = 
    {
        from: `${usuario.name}`,
	    to: "todos",
	    text: `${mensagemEnviada}`,
	    type: "message"
    }
    const enviaMensagemServidor = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages', mensagem);
    enviaMensagemServidor.then(envioRealizado);
    enviaMensagemServidor.catch(erroGeral);
}
function envioRealizado(){
    document.querySelector('.campoMensagem').value='';
    buscarMensagens();
}
function buscarMensagens(){
    const respostaMensagemEnviada = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    respostaMensagemEnviada.then(processarResposta);
    respostaMensagemEnviada.catch(erroGeral);
}
function processarResposta(resposta) {
    guardaMensagem={};
    guardaMensagem = resposta.data;
    const listaMensagens = document.querySelector('ul');
    listaMensagens.innerHTML = '';
    for(let i=0; i<guardaMensagem.length; i++){
        if(guardaMensagem[i].type === "private_message"&&(guardaMensagem[i].from === usuario.name || guardaMensagem[i].to === usuario.name)){
            if(i==99){
                const template = `
                <li data-test="message" class="ultimo private">
                    <span>(${guardaMensagem[i].time})</span>&nbsp; <b>${guardaMensagem[i].from}</b>&nbsp; para &nbsp;<b>${guardaMensagem[i].to}</b>: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template; 
            }
            else{
                const template = `
                <li data-test="message" class="private">
                    <span>(${guardaMensagem[i].time })</span>&nbsp; <b>${guardaMensagem[i].from }</b>&nbsp; para &nbsp;<b>${guardaMensagem[i].to}</b>: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template;
            }
        }
        else if(guardaMensagem[i].type === "status"){
            if(i==99){
                const template = `
                <li data-test="message" class="ultimo status">
                    <span>(${guardaMensagem[i].time})</span>&nbsp; <b>${guardaMensagem[i].from}</b>&nbsp; ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template; 
            }
            else{
                const template = `
                <li data-test="message" class="status">
                    <span>(${guardaMensagem[i].time })</span>&nbsp; <b>${guardaMensagem[i].from}</b>&nbsp; ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template;
            }

        }
        else if(guardaMensagem[i].type === "message"){
            if(i==99){
                const template = `
                <li data-test="message" class="ultimo msg">
                    <span>(${guardaMensagem[i].time})</span>&nbsp; <b>${guardaMensagem[i].from}</b>&nbsp; para &nbsp;<b>${guardaMensagem[i].to}</b>: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template; 
            }
            else{
                const template = `
                <li data-test="message" class="msg">
                    <span>(${guardaMensagem[i].time })</span>&nbsp; <b>${guardaMensagem[i].from}</b>&nbsp; para &nbsp;<b>${guardaMensagem[i].to}</b>: ${guardaMensagem[i].text}
                </li>
            `;
                listaMensagens.innerHTML += template;
            }
        }
        else{}

    }
    const scrol = document.querySelector('.ultimo');
    scrol.scrollIntoView();

}

function erroGeral(erro){
    const statusCode = erro.response.status;
    if ( statusCode === 400){
        window.location.reload();
        entrada();
    }
    else{
        window.location.reload();
    }
}