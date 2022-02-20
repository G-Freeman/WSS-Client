export default class WSS {

	private socket: WebSocket | undefined;

	constructor(url:string) {
		setTimeout(() => {
			this.socket = new WebSocket(url);
			this.socket.onopen = this.onopen;
			this.socket.onclose = this.onclose;
			this.socket.onmessage = this.onmessage;
			this.socket.onerror = this.onerror;
			this.send = this.socket.send;
		})
	}

	onopen = () => {
		console.log("Соединение установлено.");
	};
	onclose = (event:CloseEvent) => {
		if (event.wasClean) {
			console.log('Соединение закрыто чисто');
		} else {
			console.log('Обрыв соединения'); // например, "убит" процесс сервера
		}
		console.log('Код: ' + event.code + ' причина: ' + event.reason);
	};
	onmessage = (event:MessageEvent) => {
		console.log("Получены данные " + event.data);
	};
	onerror = (error:any) => {
		console.log("Ошибка " + error.message);
	};
	send: (data: (string | ArrayBufferLike | Blob | ArrayBufferView)) => void = () => {

	}
}
