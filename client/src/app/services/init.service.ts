import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as config from '../../assets/config.json';

export function initFactory(initService: InitService) {
  return () => initService.init();
}

@Injectable({
  providedIn: 'root',
})
export class InitService {
  config: any;
  constructor(private http: HttpClient) {}

  init() {
    this.config = config;
  }
}
