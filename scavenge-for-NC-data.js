const getInterests = require('./get-interests')
const getPets = require('./get-pets')
const req = require('./internet-tasks')

const scavengeData = async () => {
    return await req

}

scavengeData()
    .then((data) => {
        setTimeout(() => {
            console.log(data)
            getInterests()
            getPets()
        }, 1000)
    })
