<template></template>

<script>
let ws;
window._ws = ws = new WebSocket("ws://localhost:9002");

const showMessage = message => {
    console.log(message);
};

ws.onerror = () => showMessage("WebSocket error");
ws.onopen = () => showMessage("WebSocket connection established");
ws.onclose = () => showMessage("WebSocket connection closed");
ws.onmessage = data => {
    console.log(data);
};
export default {};
</script>

<style lang="scss" scoped>
</style>