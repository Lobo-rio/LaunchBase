/*
Desafios 02
Construção e impressão de objetos
*/

const company = {
    name: "Rocketseat",
    color: "Roxo",
    focus: "Programação",
    address: {
        street: "Rua Guilherme Gembala",
        number: "260"
    }
}

console.log(`A empresa ${company.name} está localizada em ${company.address.street}, ${company.address.number}`)

/*
Vetores e objetos
*/

const developer = {
    devName: "Carlos",
    devAge: 32,
    technologies: [
        { tecName: 'C++', tecSpecialty: 'Desktop' },
        { tecName: 'Python', tecSpecialty: 'Data Science' },
        { tecName: 'JavaScript', tecSpecialty: 'Web/Mobile' }
    ]
}

console.log(`O usuário ${developer.devName} tem ${developer.devAge} anos e usa a tecnologia ${developer.technologies[0].tecName} com especialidade em ${developer.technologies[0].tecSpecialty}`)