import { async, ComponentFixture, inject, TestBed } from '@angular/core/testing';
import { DetailComponent } from '../components/detail/detail.component';
import { ConfigurationService } from "../services/configuration.service";
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { ConfigurationServiceMock } from "./mock-configuration.service";
import { Configuration } from "../models/configuration";

describe('DetailComponent', () =>
{
  let component: DetailComponent;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);
  let fixture: ComponentFixture<DetailComponent>;

  beforeEach(async(() =>
  {
    TestBed.configureTestingModule({
      declarations:
      [
        DetailComponent
      ],
      imports:
      [
        HttpClientTestingModule
      ],
      providers:
      [
        { provide: ConfigurationService, useClass: ConfigurationServiceMock },
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() =>
  {
    fixture = TestBed.createComponent(DetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('canClear', () =>
  {
    it('should return false when @Input configuration is not set', () =>
    {
      // Act
      let result = component.canClear();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when owner, key, and value of @Input configuration are not set', () =>
    {
      // Arrange
      component.configuration = new Configuration(null, null, null, "Papa", "now", "20121223");
      // Act
      let result = component.canClear();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return true when only value of @Input configuration is set', () =>
    {
      // Arrange
      component.configuration = new Configuration("Horatio", "Surname", null, "Papa", "now", "20121223");
      // Act
      let result = component.canClear();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false when only key of @Input configuration is set', () =>
    {
      // Arrange
      component.configuration = new Configuration(null, "Surname", null, "Papa", "now", "20121223");
      // Act
      let result = component.canClear();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false when only owner of @Input configuration is set', () =>
    {
      // Arrange
      component.configuration = new Configuration("Harper", null, null, "Papa", "now", "20121223");
      // Act
      let result = component.canClear();
      // Assert
      expect(result).toBeTruthy();
    });
  });

  describe('canSave', () =>
  {
    it('should return false when @input configuration is not set', () =>
    {
      // Act
      let result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return true when owner, key and value of @Input configuration are set', () =>
    {
      // Arrange
      component.configuration = new Configuration("Horatio", "Surname", "Adeoye", "Papa", "now", "20121223");
      // Act
      let result = component.canSave();
      // Assert
      expect(result).toBeTruthy();
    });

    it('should return false when value of @Input configuration is not set', () =>
    {
      // Arrange
      component.configuration = new Configuration("Horatio", "Surname", null, "Papa", "now", "20121223");
      // Act
      let result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when key of @Input configuration is not set', () =>
    {
      // Arrange
      component.configuration = new Configuration("Horatio", null, "Adeoye", "Papa", "now", "20121223");
      // Act
      let result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });

    it('should return false when owner of @Input configuration is not set', () =>
    {
      // Arrange
      component.configuration = new Configuration(null, "Surname", "Adeoye", "Papa", "now", "20121223");
      // Act
      let result = component.canSave();
      // Assert
      expect(result).not.toBeTruthy();
    });
  });

  describe('save', () =>
  {
    it('should call configuration service saveConfiguration', inject([ConfigurationService], (configurationService) =>
    {
      // Arrange
      spyOn(configurationService, 'saveConfiguration');
      // Act
      component.save();
      // Assert
      expect(configurationService.saveConfiguration).toHaveBeenCalled();
    }));
  });

  describe('clear', () =>
  {
    it('should clear configuration @Input member variable', () =>
    {
      // Arrange
      component.configuration = new Configuration("Harper", "Surname", "Adeoye", "Papa", "now", "20121223");
      // Act
      component.clear();
      // Assert
      expect(component.configuration).toEqual(new Configuration());
    });
  });

  describe('cancel', () =>
  {
    it('should emit close panel event', () =>
    {
      // Arrange
      spyOn(component.closePanelEventEmitter, 'emit');
      // Act
      component.cancel();
      // Assert
      expect(component.closePanelEventEmitter.emit).toHaveBeenCalled();
    });
  });
});
