// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const generateMarkdown = require('./utils/generateMarkdown.js');
const writeFile = require('./utils/generateFile');

// TODO: Create an array of questions for user input
const questions = () => { 
    return inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project. (Required)',
        validate: titleInput => {
            if (titleInput) {
                return true;
            } else {
                console.log('Please enter the title of your project');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'github',
        message: 'Please provide your GitHub username. (Required)',
        validate: githubInput => {
            if (githubInput) {
                return true;
            } else {
                console.log('Please enter your GitHub username');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'repository',
        message: 'Please enter the name of your repository. (Required)',
        validate: repoName => {
            if (repoName) {
                return true;
            } else {
                console.log('Please enter the name of your repository')
            }
        }
    },
    {
        type: 'input',
        name: 'description',
        message: 'Provide a description of your project. (Required)',
        validate: descriptionInput => {
            if (descriptionInput) {
                return true;
            } else {
                console.log('Please enter a description');
                return false;
            }
        }
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Please provide instructions for using your project. (Required)',
        validate: usageInput => {
            if (usageInput) {
                return true;
            } else {
                console.log('Provide instructions for using your project');
                return false;
            }
        }
    },
    {
        type: 'checkbox',
        name: 'sections',
        message: 'Would you like to include any of the following sections in your README?',
        choices: ['installation', 'screenshots', 'technologies used', 'contributing', 'tests', 'support', 'license', 'project status', 'credits']
    }
]);
};




// Function call to initialize app
questions()
.then(questionData => generateMarkdown(questionData))
.then(readmeGenerated => writeFile(readmeGenerated))
.catch(err => {
    console.log(err);
});