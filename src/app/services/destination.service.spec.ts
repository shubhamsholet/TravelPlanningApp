import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DestinationService } from './destination.service';
import { environment } from '../../environments/environment';

describe('DestinationService', () => {
  let service: DestinationService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DestinationService]
    });
    service = TestBed.inject(DestinationService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should fetch all destinations', () => {
    const mockDestinations = [{ id: 1, name: 'Paris' }];
    
    service.getAllDestinations().subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].name).toBe('Paris');
    });
    
    const req = httpMock.expectOne(`${environment.apiUrl}/destinations`);
    expect(req.request.method).toBe('GET');
    req.flush(mockDestinations);
  });
});