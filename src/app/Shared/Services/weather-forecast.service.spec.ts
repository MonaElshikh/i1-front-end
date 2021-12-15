import { TestBed } from '@angular/core/testing';

import { WeatherForecastService } from './weather-forecast.service';

describe('WeatherForecastService', () => {
  let service: WeatherForecastService;

  beforeEach(() => {
    TestBed.configureTestingModule({ teardown: { destroyAfterEach: false } });
    service = TestBed.inject(WeatherForecastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
