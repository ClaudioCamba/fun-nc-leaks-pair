const https = require('node:https');
const fs = require('fs/promises')
const usernamePets = [];
const petsFile = [];

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
                usernamePets.push(element.username);
            }
           // request ----------------------------------------------------------------
            let countCalls = 0;
            for (let i = 0; i < usernamePets.length; i++) {
                const element = usernamePets[i];
                
                const options = {
                    hostname: 'nc-leaks.herokuapp.com',
                    path: `/api/people/${element}/pets`,
                    method: 'GET',
                }

                const req = https.request(options, (response) => {

                    let bodyJSON = "";

                    response.on('data', (data) => {
                        bodyJSON += data.toString();
                    })

                    response.on('end', () => {
                        const actualData = JSON.parse(bodyJSON);
                        countCalls++;
                        if(actualData.hasOwnProperty('person')){
                            petsFile.push(actualData.person);
                        };
                       
                        if (countCalls === usernamePets.length){
                            writeContent('pets.json', JSON.stringify(petsFile))
                            console.log(petsFile);
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

getInterests();


