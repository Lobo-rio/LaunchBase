/* Exercícios das aulas */
/* Cálculo de IMC */
const nomeIMC = "Carlos";
const peso = 84;
const altura = 1.88;

const IMC = peso / (altura * altura);

if(IMC > 30){
    console.log(`${nomeIMC} você está acima do peso, pois seu IMC é de : ${IMC}!`)
}else {
    console.log(`${nomeIMC} você não está acima do peso, pois seu IMC é de : ${IMC}!`)
}

/* Cálculo de aposentadoria */

const nome = "Silvana";
const sexo = "F";
const idade = 62;
const contribuicao = 23;

/*
O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa 
ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;
*/

if((sexo == "F") && ((idade + contribuicao) >= 85)){
    console.log(`${nome}, você pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(idade + contribuicao)}!`)
}else if((sexo == "M") && ((idade + contribuicao) >= 95)){
    console.log(`${nome}, você pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(idade + contribuicao)}!`)
}else{
    console.log(`${nome}, você não pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(idade + contribuicao)}!`)
}