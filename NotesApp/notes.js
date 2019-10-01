const fs = require('fs')

const getNotes = () => {
  return "Your Notes...";
};

const removeNote = (title) => {
  const notes = loadNotes()
  const newNotes = notes.filter((note) => {
    return note.title !== title
  })

  //Because we can't compare the actual objects to eachother we will see if the lengths differ.
  if (newNotes.length === notes.length){
    console.log("Nothing removed")
  } else {
    console.log("Removed note: " + title)
    saveNotes(newNotes)
  }
}

const addNote = (title, body) => {
  const notes = loadNotes()
  const duplicateNotes = notes.filter((note) => {
    return note.title === title
  })
  if (duplicateNotes.length === 0){
    notes.push({
      title: title,
      body: body
    })
    console.log("New note added")
  saveNotes(notes)
  }else { console.log("Note title taken")}
};

const saveNotes = (notes) => {
  const dataJSON = JSON.stringify(notes)
  fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = () => {
  try {
    //const data = JSON.parse(fs.readFileSync('notes.json').toString())
    const dataBuffer = fs.readFileSync('notes.json')
    const dataJSON = dataBuffer.toString()
    return JSON.parse(dataJSON)
  } catch (e) {
    return []
  }
}

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote
};
