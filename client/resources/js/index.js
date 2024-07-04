let socket;
function connect() {
    handleData("Connection...");
    socket = io(server.value);
    socket.on('message', (data) => handleData(data));
    socket.on('connect_error', (err) => {
        handleData(`Unable to connect to ${server.value}: ${err.toString()}`);
        disconnect();
    });
    socket.on('connect', () => handleData("Connected"));

    connectBtn.disabled = true;
    disconnectBtn.disabled = false;
}
function disconnect() {
    socket.disconnect();
    handleData("Disconnected");
    connectBtn.disabled = false;
    disconnectBtn.disabled = true;
}
function handleData(data) {
    dataOutput.value += `${new Date().toLocaleString()}: ${data}\n`;
}