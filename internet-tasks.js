const https = require('node:https');
const fs = require('fs/promises');

const writeContent = async (filename, data)=>{
    const sendInfo = await fs.writeFile(`./${filename}`,`${data}`, `utf8`);
    return sendInfo;
}

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/people',
    method: 'GET',
}

const req = https.request(options, (response) => {

    let bodyJSON = "";

    response.on('data', (data) => {
        bodyJSON += data.toString();
    })

    response.on('end', () => {
        const actualData = JSON.parse(bodyJSON);
        const northcodersPeople = []
        // console.log(actualData.people);
        for (let i = 0; i < actualData.people.length; i++) {
            const element = actualData.people[i];
            if (element.job.workplace === 'northcoders'){
                northcodersPeople.push(element);
            }
        }
        const stringifiedNC = JSON.stringify(northcodersPeople)
        writeContent('northcoders.json', stringifiedNC)
    })
})

req.on('error', (err) => {
    console.log(err)
})

req.end()