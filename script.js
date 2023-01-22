let constante = 0;
let nomeUsuario;
let usuario ={};

alert("Enviei");
entrada();

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
    let ConfirmaUsuarioOnline = setInterval(InformaServidor, 5000);
}
function InformaServidor(){
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
    enviaMensagemServidor.then(verResposta);
    enviaMensagemServidor.catch(erroMensagem);
}
function verResposta(){
    const respostaMensagemEnviada = axios.get('https://mock-api.driven.com.br/api/v6/uol/messages');
    respostaMensagemEnviada.then(processarResposta);
    
}
function processarResposta(resposta) {
	console.log(resposta.data);
}
function erroMensagem(){
    alert("Deu erro carai");
}