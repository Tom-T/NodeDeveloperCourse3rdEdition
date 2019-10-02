const fs = require("fs");
const chalk = require("chalk");

const readNote = title => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title)
  // if (duplicateNotes.length === 0){
  //const duplicateNote = notes.find((note) => note.title === title)
  const result = notes.find(note => note.title === title);
  if (result) {
    console.log(chalk.green(title), "\n\t", result.body);
  } else {
    console.log(chalk.red.bold(title + " not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.blue.bgYellow.bold("Your notes:"));
  notes.forEach(note => console.log(chalk.blue.inverse("\t", note.title)));
};

const removeNote = title => {
  const notes = loadNotes();
  const newNotes = notes.filter(note => note.title !== title);

  //Because we can't compare the actual objects to eachother we will see if the lengths differ.
  if (newNotes.length === notes.length) {
    console.log(chalk.red.bold(title + " was not found!"));
  } else {
    saveNotes(newNotes);
    console.log(chalk.green(title + " removed."));
  }
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter((note) => note.title === title)
  // if (duplicateNotes.length === 0){
  //const duplicateNote = notes.find((note) => note.title === title)
  if (!notes.find(note => note.title === title)) {
    notes.push({
      title: title,
      body: body
    });
    console.log(chalk.green(title + " added."));
    saveNotes(notes);
  } else {
    console.log(chalk.red.bold(title + " previously recorded."));
  }
};

const saveNotes = notes => {
  const dataJSON = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataJSON);
};

const loadNotes = () => {
  try {
    //const data = JSON.parse(fs.readFileSync('notes.json').toString())
    const dataBuffer = fs.readFileSync("notes.json");
    const dataJSON = dataBuffer.toString();
    return JSON.parse(dataJSON);
  } catch (e) {
    return [];
  }
};

module.exports = {
  readNote: readNote,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes
};
