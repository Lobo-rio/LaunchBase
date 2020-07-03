module.exports = {
    fieldsCreate(data){
        const fields = Object.keys(data)
        return fields
    }, 
    valuesCreate(data){
        let values = ''

        let number = 1
        const field = '$'

        for (let item in data) {
            values += `${field}${number},`
            number++
        }

        values = values.substring(0,(values.length - 1))
        return values
    } 
}