#!/usr/bin/env node
import program from "commander";
import * as pkg from "../package.json";
import func from "./commands/func";
import { configure } from "./logger";
program
  .version(pkg.version)
  .usage("<command> srcPath dstPath")
  .option("-v, --verbose", "显示详细执行过程");

program.on("option:verbose", () => configure("debug"));

program.parse(process.argv);
if (program.args.length < 2) {
  program.help();
} else {
  func(program.args);
}
