const Mask = {
    apply(input, func) {
        setTimeout(function () {
            input.value = Mask[func](input.value)
        }, 1)
    },
    formatBRL(value) {
        value = value.replace(/\D/g, "")

        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value/100)
    }
}

const photosUpload = {
    input: "",
    preview: document.querySelector('#photos-preview'),
    uploadLimit: 6,
    files: [],
    handleFileInput(event) {
        
        const { files: fileList } = event.target
        photosUpload.input = event.target
        
        if (photosUpload.hasLimit(event)) return

        Array.from(fileList).forEach(file => {

            photosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {
                const image = new Image()
                image.src = String(reader.result)

                const div = photosUpload.getContainer(image)
                photosUpload.preview.appendChild(div)
            }
            
            reader.readAsDataURL(file)
            
        })

        photosUpload.input.files = photosUpload.getAllFiles()
    },
    getContainer(image) {
        const div = document.createElement('div')
        div.classList.add('photo')

        div.onclick = photosUpload.removePhoto

        div.appendChild(image)
        div.appendChild(photosUpload.getRemoveButton())

        return div
    },
    hasLimit(event) {
        const { uploadLimit, input: fileList } = photosUpload

        if ( fileList.length > uploadLimit ) {
            alert(`Você atingiu o limite maximo de fotos, que são ${uploadLimit}`)
            event.preventDefault()
            return true
        }

        return false
    },
    getAllFiles() {
        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        photosUpload.files.forEach(file => dataTransfer.itens.add(file))

        return dataTransfer.files
    },
    getRemoveButton(){
        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = 'close'
        return button
    },
    removePhoto(event) {
        const photoDiv = event.target.parentNode
        const photosArray = Array.from(photosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        photosUpload.files.splice(index, 1)
        photosUpload.input.files = photosUpload.getAllFiles()

        photoDiv.remove()
    }
}