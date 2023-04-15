import express from 'express';
import { glob } from 'glob';

const rootRouter = express.Router();

async function autoloadRoutes() {
    const jsfiles = await glob("**/index.js", {
        cwd: "src/routes",
        ignore: "index.js",
    });
    const importTasks = jsfiles.map(async (path) => {
    const module = await import(`./${path}`);
    if (module.default === undefined) return;
        rootRouter.use(`/${path.slice(0, -9)}`, module.default);
    });
    return Promise.all(importTasks);
}

await autoloadRoutes();
export default rootRouter;