import Watcher from "./Watcher";
import WebServer from "./WebServer";

const webserver = new WebServer(8080);
webserver.listen();

const watcher = new Watcher(process.argv.slice(2)[0]);
watcher.watch(() => {
  webserver.broadcast("update", "new update");
});
