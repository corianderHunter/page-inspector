import _ from 'underscore';
//demo
{
  let record = {
    mouseDown: {
      x: 0,
      y: 0
    },
    mouse: {
      x: 0,
      y: 0
    },
    window: {
      w: 0,
      h: 0,
      sx: 0,
      sy: 0
    },
    mutations: {
      type: '',
      target: '',
      attributeName: '',
      newValue: '',
      addedNodes: [],
      prevNode: '',
      nextNode: ''
    }
  }
}

let _window


let mouseImageData = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNTQ1NzkyNDM0NTcwIiBjbGFzcz0iaWNvbiIgc3R5bGU9IiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiBwLWlkPSIxMDI0IiB3aWR0aD0iMTYiIGhlaWdodD0iMTYiPjxkZWZzPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyIvPjwvZGVmcz48cGF0aCBkPSJNODY4LjA4NjYwNTY3IDg0NC44MjUzMTMyM2wtMjYuMDIxMzMzNDkgMjYuMDIxMzMzNDRjLTExMS4zNjU5MTM2NyAxMTEuMzY1OTEzNjctMjkzLjY1MDA3MzMgMTExLjM2NTkxMzY3LTQwNS4wMTU5ODcxNyAwTDE0MS4xMDcxNzcwMyA1NzQuOTA0NTM4OTJjLTExMS4zNjU5MTM2Ny0xMTEuMzY1OTEzNjctMTExLjM2NTkxMzY3LTI5My42NTAwNzMzIDAtNDA1LjAxNTk4NzIzbDI2LjAyMTMzMzg0LTI2LjAyMTMzMzU1YzExMS4zNjU5MTM2Ny0xMTEuMzY1OTEzNjcgMjkzLjY1MDA3MzMtMTExLjM2NTkxMzY3IDQwNS4wMTU5ODY5NCAwbDI5NS45NDIxMDc4NiAyOTUuOTQyMTA3ODhjMTExLjM2NTkxMzY3IDExMS4zNjU5MTM2NyAxMTEuMzY1OTEzNjcgMjkzLjY1MDA3MzMgMCA0MDUuMDE1OTg3MjF6IiBmaWxsPSIjRjM3QzdFIiBwLWlkPSIxMDI1Ii8+PHBhdGggZD0iTTg5NS4wNTE3MTc4OSA4NzEuNzkwNDI1OThsLTI2LjAyMTMzMzQxIDI2LjAyMTMzMzA0Yy02MS4wNzU5Nzk3IDYxLjA3NTk3OTctMTQyLjUxMDYxOTAyIDk0Ljc4MjM2OTk4LTIyOS40NzMxMDY0MiA5NC42NDc1NDQzOC04Ni44Mjc2NjE3NiAwLTE2OC4zOTcxMjY0Ny0zMy41NzE1NjQ4My0yMjkuNDczMTA1MzgtOTQuNjQ3NTQ0MzhMMTE0LjE0MjA2NTIyIDYwMS44Njk2NTEyN2MtNjEuMDc1OTc5Ny02MS4wNzU5Nzk3LTk0Ljc4MjM2OTk4LTE0Mi41MTA2MTkwMi05NC42NDc1NDUwOC0yMjkuNDczMTA2MSAwLTg2LjgyNzY2MTc2IDMzLjU3MTU2NDgzLTE2OC4zOTcxMjY0NyA5NC42NDc1NDQzNC0yMjkuNDczMTA1OThsMjYuMDIxMzMzODItMjYuMDIxMzMzNDRjNjEuMDc1OTc5Ny02MS4wNzU5Nzk3IDE0Mi41MTA2MTkwMi05NC43ODIzNjk5OCAyMjkuNDczMTA1ODgtOTQuNjQ3NTQ0NDcgODYuODI3NjYxNzYgMCAxNjguMzk3MTI2NDcgMzMuNTcxNTY0ODMgMjI5LjQ3MzEwNTU4IDk0LjY0NzU0NDQ3bDI5NS45NDIxMDgxMyAyOTUuOTQyMTA4YzYxLjA3NTk3OTcgNjEuMDc1OTc5NyA5NC42NDc1NDQ0MiAxNDIuNjQ1NDQ0NSA5NC42NDc1NDQzMiAyMjkuNDczMTA1NiAwLjEzNDgyNTUxIDg2Ljk2MjQ4NzI3LTMzLjU3MTU2NDgzIDE2OC4zOTcxMjY0Ny05NC42NDc1NDQzMiAyMjkuNDczMTA2MDV6IG0tNzI2Ljk3OTQyODYxLTY3NC45MzY3NjIxNGMtOTYuODA0NzUzMTggOTYuODA0NzUzMTgtOTYuODA0NzUzMTggMjU0LjI4MTAwOTIyIDAgMzUxLjA4NTc2MjY0bDI5NS45NDIxMDc5NCAyOTUuOTQyMTA3ODdjOTYuODA0NzUzMTggOTYuODA0NzUzMTggMjU0LjI4MTAwOTIyIDk2LjgwNDc1MzE4IDM1MS4wODU3NjI3NyAwbDI2LjAyMTMzMzA5LTI2LjAyMTMzMzI4Yzk2LjgwNDc1MzE4LTk2LjgwNDc1MzE4IDk2LjgwNDc1MzE4LTI1NC4yODEwMDkyMiAwLTM1MS4wODU3NjI2Mkw1NDUuMTc5Mzg1NDIgMTcwLjgzMjMyOTljLTk2LjgwNDc1MzE4LTk2LjgwNDc1MzE4LTI1NC4yODEwMDkyMi05Ni44MDQ3NTMxOC0zNTEuMDg1NzYyNTcgMC4wMDAwMDExM2wtMjYuMDIxMzMzMjYgMjYuMDIxMzMyODF6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDI2Ii8+PHBhdGggZD0iTTExOC44NjA5NTk2NCAxNzkuNDYxMTY2MjdsNTMuOTMwMjI0NDktNTMuOTMwMjI0NjEgMTc1LjEzODQwNDU2IDE3NS4xMzg0MDQ2OC01My45MzAyMjQ2MyA1My45MzAyMjQ3M3oiIGZpbGw9IiM4NTg1ODUiIHAtaWQ9IjEwMjciLz48cGF0aCBkPSJNMzAwLjg3NTQ2NzY3IDQxMy4yNDg2OTA0OWExMTMuMDY4NTc3MzQgNzQuNzQzNDc4MzcgNDUgMSAwIDEwNS43MDMyNDAzOC0xMDUuNzAzMjQwNDcgMTEzLjA2ODU3NzM0IDc0Ljc0MzQ3ODM3IDQ1IDEgMC0xMDUuNzAzMjQwMzggMTA1LjcwMzI0MDQ3WiIgZmlsbD0iI0Y4RjRCMiIgcC1pZD0iMTAyOCIvPjxwYXRoIGQ9Ik00NjAuNjQzNzU4MTYgNDY3LjMxMzc0MDgzYy00NC43NjIwODY0NSA0NC43NjIwODY0NS0xMjYuNzM2MDI4MDkgMzIuODk3NDM3MDYtMTg2LjczMzQwMjg0LTI3LjA5OTkzODE2cy03MS44NjIwMjQzMS0xNDEuOTcxMzE2NS0yNy4wOTk5Mzc5Mi0xODYuNzMzNDAyODggMTI2LjczNjAyODA5LTMyLjg5NzQzNzA2IDE4Ni43MzM0MDM0OSAyNy4wOTk5Mzc5IDcxLjk5Njg0OTk0IDE0MS44MzY0OTA4OCAyNy4wOTk5Mzc2NyAxODYuNzMzNDAyNzh6IG0tMTU5LjkwMzExNjA3LTE1OS45MDMxMTY0NmMtMTAuMzgxNTY3ODMgMTAuMzgxNTY3ODMtNC43MTg4OTQ1OCA0Ny4wNTQxMjA2MyAyNy4wOTk5Mzc3NiA3OC44NzI5NTM2N3M2OC42MjYyMTExIDM3LjM0NjY4MDY3IDc4Ljg3Mjk1Mzg5IDI3LjA5OTkzNzcyIDQuNzE4ODk0NTgtNDcuMDU0MTIwNjMtMjcuMDk5OTM4MTEtNzguODcyOTUzNTMtNjguNDkxMzg1MjgtMzcuNDgxNTA2MjQtNzguODcyOTUzNTQtMjcuMDk5OTM3Njh6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDI5Ii8+PHBhdGggZD0iTTYwMS41MzY0Njk5NCA2MDkuMDE1NDA1OGwtMC4xMzQ4MjUxNiAwLjEzNDgyNTYyYy0xNC45NjU2Mzc0MSAxNC42OTU5ODYyMS0zOS4wOTk0MTI5MiAxNC41NjExNjAzNi01My45MzAyMjQ5My0wLjI2OTY1MDg0bC0xMzQuODI1NTYxNTItMTM2LjQ0MzQ2OTAxYy0xNC42OTU5ODYyMS0xNC45NjU2Mzc0MS0xNC42OTU5ODYyMS0zOC45NjQ1ODc3NCAwLjEzNDgyNTU1LTUzLjc5NTM5ODc2bDAuMTM0ODI1NTMtMC4xMzQ4MjU2MmMxNC45NjU2Mzc0MS0xNC42OTU5ODYyMSAzOS4wOTk0MTI5Mi0xNC41NjExNjAzNiA1My45MzAyMjUgMC4yNjk2NTEyMmwxMzQuODI1NTYxMTcgMTM2LjQ0MzQ2ODI0YzE0LjgzMDgxMTc5IDE0LjgzMDgxMTc5IDE0LjY5NTk4NjIxIDM4Ljk2NDU4Nzc0LTAuMTM0ODI1MTEgNTMuNzk1Mzk5MTV6IiBmaWxsPSIjODU4NTg1IiBwLWlkPSIxMDMwIi8+PC9zdmc+'
let cover, //用来隔绝原网页遮罩层
  mouse
