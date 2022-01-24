"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MainServer = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongo_connector_1 = require("./mongo-connector");
const videoRouter_1 = __importDefault(require("./routes/videoRouter"));
const userRouter_1 = __importDefault(require("./routes/userRouter"));
const themeRouter_1 = __importDefault(require("./routes/themeRouter"));
class MainServer {
    constructor() {
        dotenv_1.default.config();
        this.app = (0, express_1.default)();
    }
    async start() {
        const mongoConnector = new mongo_connector_1.MongoConnector();
        await mongoConnector.connect();
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)()); //cors를 allow한다.
        this.app.use("/video", videoRouter_1.default);
        this.app.use("/user", userRouter_1.default);
        this.app.use("/theme", themeRouter_1.default);
        this.app.get('/', (req, res) => {
            res.send('Hello World');
        });
        this.app.listen(8080, () => {
            console.log('Server Opened.');
        });
    }
}
exports.MainServer = MainServer;
//# sourceMappingURL=mainserver.js.map