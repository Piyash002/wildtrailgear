"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = require("./app");
dotenv_1.default.config();
let server;
async function main() {
    try {
        mongoose_1.default.connect(process.env.MONGODB_URI);
        server = app_1.app.listen(process.env.PORT, () => {
            console.log(`Server is running on port ${process.env.PORT}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
process.on('unhandledRejection', (err) => {
    console.log(`😈 unahandledRejection is detected , shutting down ...`);
    console.error('🔥 Unhandled Rejection:', err);
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});
process.on('uncaughtException', (err) => {
    console.error('🔥 Uncaught Exception:', err); // <-- this logs the error!
});
