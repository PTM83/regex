// Regex
/*
https://regexr.com
. <-- Punto selecciona cada caracter
.... <-- Si se ingresan 4 puntos; busca 4 caracteres, incluso espacios vacíos; toma grupos de caracteres en este ejemplo sería 1 grupo con 4 caracteres.
\d <-- toma un dígito | \d\d\d <-- toma 3 dígitos
\d{totalCaracter} <-- digit
\w <-- toma grupo completo que contiene una palabra
\w{} <-- words
\s <-- space
\. <-- Para determinar el caracter punto de forma específica
[] <-- Se denomina clases | Sirve para estructurar la búsqueda de información, es decir, lo que debe contener
[0-9] <-- Specific digits | selecciona todos los dígitos
[0-9a-zA-Z]	<-- Toma todos los dígitos y palabras
[a-zA-Z]
[\-\- ] <-- Indica que contenga punto (.) separador (-) o espacio vacío ( )
* <-- es para buscar todos los elementos, puede ser dígitos, caracter. Ejemplo \d* <-- Busca todos los dígitos
? <-- Hace de forma de booleana que exista o no, es decir 0 o 1
* <-- greedy - busca todo
+ <-- uno o más
{} <-- Contadores | Permite determinar el número exacto de caracter
[^] <-- Not debe estar incerta en la clase
\[] <-- Identifica que se quiere buscar elementos que están entre corchetes
^ <-- Inicio de línea
g <-- Global
$ <-- Indica final de línea
*/

// Estructura de regex para fechas yyy-mm-dd
const date_regex = /(\d{4})-(\d{2})-(\d{2})/
const regex_character = /[a-zA-Z]{1,}/g // De la fecha entregada detecta desde que punto existe una letra diferente a un número y se agrega el (g) al final para indicar que es global. En este caso detecta todas las letras que contiene el String
const regex_digit = /(\d{2,4}).*[0-9]*\w{1,2}/ // Una clase que permie buscar dígitos que tengan entre 2 a 4 dígitos juntos, busca todos los caracteres que contenta número (.*[0-9])
const regex_before_character = /.*?[-\d]{2,10}/ // Lee todo los caracteres hasta que aparece el primer separador (/.*?-/). Otra forma de encontrar una fecha es indicando, busca todos los caracteres que puede que incluya la clase [-\d] (separador con dígito) y los dígitos esten formados desde 2 dígitos hasta un máximo de 10 caracteres. Acá encuentra cualquier fecha que este escrito en modo gringo como también en modo españa, es decir, (yyyy-mm-dd) AND (dd-mm-yyyy)
const regex_character_2 = /[^0-9$]{1,}/g
const regex_date_2 = /[^a-zA-Z\\$]{2,4}/g

const regex_before_character_with_not = /[a-zA-Z\\$]?[-\d]{4,10}/ // Se esta negando al inicio que contenga los caracteres alfabéticos tanto en minúsculas como en mayúsculas

// Toma los dígitos que estan entre las comas y puntos y se hace uso de (g) para que lo extienda en todos los dígitos
const regex_prueba = /\d+[^,\.]/g

const date = 'tTT89uiwYh/(yuT"#$&2024-11-30345zss98-5689'
const date_es = 'tA%87$%&30-11-2024345zss98-5689'
const number = '0923,8923,7864.8923'

const matchers = date_regex.exec(date)
const matchers_es = regex_before_character.exec(date_es)
const matchers_not = regex_before_character_with_not.exec(date_es)

const justCharacter = date_es.match(regex_character_2)
console.log(`Se muestran todas las letras que componen el String: [${justCharacter}]`)

const separateByComa = number.match(regex_prueba)
console.log('elementos sin comas:',separateByComa.join(' '))

console.table(regex_character.exec(date)) // encuentra los caracteres
console.table(regex_digit.exec(date)) // encuentra todos los dígitos y caracteres

console.table(regex_character_2.exec(date))

console.table(regex_before_character.exec(date))
console.table(matchers_es)

