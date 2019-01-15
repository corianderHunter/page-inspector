/**
 * mouse
 */
let interval,
  record,
  recordType = ['mouse', 'mouseDown'];

let mouseMove = _.throttle(e => {
  record({
    mouse: {
      x: e.pageX,
      y: e.pageY
    }
  });
}, interval);

let mouseDown = _.throttle(e => {
  record({
    mouseDown: {
      x: e.pageX,
      y: e.pageY
    }
  });
}, interval);

function mount() {
  document.documentElement.addEventListener('mousemove', mouseMove, false);
  document.documentElement.addEventListener('mousedown', mouseDown, false);
}

function unmount() {
  document.documentElement.removeEventListener('mousemove', mouseMove, false);
  document.documentElement.removeEventListener('mousedown', mouseDown, false);
}

let mouseNode = (function () {
  const mouseImageData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTQ1NzkyNDM0NTcwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSIxMDI0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyIvPjwvZGVmcz48cGF0aCBkPSJNODY4LjA4NjYwNTY3IDg0NC44MjUzMTMyM2wtMjYuMDIxMzMzNDkgMjYuMDIxMzMzNDRjLTExMS4zNjU5MTM2NyAxMTEuMzY1OTEzNjctMjkzLjY1MDA3MzMgMTExLjM2NTkxMzY3LTQwNS4wMTU5ODcxNyAwTDE0MS4xMDcxNzcwMyA1NzQuOTA0NTM4OTJjLTExMS4zNjU5MTM2Ny0xMTEuMzY1OTEzNjctMTExLjM2NTkxMzY3LTI5My42NTAwNzMzIDAtNDA1LjAxNTk4NzIzbDI2LjAyMTMzMzg0LTI2LjAyMTMzMzU1YzExMS4zNjU5MTM2Ny0xMTEuMzY1OTEzNjcgMjkzLjY1MDA3MzMtMTExLjM2NTkxMzY3IDQwNS4wMTU5ODY5NCAwbDI5NS45NDIxMDc4NiAyOTUuOTQyMTA3ODhjMTExLjM2NTkxMzY3IDExMS4zNjU5MTM2NyAxMTEuMzY1OTEzNjcgMjkzLjY1MDA3MzMgMCA0MDUuMDE1OTg3MjF6IiBmaWxsPSIjRjM3QzdFIiBwLWlkPSIxMDI1Ii8+PHBhdGggZD0iTTg5NS4wNTE3MTc4OSA4NzEuNzkwNDI1OThsLTI2LjAyMTMzMzQxIDI2LjAyMTMzMzA0Yy02MS4wNzU5Nzk3IDYxLjA3NTk3OTctMTQyLjUxMDYxOTAyIDk0Ljc4MjM2OTk4LTIyOS40NzMxMDY0MiA5NC42NDc1NDQzOC04Ni44Mjc2NjE3NiAwLTE2OC4zOTcxMjY0Ny0zMy41NzE1NjQ4My0yMjkuNDczMTA1MzgtOTQuNjQ3NTQ0MzhMMTE0LjE0MjA2NTIyIDYwMS44Njk2NTEyN2MtNjEuMDc1OTc5Ny02MS4wNzU5Nzk3LTk0Ljc4MjM2OTk4LTE0Mi41MTA2MTkwMi05NC42NDc1NDUwOC0yMjkuNDczMTA2MSAwLTg2LjgyNzY2MTc2IDMzLjU3MTU2NDgzLTE2OC4zOTcxMjY0NyA5NC42NDc1NDQzNC0yMjkuNDczMTA1OThsMjYuMDIxMzMzODItMjYuMDIxMzMzNDRjNjEuMDc1OTc5Ny02MS4wNzU5Nzk3IDE0Mi41MTA2MTkwMi05NC43ODIzNjk5OCAyMjkuNDczMTA1ODgtOTQuNjQ3NTQ0NDcgODYuODI3NjYxNzYgMCAxNjguMzk3MTI2NDcgMzMuNTcxNTY0ODMgMjI5LjQ3MzEwNTU4IDk0LjY0NzU0NDQ3bDI5NS45NDIxMDgxMyAyOTUuOTQyMTA4YzYxLjA3NTk3OTcgNjEuMDc1OTc5NyA5NC42NDc1NDQ0MiAxNDIuNjQ1NDQ0NSA5NC42NDc1NDQzMiAyMjkuNDczMTA1NiAwLjEzNDgyNTUxIDg2Ljk2MjQ4NzI3LTMzLjU3MTU2NDgzIDE2OC4zOTcxMjY0Ny05NC42NDc1NDQzMiAyMjkuNDczMTA2MDV6IG0tNzI2Ljk3OTQyODYxLTY3NC45MzY3NjIxNGMtOTYuODA0NzUzMTggOTYuODA0NzUzMTgtOTYuODA0NzUzMTggMjU0LjI4MTAwOTIyIDAgMzUxLjA4NTc2MjY0bDI5NS45NDIxMDc5NCAyOTUuOTQyMTA3ODdjOTYuODA0NzUzMTggOTYuODA0NzUzMTggMjU0LjI4MTAwOTIyIDk2LjgwNDc1MzE4IDM1MS4wODU3NjI3NyAwbDI2LjAyMTMzMzA5LTI2LjAyMTMzMzI4Yzk2LjgwNDc1MzE4LTk2LjgwNDc1MzE4IDk2LjgwNDc1MzE4LTI1NC4yODEwMDkyMiAwLTM1MS4wODU3NjI2Mkw1NDUuMTc5Mzg1NDIgMTcwLjgzMjMyOTljLTk2LjgwNDc1MzE4LTk2LjgwNDc1MzE4LTI1NC4yODEwMDkyMi05Ni44MDQ3NTMxOC0zNTEuMDg1NzYyNTcgMC4wMDAwMDExM2wtMjYuMDIxMzMzMjYgMjYuMDIxMzMyODF6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDI2Ii8+PHBhdGggZD0iTTExOC44NjA5NTk2NCAxNzkuNDYxMTY2MjdsNTMuOTMwMjI0NDktNTMuOTMwMjI0NjEgMTc1LjEzODQwNDU2IDE3NS4xMzg0MDQ2OC01My45MzAyMjQ2MyA1My45MzAyMjQ3M3oiIGZpbGw9IiM4NTg1ODUiIHAtaWQ9IjEwMjciLz48cGF0aCBkPSJNMzAwLjg3NTQ2NzY3IDQxMy4yNDg2OTA0OWExMTMuMDY4NTc3MzQgNzQuNzQzNDc4MzcgNDUgMSAwIDEwNS43MDMyNDAzOC0xMDUuNzAzMjQwNDcgMTEzLjA2ODU3NzM0IDc0Ljc0MzQ3ODM3IDQ1IDEgMC0xMDUuNzAzMjQwMzggMTA1LjcwMzI0MDQ3WiIgZmlsbD0iI0Y4RjRCMiIgcC1pZD0iMTAyOCIvPjxwYXRoIGQ9Ik00NjAuNjQzNzU4MTYgNDY3LjMxMzc0MDgzYy00NC43NjIwODY0NSA0NC43NjIwODY0NS0xMjYuNzM2MDI4MDkgMzIuODk3NDM3MDYtMTg2LjczMzQwMjg0LTI3LjA5OTkzODE2cy03MS44NjIwMjQzMS0xNDEuOTcxMzE2NS0yNy4wOTk5Mzc5Mi0xODYuNzMzNDAyODggMTI2LjczNjAyODA5LTMyLjg5NzQzNzA2IDE4Ni43MzM0MDM0OSAyNy4wOTk5Mzc5IDcxLjk5Njg0OTk0IDE0MS44MzY0OTA4OCAyNy4wOTk5Mzc2NyAxODYuNzMzNDAyNzh6IG0tMTU5LjkwMzExNjA3LTE1OS45MDMxMTY0NmMtMTAuMzgxNTY3ODMgMTAuMzgxNTY3ODMtNC43MTg4OTQ1OCA0Ny4wNTQxMjA2MyAyNy4wOTk5Mzc3NiA3OC44NzI5NTM2N3M2OC42MjYyMTExIDM3LjM0NjY4MDY3IDc4Ljg3Mjk1Mzg5IDI3LjA5OTkzNzcyIDQuNzE4ODk0NTgtNDcuMDU0MTIwNjMtMjcuMDk5OTM4MTEtNzguODcyOTUzNTMtNjguNDkxMzg1MjgtMzcuNDgxNTA2MjQtNzguODcyOTUzNTQtMjcuMDk5OTM3Njh6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDI5Ii8+PHBhdGggZD0iTTYwMS41MzY0Njk5NCA2MDkuMDE1NDA1OGwtMC4xMzQ4MjUxNiAwLjEzNDgyNTYyYy0xNC45NjU2Mzc0MSAxNC42OTU5ODYyMS0zOS4wOTk0MTI5MiAxNC41NjExNjAzNi01My45MzAyMjQ5My0wLjI2OTY1MDg0bC0xMzQuODI1NTYxNTItMTM2LjQ0MzQ2OTAxYy0xNC42OTU5ODYyMS0xNC45NjU2Mzc0MS0xNC42OTU5ODYyMS0zOC45NjQ1ODc3NCAwLjEzNDgyNTU1LTUzLjc5NTM5ODc2bDAuMTM0ODI1NTMtMC4xMzQ4MjU2MmMxNC45NjU2Mzc0MS0xNC42OTU5ODYyMSAzOS4wOTk0MTI5Mi0xNC41NjExNjAzNiA1My45MzAyMjUgMC4yNjk2NTEyMmwxMzQuODI1NTYxMTcgMTM2LjQ0MzQ2ODI0YzE0LjgzMDgxMTc5IDE0LjgzMDgxMTc5IDE0LjY5NTk4NjIxIDM4Ljk2NDU4Nzc0LTAuMTM0ODI1MTEgNTMuNzk1Mzk5MTV6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDMwIi8+PC9zdmc+'
  let _node = document.createElement('img')
  _node.src = mouseImageData
  _node.setAttribute('style', 'position:absolute;top: -20px;left: -20px;')
  return _node
})()

function mouseUpdate(data) {
  mouseNode.style.left = data.x + 'px'
  mouseNode.style.top = data.y + 'px'
}

let clickPointNode = (function () {
  let _point = document.createElement('div')
  _point.setAttribute('style', 'position:absolute;width:10px;height:10px;border-radius:10px;background-color:red;')
  document.body.appendChild(_point)
  return _point
})()

function addClickPoint(data) {
  let _cloneNode = clickPointNode.cloneNode()
  _cloneNode.style.top = data.y + 'px'
  _cloneNode.style.left = data.x + 'px'
  //append somewhere
  document.body.appendChild(_cloneNode)
}

export default {
  record: {
    init(_record, _interval = 50) {
      record = _record;
      interval = _interval;
      mount();
    },
    destroy() {
      unmount();
    }
  },
  replay(records) {
    let mouse, mouseDown
    mouse = records.mouse
    mouseDown = records.mouseDown
    mouseDown && addClickPoint(mouseDown)
    mouse && mouseUpdate(mouse)
  }
};