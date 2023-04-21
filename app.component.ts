import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'frontEnd';
  nameA: any;
  dataA: any;
  nameB: any;
  dataB: any;
  isACorrect: any;
  correct: any;
  total: any;
  statusMessage: any;
  question: any;
  correctAnswer: any;
  stringAnswer: any;
  percent: any;

  constructor(private apiService: ApiService) { };
  ngOnInit() {
    this.select()
    this.correct = 0;
    this.total = 0;
    this.statusMessage = 'Choose an Option'
    this.percent = 0.00;
  }

  select() {
    if (this.total > 0) {
      this.percent = Math.floor(this.correct / this.total * 10000) / 100;
    }
    let x = Math.random();
    if (x < 0.22) {
      this.population()
    } else if (x < 0.44) {
      this.area()
    } else if (x < 0.66) {
      this.gdp()
    } else if (x < 0.78) {
      this.carbon()
    } else {
      this.capital()
    }
  }

  gdp() {
    this.apiService.getGDP().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameA = str.substring(0, str.indexOf("\""))
      this.dataA = str.substring(str.indexOf("\"") + 8, str.length - 2)
      if (this.dataA === "0") {
        this.gdp()
      }
    });

    this.apiService.getGDP().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameB = str.substring(0, str.indexOf("\""))
      this.dataB = str.substring(str.indexOf("\"") + 8, str.length - 2)
      if (this.dataB === "0") {
        this.gdp()
      }
    });
    this.question = 'Which country has a higher GDP?'
    this.stringAnswer = false;
  }
  population() {
    this.apiService.getPopulation().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameA = str.substring(0, str.indexOf("\""))
      this.dataA = str.substring(str.indexOf("\"") + 15, str.length - 2)
    });

    this.apiService.getPopulation().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameB = str.substring(0, str.indexOf("\""))
      this.dataB = str.substring(str.indexOf("\"") + 15, str.length - 2)
    });
    this.question = 'Which country has a higher population?'
    this.stringAnswer = false;
  }

  area() {
    this.apiService.getArea().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameA = str.substring(0, str.indexOf("\""))
      this.dataA = str.substring(str.indexOf("\"") + 9, str.length - 2)
    });

    this.apiService.getArea().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameB = str.substring(0, str.indexOf("\""))
      this.dataB = str.substring(str.indexOf("\"") + 9, str.length - 2)
    });
    this.question = 'Which country has a larger land area?'
    this.stringAnswer = false;
  }

  carbon() {
    this.apiService.getCarbon().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameA = str.substring(0, str.indexOf("\""))
      this.dataA = str.substring(str.indexOf("\"") + 11, str.length - 2)
      if (this.dataA === "0") {
        this.carbon()
      }
    });

    this.apiService.getCarbon().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameB = str.substring(0, str.indexOf("\""))
      this.dataB = str.substring(str.indexOf("\"") + 11, str.length - 2)
      if (this.dataB === "0") {
        this.carbon()
      }
    });
    this.question = 'Which country has higher per-capita carbon emissions?'
    this.stringAnswer = false;
  }

  capital() {
    let correctAorB = Math.round(Math.random())
    this.apiService.getCapital().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameA = str.substring(0, str.indexOf("\""))
      this.dataA = str.substring(str.indexOf("\"") + 13, str.length - 3)
      if (correctAorB === 0) {
        this.question = "Which country has a capital of " + str.substring(str.indexOf("\"") + 13, str.length - 3)
        this.correctAnswer = str.substring(str.indexOf("\"") + 13, str.length - 3)
      }
    });

    this.apiService.getCapital().subscribe(data => {
      let str = JSON.stringify(data).substring(10)
      this.nameB = str.substring(0, str.indexOf("\""))
      this.dataB = str.substring(str.indexOf("\"") + 13, str.length - 3)
      if (correctAorB === 1) {
        this.question = "Which country has a capital of " + str.substring(str.indexOf("\"") + 13, str.length - 3)
        this.correctAnswer = str.substring(str.indexOf("\"") + 13, str.length - 3)
      }
    });
    this.isACorrect = (correctAorB === 0);
    this.stringAnswer = true
  }

  selectAnswer(choseA: boolean) {
    this.total++;
    if (this.stringAnswer) {
      this.selectOption(choseA)
    } else {
      this.selectGreater(choseA)
    }
  }

  selectOption(choseA: boolean) {
    if (this.isACorrect === choseA) {
      this.correct++;
      this.statusMessage = 'Correct!'
    } else {
      this.statusMessage = 'Incorrect!'
    }
    this.select()
  }

  selectGreater(choseA: boolean) {
    this.isACorrect = parseInt(this.dataA) > parseInt(this.dataB);
    if (this.isACorrect === choseA) {
      this.correct++;
      this.statusMessage = 'Correct!'
    } else {
      this.statusMessage = 'Incorrect!'
    }
    this.select()
  }

  recordScore() {
    this.apiService.postHighscore(this.correct, this.total).subscribe(data => {
      //JSON.stringify(data)
      //console.log(data)
    });
    this.ngOnInit()
  }

  protected readonly JSON = JSON;
  protected readonly status = status;
}
