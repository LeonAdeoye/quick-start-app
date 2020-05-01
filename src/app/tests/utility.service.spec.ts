import { TestBed } from '@angular/core/testing';
import { UtilityService } from '../services/utility.service';

describe('UtilityService', () =>
{
  let utilityService: UtilityService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    utilityService = TestBed.inject(UtilityService);
  });

  it('should be created', () =>
  {
    expect(utilityService).toBeTruthy();
  });

  describe('isNotNullOrEmptyOrBlankOrUndefined', () =>
  {
    it('should return false when passed an empty string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNotNullOrEmptyOrBlankOrUndefined("");
      // Assert
      expect(result).toEqual(false);
    });

    it('should return false when passed a null argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNotNullOrEmptyOrBlankOrUndefined(null);
      // Assert
      expect(result).toEqual(false);
    });

    it('should return false when passed an undefined argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNotNullOrEmptyOrBlankOrUndefined(undefined);
      // Assert
      expect(result).toEqual(false);
    });

    it('should return false when passed a blank string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNotNullOrEmptyOrBlankOrUndefined("   ");
      // Assert
      expect(result).toEqual(false);
    });

    it('should return true when passed a valid string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNotNullOrEmptyOrBlankOrUndefined("horatio");
      // Assert
      expect(result).toEqual(true);
    });
  });

  describe('isNullOrEmptyOrBlankOrUndefined', () =>
  {
    it('should return true when passed an empty string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrEmptyOrBlankOrUndefined("");
      // Assert
      expect(result).toEqual(true);
    });

    it('should return true when passed a null argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrEmptyOrBlankOrUndefined(null);
      // Assert
      expect(result).toEqual(true);
    });

    it('should return true when passed an undefined argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrEmptyOrBlankOrUndefined(undefined);
      // Assert
      expect(result).toEqual(true);
    });

    it('should return true when passed a blank string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrEmptyOrBlankOrUndefined("   ");
      // Assert
      expect(result).toEqual(true);
    });

    it('should return false when passed a valid string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrEmptyOrBlankOrUndefined("horatio");
      // Assert
      expect(result).toEqual(false);
    });
  });

  describe('isNullOrUndefined', () =>
  {
    it('should return false when passed an empty string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrUndefined("");
      // Assert
      expect(result).toEqual(false);
    });

    it('should return true when passed a null argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrUndefined(null);
      // Assert
      expect(result).toEqual(true);
    });

    it('should return true when passed an undefined argument', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrUndefined(undefined);
      // Assert
      expect(result).toEqual(true);
    });

    it('should return false when passed a blank string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrUndefined("   ");
      // Assert
      expect(result).toEqual(false);
    });

    it('should return false when passed a valid string', () =>
    {
      // Arrange
      // Act
      let result = UtilityService.isNullOrUndefined("horatio");
      // Assert
      expect(result).toEqual(false);
    });
  });
});
