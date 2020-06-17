const nameIMC = "Carlos";
const weight = 84;
const height = 1.88;

const IMC =  weight / (height * height);

if(IMC > 30){
    console.log(`${nameIMC} você está acima do peso, pois seu IMC é de : ${IMC}!`)
}else {
    console.log(`${nameIMC} você não está acima do peso, pois seu IMC é de : ${IMC}!`)
}

/* Cálculo de aposentadoria */

const name = "Silvana";
const sex = "F";
const age = 62;
const contribution = 23;

/*
O tempo de contribuição mínimo para homens é de 35 anos e, para mulheres, 30 anos;
Utilizando a regra 85-95, a soma da idade com o tempo de contribuição do homem precisa 
ser de no mínimo 95 anos, enquanto a mulher precisa ter no mínimo 85 anos na soma;
*/

if((sex == "F") && ((age + contribution) >= 85)){
    console.log(`${name}, você pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(age + contribution)}!`)
}else if((sex == "M") && ((age + contribution) >= 95)){
    console.log(`${name}, você pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(age + contribution)}!`)
}else{
    console.log(`${name}, você não pode se aposentar, pois sua soma de idade + contribuição é igual a: ${(age + contribution)}!`)
}