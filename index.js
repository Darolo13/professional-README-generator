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
            choices: ['Installation', 'Screenshots', 'Technologies Used', 'Contributing', 'Tests', 'Questions', 'License', 'Credits']
        },
        {
            type: 'input',
            name: 'link',
            message: 'Enter the GitHub link to your project. (Required)',
            validate: githubLink => {
                if (githubLink) {
                    return true;
                } else {
                    console.log('Please enter a link for your GitHub project');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Provide license information. (Required)',
            choices: ['MIT', 'afl-3.0', 'apache-2.0', 'artistic-2.0', 'bsl-1.0', 'bsd-2-clause', 'bsd-3-clause', 'bsd-3-clause-clear', 'cc', 'cc0-1.0', 'cc-by-4.0', 'cc-by-sa-4.0', 'wtfpl', 'ecl-2.0','epl-1.0', 'epl-2.0', 'eupl-1.1', 'agpl-3.0', 'gpl', 'gpl-2.0', 'gpl-3.0', 'lgpl', 'lgpl-2.1', 'lgpl-3.0', 'isc', 'lppl-1.3c', 'ms-pl', 'mpl-2.0', 'osl-3.0', 'postgresql', 'ofl-1.1', 'ncsa', 'unlicense', 'zlib'],
            default: 0,
            when: ({ sections }) => {
                if (sections.indexOf('License') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: licenseList => {
                if (licenseList) {
                    return true;
                } else {
                    console.log('Please provide license information!');
                    return false;
                }
            }
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