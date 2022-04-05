import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class SpacexapiService {

  private BASE_URL = "https://api.spacexdata.com/v3/launches"

  constructor(private httpClient: HttpClient) { }

  getAllLaunches() {
    return this.httpClient.get(`${this.BASE_URL}`)
  }

  getLaunchById(id: number) {
    return this.httpClient.get(`${this.BASE_URL}/${id}`)
  }
}
