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
    },
    date: function(timestamp) {
        const date = new Date(timestamp)
        const dateNew = new Date()

        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        const time = (dateNew.getUTCFullYear() - year)

        return {
            year,
            month,
            day,
            serviceTime: `${time}`,
            birthDay: `${day}/${month}`,
            iso: `${year}-${month}-${day}`,
            format: `${day}-${month}-${year}`
        }
    } 
}