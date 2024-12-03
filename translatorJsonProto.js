const fs = require("fs/promises");
const { Liquid } = require("liquidjs");
const protobuf = require("protobufjs");

async function translateJsonToProtobuf(inputJsonPath, templatePath, protoPath, messageType) {
    try {
        // Step 1: Read and parse the input JSON
        const inputJson = await fs.readFile(inputJsonPath, "utf-8");
        const inputData = JSON.parse(inputJson);

        // Step 2: Load and apply the Liquid template
        const liquidTemplate = await fs.readFile(templatePath, "utf-8");
        const engine = new Liquid();
        const transformedJsonString = await engine.parseAndRender(liquidTemplate, inputData);

        // Parse the transformed JSON string back into an object
        const transformedJson = JSON.parse(transformedJsonString);

        // Step 3: Load the .proto schema
        const root = await protobuf.load(protoPath);
        const Message = root.lookupType(messageType);

        // Verify the transformed JSON matches the Protobuf schema
        const errMsg = Message.verify(transformedJson);
        if (errMsg) throw new Error(`Protobuf validation failed: ${errMsg}`);

        // Encode the transformed JSON into Protobuf
        const message = Message.create(transformedJson);
        const buffer = Message.encode(message).finish();

        return buffer; // Return Protobuf binary
    } catch (error) {
        console.error("Error during translation:", error.message);
        throw error;
    }
}

// Main execution
(async () => {
    const inputJsonPath = "./resources/input.json"; // Path to input JSON
    const templatePath = "./resources/template.liquid"; // Path to Liquid template
    const protoPath = "./resources/message.proto"; // Path to Protobuf schema
    const messageType = "User"; // Root message type in .proto schema

    try {
        const protobufBuffer = await translateJsonToProtobuf(inputJsonPath, templatePath, protoPath, messageType);

        // Write the Protobuf binary to a file
        await fs.writeFile("output.bin", protobufBuffer);
        console.log("Protobuf binary written to output.bin");

        // Log the Protobuf binary as a hex string
        console.log("Protobuf encoded binary (as hex):");
        console.log(protobufBuffer.toString("hex"));
    } catch (error) {
        console.error("Failed to complete translation.");
    }
})();
