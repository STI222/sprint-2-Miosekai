const compararForm = document.querySelector(".comparisonForm");
const personAselect = compararForm.personA;
const personBselect = compararForm.personB;
const resultFIeld = compararForm.result;

//Base de datos inventada
let url = "./data/baseDeDatos.csv";
let result = 0;
let data = [];
let listaNombres = [];

// Se transforma el cvs a un arreglo de objetos

Papa.parse(url, {
    header: true,
    download: true,
    dynamicTyping: true,
    complete: function (results) {
        console.log(results.data);
        data = results.data;
        data.forEach((elem) => {
            listaNombres.push(elem.Nombres);
        });
        renderNameOptions();
    },
});

// Boton para ejecutar las funciones

compararForm.addEventListener("submit", (event) => {
    event.preventDefault();
    let personaA = getPersonFromList(personAselect.value);
    let personaB = getPersonFromList(personBselect.value);
    let dotProduct = getDotProduct(personaA, personaB);
    let magnitudeA = getMagnitud(personaA);
    let magnitudeB = getMagnitud(personaB);
    let cosineSimilarity = getCosineSimilarity(
        dotProduct,
        magnitudeA,
        magnitudeB
    );
    renderResult(cosineSimilarity);
});

function renderNameOptions() {
    listaNombres.forEach((elem) => {
        const optionsElemA = document.createElement("option");
        const optionsElemB = document.createElement("option");
        optionsElemA.innerText = elem;
        optionsElemB.innerText = elem;
        optionsElemA.value = elem;
        optionsElemB.value = elem;
        personAselect.appendChild(optionsElemA);
        personBselect.appendChild(optionsElemB);
    });
}

function getPersonFromList(value) {
    let person = data.find((elem) => {
        return elem.Nombres == value;
    });
    return person;
}

//producto punto, multiplica los valores entre ellos y los suma

function getDotProduct(elemA, elemB) {
    let dotProduct = 0;
    let elemProps = Object.keys(elemA);
    for (let i = 1; i < elemProps.length; i++) {
        let prop = elemProps[i];
        dotProduct += elemA[prop] * elemB[prop];
    }
    return dotProduct;
}

//Magnitud

function getMagnitud(elem) {
    let magnitude = 0;
    let elemProps = Object.keys(elem);
    for (let i = 1; i < elemProps.length; i++) {
        let prop = elemProps[i];
        magnitude += Math.pow(elem[prop], 2);
    }
    return Math.sqrt(magnitude);
}

// Similitud coseno con producto punto y magnitudes

function getCosineSimilarity(dotProduct, magnitudeA, magnitudeB) {
    let cosineSimilarity = dotProduct / (magnitudeA * magnitudeB);
    return cosineSimilarity;
}

// El valor a porcentaje
function renderResult(result) {
    resultFIeld.value = (result.toFixed(2) * 100).toString() + "%";
}
