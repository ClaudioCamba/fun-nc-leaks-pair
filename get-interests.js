const https = require('node:https');
const fs = require('fs/promises')

// const options = {
//     hostname: 'nc-leaks.herokuapp.com',
//     path: `/api/people/${}/interests`,
//     method: 'GET',
// }

// const request = https.request(options)

const readContent = async (filename)=>{
    const getInfo =  await fs.readFile(`./${filename}`, `utf8`);
    return { 'name': filename, 'content': getInfo, textLength: getInfo.replace(/ /g,'').length }
}

function getInterests(){
    readContent('northcoders.json')
        .then((data) => {
            const actualData = JSON.parse(data.content)
            // console.log(actualData)
            for (let i = 0; i < actualData.length; i++) {
                const element = actualData[i];
                console.log(element.username)
            }
        })
}

getInterests()