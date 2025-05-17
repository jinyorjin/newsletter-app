const fs = require("fs");
fs.writeFileSync("note.txt", "This message is coming from Node.js.");
fs.appendFileSync("note.txt", " Welcome to SIT 313");
fs.appendFileSync("note.txt", process.argv[2]);
