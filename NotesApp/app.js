const notes = require('./notes')
const chalk = require('chalk')
const yargs = require('yargs') 

// console.log(notes())
// console.log(chalk.green.bold.inverse.dim('Success!'))
// console.log(process.argv[2])
// // fs.appendFileSync(fname, '\nThis is appended to the file: '+ fname +'\n')

//const command = process.argv[2]
//console.log(process.argv)
// if (command === "add"){
//   console.log("Adding Note")
// }
// else if (command === "remove"){
//   console.log("Removing Note")
// }



yargs.command({
  command: "add",
  aliases: "a",
  description: "Add a new Note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: 'string'
    },
    body: {
      describe: "Note text/body",
      demandOption: true,
      type: 'string'
    }
  },
  handler: function (arg) {
    console.log("Adding a note. \n  Title:", arg.title, "\n  Body: ", arg.body)
  }
})

yargs.command({
  command: "delete",
  aliases: ["d", "del"],
  description: "Delete a Note",
  handler: function () {
    console.log("Removing a note")
  }
})

yargs.command({
  command: "list",
  aliases: "l",
  description: "List a new Note",
  handler: function (arg) {
    console.log("list" + arg)
  }
})

yargs.command({
  command: "read",
  aliases: "r",
  description: "Read a Note",
  handler: function () {
    console.log("read")
  }
})

yargs.parse()

//console.log(yargs.argv)
// console.log(yargs.argv.title)

