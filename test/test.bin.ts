import { expect } from "chai";
import { exec } from "child_process";
import fs from "fs";
import path from "path";

const node = path.join(__dirname, "../node_modules/ts-node/dist/bin.js");
const bin = path.join(__dirname, "../src/bin.ts");
describe("测试", () => {
  it("冒烟测试", done => {
    exec(`${node} ${bin} test/sub1/sub2/test.png test/flat`, (error, stdout, stderr) => {
      expect(error).equal(null);
      done();
    });
  });
});
