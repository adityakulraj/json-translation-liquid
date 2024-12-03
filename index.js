const fs = require("fs/promises");
const { Liquid } = require("liquidjs");

async function translateJson(inputJsonPath, templatePath) {
    try {
        const inputJson = await fs.readFile(inputJsonPath, "utf-8");

        const inputData = JSON.parse(inputJson);

        const liquidTemplate = await fs.readFile(templatePath, "utf-8");

        const engine = new Liquid();

        const renderedOutput = await engine.parseAndRender(liquidTemplate, inputData);

        const outputJson = JSON.parse(renderedOutput);

        return JSON.stringify(outputJson, null, 2);
    } catch (error) {
        console.error("Error during translation:", error.message);
        throw error;
    }
}

// Main function to execute the translation
(async () => {
    const inputJsonPath = "./resources/input.json"; // Path to the input JSON file
    const templatePath = "./resources/template.liquid"; // Path to the Liquid template file

    try {
        const outputJson = await translateJson(inputJsonPath, templatePath);
        console.log("Translated JSON:");
        console.log(outputJson);
    } catch (error) {
        console.error("Failed to translate JSON.");
    }
})();