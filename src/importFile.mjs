//import fetch from 'node-fetch';

const urlFile = 'https://static.platzi.com/media/public/uploads/results_38b68d08-2666-4eef-8933-e9f0ee698442.csv';

const loadDataText = async (url) => {
    try {
        const readData = await fetch(url);

    if (!readData.ok) {
        throw new Error(`Error to load this file ${readData.status}`);
    }

    // Pasar a texto
    const dataText = await readData.text();

    // Dividir los datos en filas
    const rowData = dataText.split("\n");

    // Obtener encabezados
    const headersData = rowData[0].split(",");
    // console.log("Headers:", headersData);

    // Procesar cada fila en datos estructurados
    const allData = rowData.slice(1).filter(row => row.trim() !== "").reduce((acumulador, row) => {
      // const values = row.split(",");

      acumulador.push(row); // Agregar el objeto al acumulador
        return acumulador;
    }, []);
    
    // console.log("Data:", allData); // Mostrar los datos procesados
    return {allData, headersData}

    } catch (error) {
        console.error("Error message:", error.message);
    }
}

const {allData, headersData} = await loadDataText(urlFile)

console.log(headersData)
console.log("Total data", allData.length)

// Generar Regex
// ,.*\d,\d,.*(\w[A-Z]{4,5})$

const regex_date = /^(\d{4})-([01]\d)-(\d{2}),.+,\d,\d,.*,(\w{4,5})$/i
const valid_month = '11'
const condition = 'FALSE'

// console.log(allData[0])

const searchData = allData.reduce((acc, data) => {
  
    const match = data.match(regex_date)
  
    if (match) {
        const [, year, month, day, neutral] = match;
    
        const validMonth = month === valid_month
    
    if (validMonth) {
        acc.push(match.input)
      // acc.push(neutral)
        }
    }
  
    return acc
},[])

console.log(searchData.slice(0,4), searchData.length)

// const numberCondition = searchData.reduce((acc, item) =>{
//   acc[item] = (acc[item] || 0) +1
//   return acc
// }, {})

// console.log(numberCondition)

