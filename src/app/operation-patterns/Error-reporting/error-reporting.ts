// Pure JS
window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
  alert("Error occured: " + errorMsg);
};


class MyErrorHandler implements ErrorHandler {
  handleError(error) {
    // do something with the exception
  }
}
// Angular

import { Injectable, ErrorHandler } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class MonitorService implements ErrorHandler {
  constructor(private http: HttpClient) {}
  handleError(error) {
    this.http.post("https://api.yourwebsite/errors/", error);
  }
  // ...
}

// providers : [{ provide : ErrorHandler, useClass : MonitorService }]


