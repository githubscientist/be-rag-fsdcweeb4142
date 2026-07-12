const Doc = require('../models/doc');
const OpenAI = require('openai');
const { OPENAI_API_KEY } = require('../utils/config');

const openai = new OpenAI({
    apiKey: OPENAI_API_KEY
});

const getEmbedding = async (text) => {
    const response = await openai.embeddings.create({
        model: "text-embedding-3-small",
        input: text
    });
    
    console.log(response);

    console.log('Embedding response:', response.data[0].embedding);
    return response.data[0].embedding;
}


const seedDocuments = async (documents) => {
    // convert the text documents into embeddings
    const docsToInsert = [];

    for (const text of documents) {
        const embedding = await getEmbedding(text);

        docsToInsert.push({
            text,
            embedding,
        });
    }

    // insert the documents into the database
    const insertResult = await Doc.insertMany(docsToInsert);

    return insertResult;
}

const similarity = (v1, v2) => {
    let sum = 0;

    for (let i = 0; i < v1.length; i++){
        sum += v1[i] * v2[i];
    }

    return sum;
}

const docController = {
    seedDocs: async (request, response) => {
        try {
            // get the documents from the request body
            const { documents } = request.body;

            // convert the text documents into embeddings
            const insertResult = await seedDocuments(documents);

            response.status(200).json({ "message": "Success Seeding document..", data: insertResult });
        } catch (err) {
            response.status(500).json({ message: "Seeding document failed..", error: err.message });
        }
    },
    askQuestion: async (request, response) => {
        try {
            // get the question from the request body
            const { question } = request.body;

            // get the embedding for the question
            const questionEmbedding = await getEmbedding(question);

            // find the most similar document in the database
            const docs = await Doc.find();

            // calculate the similarity between the question embedding and each document embedding
            const scores = docs.map(doc => {
                const score = similarity(questionEmbedding, doc.embedding);

                return {
                    text: doc.text,
                    score
                }
            });

            // sort the similarity scores in descending order
            scores.sort((a, b) => b.score - a.score);

            // return the top 3 most similar documents
            const topDocs = scores.slice(0, 3);

            // build context from the top documents
            const context = topDocs.map((doc, index) => `Document ${index + 1}: ${doc.text}`).join('\n');

            // create a prompt for the OpenAI API
            const prompt = `You are a helpful assistant. Answer using ONLY the context below.
            Context: ${context}
            Question: ${question}
            `;

            // send the prompt to the OpenAI API
            const res = await openai.responses.create({
                model: "gpt-5-nano",
                input: prompt,
            });

            response.status(200).json({ question, scores, topDocs, answer: res.output_text });
        } catch (err) {
            response.status(500).json({ message: "Failed to fetch answer..", error: err.message });
        }
    },
}

module.exports = docController;