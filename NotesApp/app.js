const fs = require('fs')
const fname = 'notes.txt'
fs.writeFileSync(fname, 'This file was created by Node.js')

fs.appendFileSync(fname, '\nThis is appended to the file: '+ fname +'\n')