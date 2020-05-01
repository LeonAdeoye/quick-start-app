import { inject, TestBed } from '@angular/core/testing';
import { MessageService } from '../services/message.service';
import { LoggingService } from "../services/logging.service";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { HttpClient } from '@angular/common/http';
import { Message } from "../models/message";
import { Constants } from "../models/constants";
import { MessageMethod, MessageTransport } from "../models/types";


describe('MessageService', () =>
{
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  let messageService: MessageService;
  const spyLoggingService = jasmine.createSpyObj('LoggingService', ['log']);

  const testResponseData =
  [
    {
      owner: "Horatio",
      key: "age",
      value: "7",
      lastUpdatedBy: "papa",
      lastUpdatedOn: "now",
      id: "20121223"
    },
    {
      owner: "Harper",
      key: "age",
      value: "3",
      lastUpdatedBy: "papa",
      lastUpdatedOn: "now",
      id: "20160615"
    },
    {
      owner: "Saori",
      key: "age",
      value: "45",
      lastUpdatedBy: "papa",
      lastUpdatedOn: "now",
      id: "219750602"
    },
  ];

  beforeEach(() =>
  {
    TestBed.configureTestingModule({
      imports:
      [
        HttpClientTestingModule
      ],
      providers:
      [
        { provide: LoggingService, useValue: spyLoggingService }
      ]
    });
    messageService = TestBed.inject(MessageService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () =>
  {
    expect(messageService).toBeTruthy();
  });

  describe('send', () =>
  {
    it('should send a valid GET request', inject([MessageService], (messageService) =>
    {
      // Arrange
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`, null, MessageTransport.HTTP, MessageMethod.GET);
      // Act
      messageService.send(message).subscribe(
        (result) =>
        {
          expect(result).toEqual(testResponseData)
        },
        () =>
        {
          fail;
        }
      );
      // Assert
      const req = httpTestingController.expectOne(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configurations`);
      expect(req.request.method).toEqual(MessageMethod.GET);
      req.flush(testResponseData);
    }));

    it('should send a valid POST request with a payload', inject([MessageService], (messageService) =>
    {
      // Arrange
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`,     {
        owner: "Horatio",
        key: "age",
        value: "7",
        lastUpdatedBy: "papa",
        lastUpdatedOn: "now",
        id: "20121223"
      }, MessageTransport.HTTP, MessageMethod.POST);
      // Act
      messageService.send(message).subscribe(
        (result) =>
        {
          expect(result).toEqual(testResponseData)
        },
        () =>
        {
          fail;
        }
      );

      const req = httpTestingController.expectOne(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/configuration`);
      expect(req.request.body).toEqual({
        owner: "Horatio",
        key: "age",
        value: "7",
        lastUpdatedBy: "papa",
        lastUpdatedOn: "now",
        id: "20121223"
      });
      expect(req.request.method).toEqual(MessageMethod.POST);
      req.flush(testResponseData);
    }));

    it('should send a fail gracefully if incorrect URL used request with a payload', inject([MessageService], (messageService) =>
    {
      // Arrange
      const error_msg = 'deliberate 404 error';
      let message = new Message(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/invalidURL`,null, MessageTransport.HTTP, MessageMethod.GET);
      // Act
      messageService.send(message).subscribe(
        () =>
        {
          fail
        },
        (error) =>
        {
          expect(error.status).toEqual(404, 'error status');
          expect(error.error).toEqual(error_msg, 'error message');
        }
      );

      const req = httpTestingController.expectOne(`${Constants.CONFIGURATION_SERVICE_URL_BASE}/invalidURL`);
      expect(req.request.method).toEqual(MessageMethod.GET);
      req.flush(error_msg, { status: 404, statusText: 'Not Found' });
    }));
  });

  afterEach(() =>
  {
    httpTestingController.verify();
  });
});
