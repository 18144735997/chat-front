import {defineStore} from "pinia";

export const useWebsocketStore = defineStore("websocket", {
    state: () => {
        return {
            ws: null,
            isConnected: false
        }
    },
    actions: {
        connect(url: string) {
            if (!this.isConnected) {
                this.ws = new WebSocket(url);
                this.ws.onopen = () => {
                    this.isConnected = true;
                };
                this.ws.onclose = () => {
                    this.isConnected = false;
                };
                this.ws.onerror = () => {
                    this.isConnected = false;
                };
            }
        },
        close() {
            if (this.isConnected) {
                this.ws.close(1000,"close");
                this.isConnected = false;
            }
        },
    }
})