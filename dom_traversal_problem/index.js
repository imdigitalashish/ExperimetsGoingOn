const fs = require('fs');

fs.readFile('index.html', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }

    // RegEx to get contents jo body ke andar milega you can refer to regex guide waha sb likha hai
    const unclosedTagRegex = /<(\w+)(?![^>]*<\/\1>)[^>]*>/g;

    let isFirstTag = true;

    // Idhr just ignoring the first tag jo isse milega
    const correctedHtml = data.replace(unclosedTagRegex, (match, tagName) => {
        // Check if the tag is already closed
        if (data.includes(`</${tagName}>`)) {
            return match; 
        } else {
            // first tag mila then we set to false, so subsequent wale ko close kr sake
            if (isFirstTag) {
                isFirstTag = false;
                return match;
            } else {
                return `<${tagName}></${tagName}>`; // Close the tag
            }
        }
    });

    // Write the corrected HTML back to the file
    fs.writeFile('index.html', correctedHtml, 'utf8', (writeErr) => {
        if (writeErr) {
            console.error('Error writing to the file:', writeErr);
            return;
        }
        console.log('Tags checked and closed successfully in index.html.');
    });
});
