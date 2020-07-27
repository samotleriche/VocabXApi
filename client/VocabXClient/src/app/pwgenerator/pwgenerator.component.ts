import { Component, OnInit } from '@angular/core';
import { parse } from 'path';

@Component({
  selector: 'app-pwgenerator',
  templateUrl: './pwgenerator.component.html',
  styleUrls: ['./pwgenerator.component.css'],
})
export class PwgeneratorComponent implements OnInit {
  constructor() {}

  password = '';
  length = 0;
  useLetters: boolean = false;
  useNumbers: boolean = false;
  useSymbols: boolean = false;

  isDisabled: boolean = true;

  ngOnInit(): void {}

  onGenerateClick() {
    const numbers = '1234567890';
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    const symbols = '!@#$%^&*()';

    let validChars = '';

    if (this.useLetters) {
      validChars += letters;
    }
    if (this.useNumbers) {
      validChars += numbers;
    }
    if (this.useSymbols) {
      validChars += symbols;
    }

    let generatedPW = '';
    for (let i = 0; i < this.length; i++) {
      const index = Math.floor(Math.random() * validChars.length);
      generatedPW += validChars[index];
    }

    this.password = generatedPW;
  }

  onChangeUseLetters() {
    this.useLetters = !this.useLetters;
  }

  onChangeUseNumbers() {
    this.useNumbers = !this.useNumbers;
  }

  onChangeUseSymbols() {
    this.useSymbols = !this.useSymbols;
  }

  onChangeLength(value: string) {
    const parsedValue = parseInt(value);

    if (!isNaN(parsedValue)) {
      this.length = parsedValue;
    }
  }
}
