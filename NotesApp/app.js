const fs = require('fs')

fs.writeFileSync('notes.txt', 'This file was created by Node.js')

fs.appendFileSync('notes.txt', '\nThis is appended to the file.\n')