import axois from 'axios'

export default function canvasTransform(canvasNode) {
    canvasNode.toBlob(blob => {
        axois.post('http://localhost:9001/canvasBlob', {
            data: {
                blob
            },
            headers: {
                contentType: ''
            }
        })
    })
}