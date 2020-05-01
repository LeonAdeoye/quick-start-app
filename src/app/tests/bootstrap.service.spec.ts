import { fakeAsync, inject, TestBed } from '@angular/core/testing';
import { BootstrapService } from '../services/bootstrap.service';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { MessageService } from "../services/message.service";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { MessageMethod, MessageTransport } from "../models/types";
import { Subject } from "rxjs";

describe('BootstrapService', () =>
{
  let bootstrapService: BootstrapService;
  const spyConfigurationService = jasmine.createSpyObj('ConfigurationService', ['loadAllConfigurations', 'getAllConfigurations','setCurrentUser', 'getCurrentUser']);
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log', 'initialize']);
  spyConfigurationService.getAllConfigurations.and.returnValue([]);

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
      [
        { provide: ConfigurationService, useValue: spyConfigurationService },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    }).compileComponents();

    bootstrapService = TestBed.inject(BootstrapService);

  });

  it('should be created', () =>
  {
    expect(bootstrapService).toBeTruthy();
  });

  describe('constructor', () =>
  {
    it('should call configuration service loadAllConfigurations method', inject([LoggingService, ConfigurationService], (loggingService, configurationService) =>
    {
      // Act
      new BootstrapService(loggingService, configurationService);
      // Assert
      expect(configurationService.loadAllConfigurations).toHaveBeenCalled();
    }));
  });
});