let toolsContainer = document.createElement('div') //鼠标以及点击的容器
let mouseDownPoint = document.createElement('div')
mouseDownPoint.setAttribute('style', 'position:absolute;width:10px;height:10px;border-radius:10px;background-color:red;')

/**
 *
 * @param {}  record
 */
let start = (record) => {
  alert('start replay')
  createCover()
  timer(record)
}



let timer = (record) => {
  if (_.isEmpty(record)) return;
  for (let pro in record.records) {
    setTimeout(() => {
      let _record = record.records[pro]
      _record.window ? windowReplay(_record.window) : null;
      _record.mouse ? mouseMoveReplay(_record.mouse) : null;
      _record.mouseDown ? mouseDownReplay(_record.mouseDown) : null;
      if (_record.mutations) {
        _record.mutations.forEach(mutation => {
          mutationReplay(mutation)
        })
      }
    }, record.interval * (pro - 0))
  }

}

let createCover = () => {
  cover = document.createElement('div')
  mouse = document.createElement('img')
  mouse.src = mouseImageData;
  mouse.setAttribute('style', 'position:absolute;top: -20px;left: -20px;')
  toolsContainer.appendChild(mouse)
  cover.setAttribute('style', 'width: 100%;height: 100%;position: fixed;top: 0;left: 0;z-index: 9998;')
  document.body.appendChild(cover)
  document.body.appendChild(toolsContainer)
}

