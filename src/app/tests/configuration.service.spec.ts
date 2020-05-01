import { TestBed, inject, async } from '@angular/core/testing';
import { ConfigurationService } from '../services/configuration.service';
import { LoggingService } from "../services/logging.service";
import { MessageService } from "../services/message.service";
import { Configuration } from "../models/configuration";
import { of, Subject } from "rxjs";
import { MessageServiceMock } from "./mock-message.service";
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { MessageMethod, MessageTransport, ServiceUpdate } from "../models/types";


describe('ConfigurationService', () =>
{
  let configurationService: ConfigurationService;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

  const testResponseData =
    [
      new Configuration("Horatio","age", "7", "papa", "now", "20121223"),
      new Configuration("Harper","age", "3", "papa", "now", "20160615"),
      new Configuration("Saori","age", "45", "papa", "now", "19750602")
    ];

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      providers:
      [
        { provide: MessageService, useClass: MessageServiceMock },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    }).compileComponents();

    configurationService = TestBed.inject(ConfigurationService);
  });

  it('should be created', () =>
  {
    expect(configurationService).toBeTruthy();
  });

  describe('setCurrentUser', () =>
  {
    it('should set the current user', () =>
    {
      // Act
      configurationService.setCurrentUser("Horatio");
      // Assert
      expect(configurationService.getCurrentUser()).toBe("Horatio");
    });
  });

  describe('saveConfiguration', () =>
  {
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let configuration = new Configuration();
      spyOn(messageService, 'send').and.returnValues(new Subject());
      // Act
      configurationService.saveConfiguration(configuration);
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(jasmine.any(Message));
    }));
  });

  describe('deleteConfiguration', () =>
  {
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration?id=2012-12-23`, null, MessageTransport.HTTP, MessageMethod.DELETE);
      spyOn(messageService, 'send').and.returnValues(new Subject());
      // Act
      configurationService.deleteConfiguration('2012-12-23');
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(message);
    }));
  });

  describe('loadAllConfigurations', () =>
  {
    it('should call message service send', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`, null, MessageTransport.HTTP, MessageMethod.GET);
      spyOn(messageService, 'send').and.returnValues(new Subject());
      // Act
      configurationService.loadAllConfigurations();
      // Assert
      expect(messageService.send).toHaveBeenCalledWith(message);
    }));

    it("should return list of configurations", async(inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      spyOn(messageService, 'send').and.returnValue(of(testResponseData));
      // Act
      configurationService.loadAllConfigurations();
      // Assert
      expect(configurationService.getAllConfigurations()).toEqual(testResponseData);
    })));

    it("should call serviceUpdateSubject's next method", async(inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      spyOn(messageService, 'send').and.returnValue(of(testResponseData));
      spyOn(configurationService.serviceUpdateSubject, 'next');
      // Act
      configurationService.loadAllConfigurations();
      // Assert
      expect(configurationService.serviceUpdateSubject.next).toHaveBeenCalledWith(ServiceUpdate.REFRESH);
    })));
  });

  describe('getConfigurationValue', () =>
  {
    it('should return the correct value matching the owner and key', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      spyOn(messageService, 'send').and.returnValue(of(testResponseData));
      configurationService.loadAllConfigurations();
      // Act
      let value = configurationService.getConfigurationValue("Horatio", "age");
      // Assert
      expect(value).toEqual("7");
    }));

    it('should return empty string of a matching owner and key cannot be found', inject([MessageService, ConfigurationService], (messageService, configurationService) =>
    {
      // Arrange
      spyOn(messageService, 'send').and.returnValue(of(testResponseData));
      configurationService.loadAllConfigurations();
      // Act
      let value = configurationService.getConfigurationValue("Horatio", "surname");
      // Assert
      expect(value).toEqual("");
    }));
  });
});


