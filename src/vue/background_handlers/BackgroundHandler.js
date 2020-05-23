import { ipcRenderer } from 'electron';

export default class BackgroundHandler {
    constructor(type) {
        this.type = type;
    }
    create(instance) {
        return new Promise((resolve, reject) => {
            ipcRenderer.send(`create-${this.type}`, instance);
            ipcRenderer.on(`${this.type}-created`, (evt, resp) => {
                resolve(resp);
            });
            ipcRenderer.on(`${this.type}-not-created`, (evt, error) => {
                reject(error);
            });
        });
    }
    list() {
        return new Promise(resolve => {
            ipcRenderer.send(`list-${this.type}s`);
            ipcRenderer.on(`${this.type}s-listed`, (evt, result) => {
                resolve(result);
            });
        });
    }
}