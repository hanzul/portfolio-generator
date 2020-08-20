//used to allow of npm inquirer module
const inquirer = require("inquirer");
//used for read /write files
const fs = require('fs');


const generateMarkdown = require("./utils/generateMarkdown");
const { getMaxListeners } = require("process");

// array of questions for user
const questions = [{
    type: "input",
    message: "What is your project title?",
    name: "title",
},
{
    type: "input",
    message: "Enter Description of your project : ",
    name: "description",

},
{
    type: "input",
    message: "What are the installation instruction for your project?",
    name: "installation",
    default: "There are no specific intallation for this project"
    
},
{
    type: "input",
    message: "Describe use of this project? ",
    name: "usage",
},
{
    type: "list",
        name: "license",
        message: "Please choose a license you used for this project.",
        choices: [
            "GNU GPLv3",
            "GNU LGPLv3",
            "Mozilla",
            "MIT",
            "Apache",
            "Boost",
        ]
},
{
    type: "input",
    message: "Describe how to Contribute to this project.",
    name: "contribution",
    

},
{
    type: "input",
    message: "Please enter if any testing protocols you used for your project?",
    name: "test",
    default: "No test provided",
},
{
    type: "input",
    message: "Enter your gitHub Username :",
    name: "userName",
},
{
    type: "input",
    message : "Enter your e-mail",
    name: "userEmail",
    
}

];



// function to write README file
function writeToFile(fileName, data) {
    let readMeData = generateMarkdown(data);
    fs.writeFileSync(fileName, readMeData, function(err){
        if(err){
            return console.log(err);
        }
    });
}
//function for badge selection

function licenseBadge(value) {
    if (value === "GNU GPLv3") {
        return "[![License: GPL v3](https://img.shields.io/badge/License-GPLv3-blue.svg)](https://www.gnu.org/licenses/gpl-3.0)";
    } else if (value === "GNU LGPLv3") {
        return "[![License: LGPL v3](https://img.shields.io/badge/License-LGPL%20v3-blue.svg)](https://www.gnu.org/licenses/lgpl-3.0)";
    } else if (value === "Mozilla") {
        return "[![License: MPL 2.0](https://img.shields.io/badge/License-MPL%202.0-brightgreen.svg)](https://opensource.org/licenses/MPL-2.0)";
    } else if (value === "MIT") {
        return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
    } else if (value === "Apache") {
        return "[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
    } else {
        return "[![License](https://img.shields.io/badge/License-Boost%201.0-lightblue.svg)](https://www.boost.org/LICENSE_1_0.txt)";
    }
}

// function to initialize program
function init() {
    inquirer.prompt(questions).then((data) => {
        console.log(JSON.stringify(data, null, 2));
        data.licenseBadge = licenseBadge(data.license);
        writeToFile("README.md", data);
    });

}

// function call to initialize program
init();