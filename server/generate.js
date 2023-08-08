import openaiClient from "./api.js";

const generate = async (queryDescription) => {

    const daVinci = async (queryDescription) => {
        const response = await openaiClient.createCompletion({
            model: "text-davinci-003",
            prompt: `Convert the following natural language description into a SQL query: \n\n${queryDescription}.`,
            temperature: 0,
            max_tokens: 2048,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        })
    
        return response.data.choices[0].text
    }


    const chatGptApi = async (queryDescription) => {
        const messages = [
            {role: "system", content: `You are a translator from plain English to SQL.`},
            {role: "user", content: `Convert the following natural language description into a SQL query: \n\nshow all elements from the table users.`},
            {role: "assistant", content: `SELECT * FROM users;`},
            {role: "user", content: `Convert the following natural language description into a SQL query: \n\n${queryDescription}.`}
        ];

        const response = await openaiClient.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: messages,
        })

        return response.data.choices[0].message.content
    }

    // Implement a delay here to control the rate of API calls
    const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    // Call daVinci with a delay of 1 second (adjust as needed)
    await delay(3000);

    return await chatGptApi(queryDescription)
    
}

export default generate