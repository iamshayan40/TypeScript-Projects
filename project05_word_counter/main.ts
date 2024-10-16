#! /usr/bin/env node
import inquirer from "inquirer";

async function countCharactersAndWords() {
  const response = await inquirer.prompt([
    {
      type: 'input',
      name: 'paragraph',
      message: 'Enter an English paragraph:',
    }
  ]);

  const { paragraph } = response;

  // Count characters without whitespaces
  const charactersWithoutSpaces = paragraph.replace(/\s/g, '').length;

  // Count words without whitespaces
  const wordCount = paragraph.split(/\s+/).filter(Boolean).length;

  console.log(`Character count (excluding whitespaces): ${charactersWithoutSpaces}`);
  console.log(`Word count (excluding whitespaces): ${wordCount}`);
}

countCharactersAndWords();
