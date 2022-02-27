import fs from "fs";

export default class Watcher {
  constructor(public pathname: string) {
    this.updateFile();
  }

  watch(onChange: () => void) {
    fs.watchFile(this.pathname, () => {
      this.updateFile();
      onChange();
    });
  }

  updateFile() {
    fs.readFileSync(this.pathname, "utf8");
    fs.copyFileSync(this.pathname, process.cwd() + "/public/plot.json");
    console.log(`[WATCHER] File ${this.pathname} updated.`);
  }
}
