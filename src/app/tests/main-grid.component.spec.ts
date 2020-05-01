import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { MainGridComponent } from '../components/main-grid/main-grid.component';
import { GridSearchService } from "../services/grid-search.service";
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import createSpyObj = jasmine.createSpyObj;
import { GridSearchServiceMock } from "./mock-grid-search.service";
import { MatMenuModule } from "@angular/material/menu";
import { Configuration } from "../models/configuration";

describe('MainGridComponent', () =>
{
  let component: MainGridComponent;
  let fixture: ComponentFixture<MainGridComponent>;
  const spyLoggingService = createSpyObj('LoggingService', ['log', 'initialize']);

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        MainGridComponent
      ],
      imports:
      [
        HttpClientTestingModule,
        MatMenuModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: LoggingService, useValue: spyLoggingService },
        { provide: GridSearchService, useClass: GridSearchServiceMock }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(MainGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('refreshConfiguration', () =>
{
  it('should call configuration service loadAllConfigurations', inject([ConfigurationService], (configurationService) =>
  {
    // Arrange
    spyOn(configurationService, 'loadAllConfigurations');
    // Act
    component.refreshConfiguration();
    // Assert
    expect(configurationService.loadAllConfigurations).toHaveBeenCalled();
  }));
});

  describe('deleteConfiguration', () =>
  {
    it('should call configuration service deleteConfiguration if configuration selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService, 'deleteConfiguration');
      spyOn(component, "getSelectedConfiguration").and.returnValue(new Configuration("Horatio", "Age", "7", "Harper", "now", "20121223"));
      // Act
      component.deleteConfiguration();
      // Assert
      expect(configurationService.deleteConfiguration).toHaveBeenCalledWith("20121223");
    }));

    it('should not call configuration service deleteConfiguration if configuration is not selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService, 'deleteConfiguration');
      spyOn(component, "getSelectedConfiguration").and.returnValue(null);
      // Act
      component.deleteConfiguration();
      // Assert
      expect(configurationService.deleteConfiguration).not.toHaveBeenCalled();
    }));
  });

  describe('cloneConfiguration', () =>
  {
    it('should call configuration service cloneConfigurationSubject if configuration selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.cloneConfigurationSubject, 'next');
      spyOn(component, "getSelectedConfiguration").and.returnValue(new Configuration("Horatio", "Age", "7", "Harper", "now", "20121223"));
      // Act
      component.cloneConfiguration();
      // Assert
      expect(configurationService.cloneConfigurationSubject.next).toHaveBeenCalled();
    }));

    it('should not call configuration service cloneConfigurationSubject if configuration is not selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.cloneConfigurationSubject, 'next');
      spyOn(component, "getSelectedConfiguration").and.returnValue(null);
      // Act
      component.cloneConfiguration();
      // Assert
      expect(configurationService.cloneConfigurationSubject.next).not.toHaveBeenCalled();
    }));
  });

  describe('editConfiguration', () =>
  {
    it('should call configuration service editConfigurationSubject if configuration selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.editConfigurationSubject, 'next');
      spyOn(component, "getSelectedConfiguration").and.returnValue(new Configuration("Horatio", "Age", "7", "Harper", "now", "20121223"));
      // Act
      component.editConfiguration();
      // Assert
      expect(configurationService.editConfigurationSubject.next).toHaveBeenCalled();
    }));

    it('should not call configuration service editConfigurationSubject if configuration is not selected', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.editConfigurationSubject, 'next');
      spyOn(component, "getSelectedConfiguration").and.returnValue(null);
      // Act
      component.editConfiguration();
      // Assert
      expect(configurationService.editConfigurationSubject.next).not.toHaveBeenCalled();
    }));
  });

  describe('addConfiguration', () =>
  {
    it('should call configuration service addConfigurationSubject', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService.addConfigurationSubject, 'next');
      // Act
      component.addConfiguration();
      // Assert
      expect(configurationService.addConfigurationSubject.next).toHaveBeenCalled();
    }));
  });
});
