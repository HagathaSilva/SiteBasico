function validarNome(nome) {
    const regex = /^[a-zA-Z\s]+$/;
    return regex.test(nome);
}

function validar(event) {
    event.preventDefault();
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confimarSenha = document.getElementById('confimar_senha').value;
    let opcaoPlano = document.querySelector('input[name="opcoes_plano"]:checked');
    const aceitarTermos = document.getElementById('aceitar_termos').checked;

    let opcaoPlanoSelecionado;

    if (!validarNome(nome)) {
        alert("Por favor, insira apenas letras no campo de nome.");
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert("Por favor, insira um e-mail válido.");
        return;
    }

    if (senha.length < 6) {
        alert("A senha deve ter pelo menos 6 caracteres.");
        return;
    }

    if (senha !== confimarSenha) {
        alert("A senha e a confirmação de senha não coincidem.");
        return;
    }


    if (opcaoPlano) {
        opcaoPlanoSelecionado = opcaoPlano.value;
    } else {
        alert("Por favor, selecione um plano antes de prosseguir.");
        return;
    }


    if (!aceitarTermos) {
        alert("Por favor, aceite os termos de serviço.");
        return;
    }


    const formData = new FormData(event.target);
    const queryString = new URLSearchParams(formData).toString();
    window.location.href = `formAction.html?${queryString}`;

}

function mascaraTelefone(event) {
    const tecla = event.key;
    let telefone = event.target.value.replace(/\D+/g, "");

    if (/^[0-9]$/i.test(tecla)) {
        telefone = telefone + tecla;
        const tamanho = telefone.length;

        if (tamanho >= 12) {
            return false;
        }

        if (tamanho > 10) {
            telefone = telefone.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (tamanho > 5) {
            telefone = telefone.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (tamanho > 2) {
            telefone = telefone.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            telefone = telefone.replace(/^(\d*)/, "($1");
        }

        event.target.value = telefone;
    }

    if (!["Backspace", "Delete", "Tab"].includes(tecla)) {
        return false;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const dadosContainer = document.getElementById('dados');

    if (urlParams.has('nome') && urlParams.has('email') && urlParams.has('telefone') && urlParams.has('aceitar_termos')) {
        const nome = urlParams.get('nome');
        const email = urlParams.get('email');
        const telefone = urlParams.get('telefone');
        const aceitarTermos = urlParams.get('aceitar_termos') === 'on' ? 'Aceito' : 'Não Aceito';

        let opcaoPlanoSelecionado = '';

        if (urlParams.has('opcoes_plano')) {
            const opcaoPlanoValor = urlParams.get('opcoes_plano');
            const opcoesPlanoLabels = {
                'valor1': 'Básico',
                'valor2': 'Normal',
                'valor3': 'Mega'
            };

            opcaoPlanoSelecionado = opcoesPlanoLabels[opcaoPlanoValor];
        }

        const dadosHTML = `
            <p><strong>Nome:</strong> ${nome}</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p><strong>Telefone:</strong> ${telefone}</p>
            <p><strong>Plano Selecionado:</strong> ${opcaoPlanoSelecionado}</p>
            <p><strong>Termos de Serviço:</strong> ${aceitarTermos}</p>
        `;

        dadosContainer.innerHTML = dadosHTML;
    } else {
        dadosContainer.innerHTML = '<p>Nenhum dado recebido.</p>';
    }
});


function mostrarPopup() {
    alert("Dados cadastrados com sucesso!");

    window.location.href = "index.html";
}