import { InjectionToken } from '@angular/core';
import { AppConfigInterface } from './config.interface';
import { environment } from '../../environments/environment';

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfigInterface>('AppConfig');

export const APP_CONFIG: AppConfigInterface = {
  apiEndpoint: environment.apiEndpoint,
}