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
            choices: ['Installation', 'Technologies Used', 'Contributing', 'Tests', 'Questions', 'License', 'Credits']
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
            type: 'input',
            name: 'installation',
            message: 'Please provide the installation instructions',
            when: ({ sections }) => {
                if (sections.indexOf('Installation') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: installationInput => {
                if (installationInput) {
                    return true;
                } else {
                    console.log('Please enter the installation info for your project!');
                    return false;
                }
            }
        },
        {
            type: 'list',
            name: 'license',
            message: 'Provide license information. (Required)',
            choices: ['MIT', 'Apache 2.0', 'artistic 2.0', 'MPL 2.0', 'Zlib', 'EPL 1.0', 'ISC', 'boost 1.0', 'cc0 1.0', 'cc by 4.0', 'WTFPL', 'unlicense', 'None'],
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
        },
        {
            type: 'checkbox',
            name: 'technologiesu',
            message: 'Select the technologies that your project was built with.',
            choices: ['HTML', 'CSS', 'JavaScript', 'Node.js', 'Express.js', 'Java'],
            default: 0,
            when: ({ sections }) => {
                if (sections.indexOf('Technologies Used') > -1) {
                    return true;
                } else {
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'contributing',
            message: 'Please provide the guidelines for contributing. (Required)',
            when: ({ sections }) => {
                if (sections.indexOf('Contributing') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: contributingInput => {
                if (contributingInput) {
                    return true;
                } else {
                    console.log('Please enter the guidelines for contributing!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'tests',
            message: 'Enter test information for your project. (Required)',
            when: ({ sections }) => {
                if (sections.indexOf('Tests') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: testsInput => {
                if (testsInput) {
                    return true;
                } else {
                    console.log('Please enter information required for running tests in your project!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'questions',
            message: 'Please provide an email address so you can get receive questions from others.',
            when: ({ sections }) => {
                if (sections.indexOf('Questions') > -1) {
                    return true;
                } else {
                    return false;
                }
            },
            validate: questionsInput => {
                if (questionsInput) {
                    return true;
                } else {
                    console.log('Provide an email address!');
                    return false;
                }
            }
        }
    ]);
};

    const creditQues = [
        {
            type: 'input',
            name: 'creditName',
            message: 'Please give your credit a name. (Required)',
            validate: creditName => {
                if (creditName) {
                    return true;
                } else {
                    console.log('Please enter a name for the credit!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'creditLink',
            message: 'Please provide a link for the credit. (Required)',
            validate: creditLink => {
                if (creditLink) {
                    return true;
                } else {
                    console.log('Please enter a name for the credit!');
                    return false;
                }
            }
        },
        {
            type: 'confirm',
            name: 'confirmAddCredit',
            message: 'Would you like to add another credit?',
            default: false
        }
    ]


addCredits = readmeInfo => {
    
    // initiates array for credits
    if (!readmeInfo.credits) {
        readmeInfo.credits = [];
    };
    console.log(`
==============
Add New Credit
==============
    `);
    return inquirer.prompt(creditQues)
    .then(creditData => {
        // adds credits to array
        readmeInfo.credits.push(creditData);
        // will call addCredits again based on user input
        if (creditData.confirmAddCredit) {
            return addCredits(readmeInfo);
        } else {
            return readmeInfo;
        }
    });
};



// Function call to initialize app
questions()
.then(creditResponse => {
    // calls function to add credits based on user selection
    if (creditResponse.sections.indexOf('Credits') > -1) {
        return addCredits(creditResponse);
    } else {
        return creditResponse;
    }
})
    .then(questionData => generateMarkdown(questionData))
    .then(readmeGenerated => writeFile(readmeGenerated))
    .catch(err => {
        console.log(err);
    });