// Encuentra las fechas tanto en formato yyyy-mm-dd & dd-mm-yyyy ---> regex_before_character
console.log('Se muestran las fechas con un regex que elimina los caracteres de letras\n')
console.table(matchers_not)
console.table(regex_before_character_with_not.exec(date))
// regex_before_character_with_not.exec(date_es)

console.log(regex_date_2.exec(date))

// Encuentra solo la fecha gringa
console.table(matchers)

// ------------------------------------- //

// Regex

const rawData = [
  "555658",
  "56-58-11",
  "56.58.11",
  "56.78-98",
  "65 09 87",
  "76y87r98",
  "45y78-56",
  "78.87 65",
  "78 54-56",
  "+521565811",
  "58-11-11#246",
  "55-5632-0417",
  "55256048p123",
  "55256048e123"
]

// +[#pe]?\d*$

const regex_phone = /^\+?\d{2,3}[^\da-z]?\d{2,3}[^\da-z]?\d{2,3}[^a-z\\]$/

const filterArray = rawData.filter(item => regex_phone.test(item))

console.log(filterArray)

// Para https

const mixedArray = [
  "google.com",
  "example.org",
  "test123.net",
  "my-site.co",
  "university.edu",
  "shop.online",
  "service.gov",
  "info.biz",
  "blog.blog",
  "company.io",
  // Strings no válidos como dominios
  "random text",
  "123-not-a-domain",
  "missingdotcom",
  "@invalid#domain",
  "domain..com",
  "spaces in domain",
  "http://domain.com",
  "www.anotherdomain",
  "domain,comma.com",
  "domain#invalid",
  'https://www.google.jpg/archivo.html juanperez'
];

const regex_https = /https?:\/\/[\w\-\.]+\.\w{2,5}\/?\S*/

const filterHttps = mixedArray.filter(url => regex_https.test(url))

console.log(filterHttps)

console.log(regex_https.exec(mixedArray[mixedArray.length -1]))


// Regex email

const emailArray = [
  // Correos electrónicos válidos
  "user@example.com",
  "john.doe@domain.org",
  "info123@test.net",
  "sales@company.co",
  "support_company@my-site.io",
  "contact@university.edu",
  "hello.world@blog.online",
  "admin@service.gov",
  "team@startup.biz",
  "newsletter@company.com",
  "uno@dominio.cl",
  "cancun_hotel@cancun.mx",
  // Strings que no son correos válidos
  "plain text",
  "@missingusername.com",
  "user@@domain.com",
  "user@domain,com",
  "user@domain"
];

console.log(emailArray);

// dominio: @[\w\.\-]{3,}\.\w{2,5}$
// usuario: [\w\._]{5,30}\+?[\w]{0,10}@

const regex_email = /[\w\._]{5,30}\+?[\w]{0,10}@[\w\.\-]{3,}\.\w{2,5}/

const filter_email = emailArray.filter(email => regex_email.test(email))

console.log(filter_email)

// -------Latitud Longitud Altura

const placeArray = [
  // Datos válidos (latitud, longitud, altura)
  "34.052235, -118.243683, 89",    // Los Ángeles, altura en metros
  "-33.448890, -70.669265, 520",  // Santiago de Chile
  "48.856613, 2.352222, 35",      // París
  "40.712776, -74.005974, 10",    // Nueva York
  "-22.906847, -43.172897, 5",    // Río de Janeiro
  "51.507222, -0.1275, 15",       // Londres
  "35.689487, 139.691711, 44",    // Tokio
  "55.755825, 37.617298, 156",    // Moscú
  
  // Datos no válidos
  "Not a location",               // Texto
  "123.456, -456.789",            // Sin altura
  "abc, -123, 45",                // Latitud no válida
  "90.1, 180.1, 0",               // Fuera de rango válido
  "34.052235 -118.243683 89",     // Sin comas
  "34.05.2235, -118.243.683, 89", // Puntos extras
  "-34, -70, unknown",            // Altura no numérica
  "123456",                       // Un solo número
  "-33.448890, -70.669265, ",     // Altura faltante
  " , , ",                        // Vacío
];

console.log(placeArray);

// latitud: \-?\d{1,3}\.\d{1,6},
// longitud: \s?\-?\d{1,3}\.\d{1,6},
// altura: \s?\d{1,3}

