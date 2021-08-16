// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {

  switch (license) {
    case 'MIT':
    case 'Apache 2.0':
    case 'artistic 2.0':
    case 'MPL 2.0':
    case 'Zlib':
    case 'EPL 1.0':
    case 'ISC':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](https://opensource.org/licenses/${license.split(' ').join('%20')})`;
      break;
    case 'boost 1.0':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](https://www.boost.org/LICENSE_1_0.txt)`
      break;
    case 'cc0 1.0':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](http://creativecommons.org/publicdomain/zero/1.0/)`
      break;
    case 'cc by 4.0':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](https://creativecommons.org/licenses/by/4.0/)`
      break;
    case 'WTFPL':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](http://www.wtfpl.net/about/)`
      break;
    case 'unlicense':
      return `[![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%20')}-orange)](http://unlicense.org/)`
      break;
    default:
      return '';
      break;
  }
};

const renderLicenseSection = license => {
  if (license) {
    return `This project is licensed under the ${license} license.`;
  } else {
    return '';
  }
}

// returns a description and the live link of the project
const renderDescription = (description, link) => {
  if (link) {
    return `${description}

> Live demo [_here_](${link}).`;
  } else {
    return `${description}`;
  }
};


const renderTableOfContents = sectionArr => {
  let sectionList = '';
  sectionArr.forEach((element) => {
    if (element.content) {
      sectionList += `* [${element.header}](#${(element.header).toLowerCase().split(' ').join('-')})
`;
    }
  });
  return sectionList;
};



const renderInstallation = install => {
  if (install) {
    return `To use this project, Please install:
\`\`\`
${install}
\`\`\``
  } else {
    return '';
  }
};

const renderTechnologiesUsed = technologiesUsed => {
  let technologies = '';

  if (technologiesUsed) {
    technologiesUsed.forEach(element => {
      technologies += `
* ${element}`
    });
    return `${technologies}`;
  } else {
    return '';
  };
};

const renderUsage = usage => {
  return `${usage}`
};

const renderTests = test => {
  if (test) {
    return `You'll need to install the following to run tests on the project:
\`\`\`
${test}
\`\`\`
and run \`npm run test\` from the command terminal.`
  } else {
    return '';
  };
};

const renderQuestions = (email, github, repo) => {
  if (email) {
    return `If you have any inquiry about the repository, [open a new issue](https://github.com/${github}/${repo}/issues) you can also contact me via email at ${email}. You can find more of my work on my GitHub profile and portfolio, [${github}](https://github.com/${github}/).`
  }
}

const createCredits = creditItem => {
  let allCredits = '';
  if (creditItem) {
      creditItem.forEach((credit) => {
      allCredits += `* [${credit.creditName}](${credit.creditLink})
`;
      });
      return allCredits;
  } else {
      return '';
  }
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
  const { title, github, repository, license } = data;
  let readmeSection = '';
  const sectionArr = [
    {
      header: 'Installation',
      content: renderInstallation(data.installation)
    },
    {
      header: 'Usage',
      content: renderUsage(data.usage)
    },
    {
      header: 'Technologies Used',
      content: renderTechnologiesUsed(data.technologiesu)
    },
    {
      header: 'Contributing',
      content: data.contributing
    },
    {
      header: 'Tests',
      content: renderTests(data.tests)
    },
    {
      header: 'License',
      content: renderLicenseSection(license)
    },
    {
      header: 'Questions',
      content: renderQuestions(data.questions, github, repository)
    },
    {
      header: 'Credits',
      content: createCredits(data.credits)
    }
  ];

  sectionArr.forEach((sectionElement) => {
    if (sectionElement.content) {
      readmeSection += `## ${sectionElement.header}
${sectionElement.content}
`;
    }
  });

  return `# ${title}
[![Issues](https://img.shields.io/github/issues/${github}/${repository})](https://github.com/${github}/${repository}/issues) 
[![Issues](https://img.shields.io/github/contributors/${github}/${repository})](https://github.com/${github}/${repository}/graphs/authors)
${renderLicenseBadge(license)}
## Description
${renderDescription(data.description, data.link)}
## Contents
${renderTableOfContents(sectionArr)}
${readmeSection}
`;
}

module.exports = generateMarkdown;
