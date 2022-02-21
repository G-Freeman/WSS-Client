// Work only with WSS $store
import APP from "~/classes/app";

export default class WSS {
	// Static ---------------------------------------
	static sockets: WebSocket[] = [];
	static counter: number = 0;

	// Dynamic --------------------------------------
	private socket: any | undefined;

	constructor(url:string, name:string='ws_client') {
		setTimeout(() => {
			this.socket = new WebSocket(url);
			this.socket.onopen = this.onopen;
			this.socket.onclose = this.onclose;
			this.socket.onmessage = this.onmessage;
			this.socket.onerror = this.onerror;
			this.socket.id = WSS.counter++;
			this.socket.name = name;
			this.socket.connected = false;
			this.send = this.socket.send;

			WSS.sockets.push(this.socket);
			APP.store.dispatch('network/wss/add', this.socket);
		})
	}

	onopen = () => {
		this.socket.connected = true;
		console.log("Соединение установлено.");
		this.redraw();
	};
	onclose = (event:CloseEvent) => {
		this.socket.connected = false;
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения'); // например, "убит" процесс сервера
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
		this.redraw();
	};
	onmessage = (event:MessageEvent) => {
		console.log("Получены данные " + event.data);
		this.redraw();
	};
	onerror = (error:any) => {
		console.log("Ошибка " + error.message);
		this.redraw();
	};
	send: (data: (string | ArrayBufferLike | Blob | ArrayBufferView)) => void = () => {

	}
	redraw() {
		APP.store.dispatch('network/wss/redraw');
	}

	close = () => {
		this.socket?.close();
		this.redraw();
	}
}