const places_regex = /^\-?\d{1,3}\.\d{1,6},\s?\-?\d{1,3}\.\d{1,6},\s?\d{1,3}$/

const places_filter = placeArray.filter(place => places_regex.test(place))

console.log(places_filter)

const match_test = places_regex.exec(placeArray[3])
console.table(match_test)


// ---- Regex nombre Apellido

// ---- Regex nombre Apellido

const mixedNamesArray = [
  // Nombres y apellidos válidos
  "Fernando García",
  "Ana Torres",
  "Carlos López",
  "María González",
  "Javier Morales",
  "Sofía Ramírez",
  "Miguel Herrera",
  "Isabel Cruz",
  "Juan Pérez",
  "Luisa Martínez",
  "Diego Gómez",
  "Elena Vargas",
  "Pedro Rojas",
  "Gabriela Medina",
  "Raúl Castro",
  "Laura Delgado",
  "Tomás Sánchez",
  "Camila Fernández",
  "Mateo Ruiz",
  "Valentina Ortiz",
  "Ángel Di Maria",
  "Francisca Torres Montes",
  
  // Nombres con errores o no válidos
  "F3rnando García",   // Número al inicio
  "0scar Torres",      // Número al inicio
  "Miguel H3rrera",    // Número en apellido
  "4na González",      // Número al inicio
  "J@vier Morales",    // Carácter no alfabético
  "S0fía R4mírez",     // Número en ambos nombres
  "L@ura D3lgado",     // Carácter especial y número
  "Diego123",          // Números adjuntos
  "Pedro_Rojas",       // Guion bajo
  "Juan.Pérez",        // Punto
  "Ana",               // Solo un nombre
  "12345",             // Solo números
  "@user",             // Comienza con un carácter especial
  "Fernando!",         // Termina con un carácter especial
];

console.log(mixedNamesArray);

// nombre: ([A-Z][a-z][^0-9!_.\s]{1,})\s?
// apellido: ([a-zA-Z][^0-9!_.]{3,})

const regex_name_lastName = /^([A-ZÁÉÍÓÚÑ][a-z][^0-9!_.\s]{1,})\s?([a-zA-Z][^0-9!_.]{1,})$/
      
const filter_name = mixedNamesArray.filter(name => regex_name_lastName.test(name))

console.log(filter_name)

const test_name = regex_name_lastName.exec(mixedNamesArray[10])

console.table(test_name)

const object_name_lastName = mixedNamesArray.reduce( (acumulador, data) => {
  const match = data.match(regex_name_lastName)
  // console.log(match)
  if(match) {
    const [entrada, nombre, apellido] = match
    acumulador.name.push({ nombre })
    acumulador.lastName.push({ apellido })
    acumulador.input.push({ entrada })
  } 
  return acumulador
  
}, {name: [], lastName: [], input: []})

console.log(object_name_lastName.name)

//---- MEJORAR FECHAS
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

// Sacar los Query de una http

const queryArray = [
    "https://b3co.com/?s=fotografia&mode=search&module=blog",
    "https://www.google.com/search?q=regex+platzi&oq=regex+platzi&aqs=chrome..69i57j69i60.6885j0j9&sourceid=chrome&ie=UTF-8",
    "https://co.search.yahoo.com/search?p=flickr&fr=yfp-t&fp=1&toggle=1&cop=mss&ie=UTF-8",
    "https://www.google.com"
]

const index = 0

// GET Query que comienza con ? o & una letra y =
// [\?&](\w+)=([^&\n]+)

console.log(queryArray[index])
//([^&\n]+)
const regexQuery = /[\?&](\w+)=([^&\n]+)/g

// console.table(regexQuery.exec(queryArray[index])) // Solo toma la primera iteración
// console.table([...queryArray[index].matchAll(regexQuery)]) //Acá se itera completo el array pero hay que crear una copia para no modificar el original.

const matches = [...queryArray[index].matchAll(regexQuery)]

// console.table(matches)

const queryParams = matches.map(match => ({
    key: match[1],
    value: match[2]
}))

console.log(queryParams)
