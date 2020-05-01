import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from '../app.component';
import { ConfigurationService } from "../services/configuration.service";
import { BootstrapService } from "../services/bootstrap.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigurationServiceMock } from "./mock-configuration.service";


describe('AppComponent', () =>
{
  beforeEach(async(() =>
  {
    const spyBootstrapService = jasmine.createSpyObj('BootstrapService', ['launch']);
    const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

    TestBed.configureTestingModule({
      declarations:
      [
        AppComponent
      ],
      imports:
      [
        HttpClientTestingModule
      ],
      providers: [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: BootstrapService, useValue: spyBootstrapService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () =>
  {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // TODO update app's name here
  it(`should have as title 'quick-start-app'`, () =>
  {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    // TODO update app's name here
    expect(app.appName).toEqual('quick-start-app');
  });
});
