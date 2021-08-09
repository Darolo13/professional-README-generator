const fs = require('fs');

// TODO: Create a function to write README file
const writeFile = fileContent => {
        fs.writeFile('./dist/README.md', fileContent, err => {
            if (err) {
                throw (err);

                return;
            }
            console.log('README generated!');
        });
};

module.exports = writeFile;