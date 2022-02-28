import fs from "fs";
import path from "path";

export default class Watcher {
  constructor(public pathname: string) {}

  watch(onChange: () => void) {
    fs.watchFile(this.pathname, () => {
      this.updateFile();
      onChange();
    });
  }

  updateFile() {
    if (!fs.existsSync(this.pathname)) {
      console.log("[WATCHER] File not found: " + this.pathname);
      return;
    }

    fs.readFileSync(this.pathname, "utf8");
    fs.copyFileSync(this.pathname, path.join(__dirname, "../public/plot.json"));
    console.log(`[WATCHER] File ${this.pathname} updated.`);
  }
}
