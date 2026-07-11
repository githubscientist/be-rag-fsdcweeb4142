const docController = {
    seedDocs: async (request, response) => {
        try {
            response.status(200).json({ "message": "Success Seeding document.." });
        } catch (err) {
            response.status(500).json({ message: "Seeding document failed..", error: err.message });
        }
    },
    askQuestion: async (request, response) => {
        try {
            response.status(200).json({ "message": "Answer for the prompt.." });
        } catch (err) {
            response.status(500).json({ message: "Failed to fetch answer..", error: err.message });
        }
    },
}

module.exports = docController;