/**
 * 
 * 窗口状态
 */
let windowReplay = (data) => {
  window.scrollTo(data.sx, data.sy)
}

/**
 * 鼠标位置移动
 */
let mouseMoveReplay = (data) => {
  mouse.style.left = data.x + 'px'
  mouse.style.top = data.y + 'px'
}

/**
 * 鼠标点击
 */
let mouseDownReplay = (data) => {
  let clone = mouseDownPoint.cloneNode();
  clone.style.top = data.y + 'px'
  clone.style.left = data.x + 'px'
  toolsContainer.appendChild(clone)
}

let mutationReplay = data => {
  let $target = $(data.target)[0];
  switch (data.type) {
    case 'attributes':
      $target ? $target.setAttribute(data.attributeName, data.newValue) : null
      break;
    case 'characterData':
      $target ? $target.data = data.newValue : null
      break;
    case 'childList':
      if (data.prevNode) {
        let $prevNode = $(data.prevNode)
        $($prevNode.nextElementSibling).remove()
        data.addedNodes.forEach(val => $prevNode.after(val))
        break;
      }
      if (data.nextNode) {
        let $nextNode = $(data.nextNode)
        $($nextNode.previousElementSibling).remove()
        data.addedNodes.forEach(val => $nextNode.before(val))
        break;
      }
    case 'input':
      $target.value = data.newValue

    case 'scroll':
      $target.scrollTo(...data.newValue)
  }
}

export default {
  start
}
