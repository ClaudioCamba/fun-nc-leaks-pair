const https = require('node:https');
const fs = require('fs/promises')
const usernameInterests = [];
const interestFile = [];

// reading ----------------------------------------------------------------
const readContent = async (filename)=>{
    const getInfo =  await fs.readFile(`./${filename}`, `utf8`);
    return { 'name': filename, 'content': getInfo, textLength: getInfo.replace(/ /g,'').length }
}

const writeContent = async (filename, data)=>{
    const sendInfo = await fs.writeFile(`./${filename}`,`${data}`, `utf8`);
    return sendInfo;
}

// get interest ----------------------------------------------------------------
function getInterests(){
    readContent('northcoders.json')
        .then((data) => {
            const actualData = JSON.parse(data.content)
  
            for (let i = 0; i < actualData.length; i++) {
                const element = actualData[i];
                // console.log(element.username)
                usernameInterests.push(element.username);
            }
           // request ----------------------------------------------------------------
            for (let i = 0; i < usernameInterests.length; i++) {
                const element = usernameInterests[i];
                
                const options = {
                    hostname: 'nc-leaks.herokuapp.com',
                    path: `/api/people/${element}/interests`,
                    method: 'GET',
                }

                const req = https.request(options, (response) => {

                    let bodyJSON = "";

                    response.on('data', (data) => {
                        bodyJSON += data.toString();
                    })

                    response.on('end', () => {
                        const actualData = JSON.parse(bodyJSON);
                        interestFile.push(actualData.person);
                        if (interestFile.length === usernameInterests.length){
                            console.log(interestFile)
                            writeContent('interests.json', JSON.stringify(interestFile))
                        }
                    });
                })

                req.on('error', (err) => {
                    console.log(err)
                })

                req.end()
            }

    })
}

module.exports = getInterests;
