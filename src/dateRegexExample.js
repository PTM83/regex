// Estructura de regex para fechas yyy-mm-dd

// year: (\d{4})
// month: (\d{2})
// day: (\d{2})

const datesArray = [
    "2024-12-02", // Válida
    "2023-02-28", // Válida
    "2024-02-30", // Errónea (fecha inexistente)
    "2021-13-15", // Errónea (mes inválido)
    "abcd-12-02", // Errónea (no es una fecha)
    "2022-05-07", // Válida
    "2023/11/30", // Errónea (formato incorrecto)
    "2024-00-01", // Errónea (mes no válido)
    "2024-12-32", // Errónea (día no válido)
    "2020-06-15", // Válida
    "2021-12",    // Errónea (falta día)
    "2024-12-01"  // Válida
    ];
  
  // Regex para fechas válidas en formato yyyy-mm-dd
  // const dateRegex = /^(\d{4})-(\d{2})-(\d{2})$/;
const new_regex_date = /^(\d{4})-([01]\d)-([0-3]\d)$/
  
// Separar fechas válidas e inválidas
const dateObject = datesArray.reduce((acc, date) => {
    const match = date.match(new_regex_date);
    
    if (match) {
      // Verificamos que el mes y día sean válidos
        const [_, year, month, day] = match;
        const isValidMonth = month >= 1 && month <= 12;
        const isValidDay = day >= 1 && day <= 31;
  
        if (isValidMonth && isValidDay) {
        acc.validDates.push({ year, month, day });
        } else {
        acc.invalidDates.push(date);
        }
    } else {
        acc.invalidDates.push(date);
    }
    return acc;
    }, { validDates: [], invalidDates: [] });
  
console.log(dateObject);
  
  
  
  