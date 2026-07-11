# RAG: Retrieval-Augmented Generation

## Limitations of standalone generative models

- A model may not know information created after its training data was collected.
- No access to private organizational information.
    - internal company documents
    - customer account details
    - private policies
    - internal project documentation
    - proprietary product information
- hallucination of information that is not true or does not exist.
    - what is the late-payment fee for a customer account?
    - the late payment penalty fee is $500.
- lack of traceability of information sources.
- updating the model is difficult and expensive.

## Retrieval Systems

- Retrieval means finding information relevant to a user's request from a large collection of documents.

## Retrieval-Augmented Generation (RAG)

- RAG is a hybrid approach that combines retrieval systems with generative models to overcome the limitations of standalone generative models.
- RAG is an architecture that combines:
    1. A retrieval system that finds relevant data from a large collection of documents.
    2. An external knowledge source that provides the retrieved information to a generative model.
    3. A generative language model that uses the retrieved information to generate accurate and contextually relevant responses.

## RAG System Powered Application

This repository contains a Retrieval-Augmented Generation (RAG) system that integrates with vector database (created at mongodb atlas) to enhance the capabilities of language models by providing them with relevant information from a large collection of documents. The RAG system allows for more accurate and context-aware responses by retrieveing relevant documents from the vector database and using them to generate respones.

### Features

- Vector database integration: The system connects to a vector database to store and retrieve document embeddings, enabling efficient retrieval of relevant information.

- Retrieval-Augmented Generation: The RAG system retrieves relevant documents based on the input query and uses them to generate more accurate and context-aware responses.

### API Endpoints

POST /api/embed-docs

    - Description: Embeds documents and stores them in the vector database.
    - Request Body: JSON object containing the documents to be embedded.
    - Response: JSON object indicating the success or failure of the embedding operation.

POST /api/ask

    - Description: Accepts a user query, retrieves relevant documents from the vector database, and generates a response using the retrieved information.
    - Request Body: JSON object containing the user query.
    - Response: JSON object containing the generated response based on the retrieved documents.