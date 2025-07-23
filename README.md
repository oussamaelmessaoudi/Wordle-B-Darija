# Wordle b’Darija 🇲🇦

A Wordle-style game built with React — but using **Darija** (Moroccan Arabic) words instead of English.

🎮 **Play it here**: 

[![Play Now](https://img.shields.io/badge/Play--Now-Wordly%20b'Darija-blue?style=for-the-badge)](https://oussamaelmessaoudi.github.io/Wordle-B-Darija)

## ⚙️ How it works

- You have 6 tries to guess a 5-letter **Darija** word
- After each guess, each letter gets a color:
  - 🟩 **Green** if it’s in the right place
  - 🟨 **Yellow** if it’s in the word but not in the right place
  - ⬜️ **Gray** if it’s not in the word
- Repeated letters are handled properly — no double-counting

## 🧠 Tech stack

- React (useState, useEffect)
- JavaScript
- No backend, no extra libraries

## 📁 How to run it

1. Clone the repo:

   
```bash
    git clone https://github.com/oussamaelmessaoudi/wordle-b-darija.git
    cd wordle-darija
```
   
Install dependencies:

    npm install

Run it locally:

    npm start

✅ Logic summary
  - Matching is done in two steps:

  - Mark all correct letters (right position)

  - Then mark “included” letters (right letter, wrong spot) without repeating letters that are already matched

  - This avoids bugs with words that have repeated letters like ddrba, ssta, etc.

📌 To-do
  - Add sound effects for win/loss

  - Add a dictionary check for valid Darija words

  - Add a keyboard 

  - Mobile styling

👨‍💻 Author
Built with love for Darija 🇲🇦

Feel free to fork, remix, or build on top of it.

---
