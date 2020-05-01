import { TestBed } from '@angular/core/testing';
import { GridSearchService } from '../services/grid-search.service';

describe('GridSearchService', () =>
{
  let gridSearchService: GridSearchService;

  beforeEach(() =>
  {
    TestBed.configureTestingModule({});
    gridSearchService = TestBed.inject(GridSearchService);
  });

  it('should be created', () =>
  {
    expect(gridSearchService).toBeTruthy();
  });

  describe('setText', () =>
  {
    it('should call gridSearchTextSubject next method', () =>
    {
      // Arrange
      spyOn(gridSearchService.gridSearchTextSubject, 'next');
      // Act
      gridSearchService.setText("Harper");
      // Assert
      expect(gridSearchService.gridSearchTextSubject.next).toHaveBeenCalledWith("Harper");
    });
  });
});
