// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
const renderLicenseBadge = license => {
  if (license) {
    return `![${license} License](https://img.shields.io/badge/license-${license.split(' ').join('%50')}-orange)
`;
  } else {
    return '';
  }
};

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
    if (element.content && element.header === 'Screenshots') {
      sectionList += `* [${element.header}](#${(element.header).toLowerCase()})
`;
    } else if (element.content) {
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

const renderUsage = usage => {
  return `${usage}`
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
      header: 'License',
      content: renderLicenseBadge(license)
    }
  ];

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
