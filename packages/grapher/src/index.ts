import Watcher from "./Watcher";
import WebServer from "./WebServer";

if (process.argv.slice(2).length < 1) {
  console.log("Usage: grapher <plot-config.json>");
  process.exit(1);
}

const pathname = process.argv.slice(2)[0];

const webserver = new WebServer(8080);
webserver.listen();

const watcher = new Watcher(pathname);
watcher.watch(() => {
  webserver.broadcast("update", "new update");
});
