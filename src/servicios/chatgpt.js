import { environment } from '../environment/environment-dev.js';

// Función para generar respuestas usando ChatGPT
async function generateResponse(prompt) {
    const requestBody = {
     "model": "gpt-3.5-turbo",
     "messages": [{ "role": "user", "content": prompt }],
     "temperature": 0.7
   }

  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${ environment.apiKey }`,
    },
    body: JSON.stringify(requestBody),
  };

  try {
    const response = await fetch(environment.apiUrl, requestOptions);
    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      const generatedText = data.choices[0].message.content.trim();
      return generatedText;
    }
  } catch (error) {
    console.error('Error al llamar a la API de OpenAI:', error);
  }

  return null;
}

async function main(operacion, resultado) {
    const prompt = 'Muestrame los pasos para resolver la siguiente operación: ' + operacion + ' = ' + resultado;
    const response = await generateResponse(prompt);
  
    console.log('Respuesta generada por ChatGPT:', response);
    // Es una promesa, por lo que hay que esperar a que se resuelva
    return response;
}

export default main
