  let participantes = [
    {
      nome: "Mayke Brito",
      email: "mayke@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 19, 20),
      dataCheckIn: new Date(2024, 5, 24, 22, 0)
    },
    {
      nome: "Thales Bruno",
      email: "thalesbruno@gmail.com",
      dataInscricao: new Date(2024, 2, 22, 20, 45),
      dataCheckIn: null
    },
    {
      nome: "Ana Souza",
      email: "ana.souza@gmail.com",
      dataInscricao: new Date(2024, 3, 5, 14, 30),
      dataCheckIn: new Date(2024, 7, 15, 10, 0)
    },
    {
      nome: "Carlos Silva",
      email: "carlos.silva@gmail.com",
      dataInscricao: new Date(2024, 3, 10, 9, 0),
      dataCheckIn: new Date(2024, 6, 20, 18, 0)
    },
    {
      nome: "Maria Oliveira",
      email: "maria.oliveira@gmail.com",
      dataInscricao: new Date(2024, 4, 15, 17, 45),
      dataCheckIn: null
    },
    {
      nome: "Luiz Santos",
      email: "luiz.santos@gmail.com",
      dataInscricao: new Date(2024, 5, 1, 8, 15),
      dataCheckIn: new Date(2024, 10, 3, 9, 0)
    },
    {
      nome: "Fernanda Lima",
      email: "fernanda.lima@gmail.com",
      dataInscricao: new Date(2024, 5, 8, 11, 30),
      dataCheckIn: new Date(2024, 11, 12, 16, 45)
    },
    {
      nome: "Rafaela Costa",
      email: "rafaela.costa@gmail.com",
      dataInscricao: new Date(2024, 6, 3, 16, 0),
      dataCheckIn: new Date(2024, 11, 30, 8, 0)
    },
    {
      nome: "Pedro Almeida",
      email: "pedro.almeida@gmail.com",
      dataInscricao: new Date(2024, 7, 20, 10, 20),
      dataCheckIn: null
    },
    {
      nome: "Camila Ribeiro",
      email: "camila.ribeiro@gmail.com",
      dataInscricao: new Date(2024, 8, 5, 13, 45),
      dataCheckIn: null
    }
  ];

  const criarNovoParticipante = (participante) => {
    const dataInscricao = dayjs(Date.now())
    .to(participante.dataInscricao)

    let dataCheckIn = dayjs(Date.now())
    .to(participante.dataCheckIn)

    // condicional
    if(participante.dataCheckIn == null) {
      dataCheckIn = `
        <button
          data-email="${participante.email}"
          onclick="fazerCheckIn(event)"
        >
          Confirmar check-in
        </button>
      `
    }
    
    return `
    <tr>
      <td>
        <strong>
          ${participante.nome}
        </strong>
        <br>
        <small>
          ${participante.email}
        </small>
      </td>
      <td>${dataInscricao}</td>
      <td>${dataCheckIn}</td>
    </tr>
    `
  }

  const atualizarLista = (participantes) => {
    let output = ""
    for(let participante of participantes) {
      output = output + criarNovoParticipante(participante)
    }

    // substituir informação do HTML
    document
    .querySelector('tbody')
    .innerHTML = output
  }

  atualizarLista(participantes)

  const adicionarParticipante = (event) => {
    event.preventDefault()

    const dadosDoFormulario = new FormData(event.target)

    const participante = {
      nome: dadosDoFormulario.get('nome'),
      email: dadosDoFormulario.get('email'),
      dataInscricao: new Date(),
      dataCheckIn: null
    }

    //verificar se o participante já existe
    const participanteExiste = participantes.find(
      (p) => {
        return p.email == participante.email
      }
    )

    if(participanteExiste) {
      alert('Email já cadastrado!')
      return
    }

    participantes = [participante, ...participantes]
    atualizarLista(participantes)

    //limpar o formulário
    event.target.querySelector('[name = "nome"]').value = ""
    event.target.querySelector('[name="email"]').value = ""
  }

  const fazerCheckIn = (event) => {
    // confirmar se realmente quer o ckeck-in
    const mensagemConfirmacao = 'Tem certeza que deseja fazer o Check-in?'
    
    if(confirm(mensagemConfirmacao) == false) {
      return
    }

    alert(resultado) // true ou false - boolean

    // encontrar o participante dentro da lista
    const participante = participantes.find((p) => {
      return p.email == event.target.dataset.email
    })
    // atualizar o checkin do participante
    participante.dataCheckIn = new Date()

    // atualizar a lista de participantes
    atualizarLista(participantes)
  }