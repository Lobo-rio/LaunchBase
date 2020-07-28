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
    },
    cpfCnpj(value) {
        value = value.replace(/\D/g, "")

        if (value.length > 14) value = value.slice(0, -1)

        if (value.length > 11) {

            value = value.replace(/(\d{2})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1/$2")
            value = value.replace(/(\d{4})(\d)/,"$1-$2")
        } else {
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1.$2")
            value = value.replace(/(\d{3})(\d)/,"$1-$2")
        }

        return value
    },
    cep(value) {
        value = value.replace(/\D/g, "")

        if (value.length > 8) value = value.slice(0, -1)

        value = value.replace(/(\d{5})(\d)/,"$1-$2")

        return value
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

        photosUpload.files.forEach(file => dataTransfer.items.add(file))

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
    },
    removeOldPhoto(event){
        const photoDiv = event.target.parentNode

        if(photoDiv.id){
            const removedFiles = document.querySelector('input[name="removed_files"')
            if (removedFiles){
                removedFiles.value += `${photoDiv.id},`
            }
        }

        photoDiv.remove()
    }
}

const imageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(event){
        const { target } = event

        imageGallery.previews.forEach(preview => preview.classList.remove('active'))
        target.classList.add('active')

        imageGallery.highlight.src = target.src
        lightbox.image.src = target.src
    }
}

const lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open(){
        lightbox.target.style.opacity = 1
        lightbox.target.style.top = 0
        lightbox.target.style.button = 0
        lightbox.closeButton.style.top = 0
    },
    close(){
        lightbox.target.style.opacity = 0
        lightbox.target.style.top = "-100%"
        lightbox.target.style.button = "initial"
        lightbox.closeButton.style.top = "-80px"
    }
}

const Validate = {
    apply(input, func) {
        Validate.clearErrors(input)

        let results = Validate[func](input.value)
        input.value = results.value

        if (results.error) 
            Validate.displayError(input, results.error)
    },
    displayError(input, error) {
        const div = document.createElement('div')
        div.classList.add('error')
        div.innerHTML = error
        input.parentNode.appendChild(div)
        input.focus()
    },
    isEmail(value){
        let error = null
        const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/

        if (!value.match(mailFormat)) error = "Email inválido!"
        
        return {
            error,
            value
        }
    },
    clearErrors(input) {
        const errorDiv = input.parentNode.querySelector(".error")

        if (errorDiv) errorDiv.remove()
    }
}