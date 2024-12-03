const fs = require("fs/promises");
const { Liquid } = require("liquidjs");
const protobuf = require("protobufjs");

async function decodeProtobuf(protoPath, messageType, bufferPath) {
    const root = await protobuf.load(protoPath);
    const Message = root.lookupType(messageType);
    const buffer = await fs.readFile(bufferPath);
    const message = Message.decode(buffer);
    const plainObj = Message.toObject(message, { enums: String, longs: String });
    return JSON.stringify(plainObj, null, 2);
}


(async () => {
    const protoPath = "./resources/message.proto"; // Path to Protobuf schema
    const messageType = "User"; // Root message type in .proto schema
    const bufferPath = 'output.bin'

    try {
        const jsonText = await decodeProtobuf(protoPath, messageType, bufferPath);
        console.log("Decoded Json : ");
        console.log(jsonText);
    } catch (error) {
        console.error("Failed to complete translation.");
    }
})();
