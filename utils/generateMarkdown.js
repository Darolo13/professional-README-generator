// TODO: Create a function that returns a license badge based on which license is passed in
// If there is no license, return an empty string
function renderLicenseBadge(license) {}

// TODO: Create a function that returns the license link
// If there is no license, return an empty string
function renderLicenseLink(license) {}

// TODO: Create a function that returns the license section of README
// If there is no license, return an empty string
function renderLicenseSection(license) {}

// returns a description and the live link of the project
const renderDescription = ( description, link ) => {
  if (link) {
    return `${description}

    > Live demo [_here_](${link}).`;
  } else {
    return `${description}`;
  }
};

// TODO: Create a function to generate markdown for README
function generateMarkdown(data) {
const { title, github, repository, license } = data;

  return `# ${title}
[![Issues](https://img.shields.io/github/issues/${github}/${
  repository
})](https://github.com/${github}/${
  repository
}/issues) [![Issues](https://img.shields.io/github/contributors/${
  github
}/${repository})](https://github.com/${github}/${
  repository
}/graphs/contributors)
`;
}

module.exports = generateMarkdown;
