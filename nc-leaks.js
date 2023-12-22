const https = require('node:https');
const fs = require('fs/promises')

const options = {
    hostname: 'nc-leaks.herokuapp.com',
    path: '/api/confidential',
    method: 'GET',
}

const writeContent = async (filename, data)=>{
    const sendInfo = await fs.writeFile(`./${filename}`,`${data}`, `utf8`);
    return sendInfo;
}

const req = https.request(options, (response) => {

    let bodyJSON = "";

    response.on('data', (data) => {
        bodyJSON += data.toString();
    })

    response.on('end', () => {
        const actualData = JSON.parse(bodyJSON);
        console.log(actualData);
        writeContent('instructions.md', actualData.instructions)
    })
})

req.on('error', (err) => {
    console.log(err)
})

req.end()