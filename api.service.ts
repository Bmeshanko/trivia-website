
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }
  getCountries() {
    return this.http.get(
      'http://localhost:3000/countries');
  }
  getPopulation() {
    let id = Math.floor(Math.random() * 197) + 1
    return this.http.get(
      `http://localhost:3000/population/${id}`);
  }

  getGDP() {
    let id = Math.floor(Math.random() * 197) + 1
    return this.http.get(
      `http://localhost:3000/gdp/${id}`);
  }

  getArea() {
    let id = Math.floor(Math.random() * 197) + 1
    return this.http.get(
      `http://localhost:3000/area/${id}`);
  }

  getCarbon() {
    let id = Math.floor(Math.random() * 197) + 1
    return this.http.get(
      `http://localhost:3000/carbon/${id}`);
  }

  getCapital() {
    let id = Math.floor(Math.random() * 197) + 1
    return this.http.get(
      `http://localhost:3000/capital/${id}`);
  }

  postHighscore(correct: any, total: any) {
    return this.http.get(
      `http://localhost:3000/highscore/${correct}/${total}`);
  }
}
