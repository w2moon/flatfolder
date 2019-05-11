var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const recursive_copy_1 = __importDefault(require("recursive-copy"));
const fs_1 = __importDefault(require("fs"));
const ora_1 = __importDefault(require("ora"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../logger");
const logger = logger_1.getLogger("flatfolder");
exports.default = (args) => __awaiter(this, void 0, void 0, function* () {
    const spanner = ora_1.default(`   正在拷贝...... `);
    const src = args[0];
    const dest = args[1];
    spanner.start();
    const options = {
        overwrite: true,
        expand: false,
        dot: false,
        junk: true,
        rename: (filePath) => {
            const stat = fs_1.default.statSync(path_1.default.resolve(src, filePath));
            if (stat.isDirectory()) {
                return "";
            }
            const arr = filePath.split("/");
            return arr.join("-");
        },
    };
    recursive_copy_1.default(src, dest, options)
        .on(recursive_copy_1.default.events.COPY_FILE_COMPLETE, copyOperation => {
        spanner.succeed(chalk_1.default.green("拷贝文件" + copyOperation.dest));
    })
        .on(recursive_copy_1.default.events.ERROR, (error, copyOperation) => {
        spanner.fail(chalk_1.default.redBright("拷贝文件失败" + copyOperation.dest));
    })
        .then(results => {
        spanner.succeed(chalk_1.default.green(`拷贝完成${results.length}个文件`));
    })
        .catch((error) => {
        spanner.fail(chalk_1.default.redBright(`拷贝失败${error}`));
    });
});
