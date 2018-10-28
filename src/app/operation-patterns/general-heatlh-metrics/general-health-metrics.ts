// msPerTick: The average ms it took per tick. A tick can be considered a refresh operation or repaint. In other words, the number of milliseconds it takes to repaint all your variables.
// numTicks: The number of elapsed ticks
// core: The number of logical cores
// appVersion: The browser used
// cnxDownlink: Downlink connection speed
// cnxEffectiveType: The connection type
// jsHeapSizeLimit: The max size of the heap.
// totalJSHeapSize: This is the current size of the JavaScript heap, including free space not occupied by any JavaScript objects. This means that usedJsHeapSize cannot be greater than totalJsHeapSize.
// usedJSHeapSize: Total amount of memory being used by JavaScript objects including V8 internal objects.

var timeChangeDetection = window["ng"].profiler.timeChangeDetection(); // [msPerTick, numTicks]

window.navigator.hardwareConcurrency;
window.navigator.appVersion;

var memory: any = window.performance["memory"]
  ? window.performance["memory"]
  : {
      jsHeapSizeLimit: 0,
      totalJSHeapSize: 0,
      usedJSHeapSize: 0
    };

var connection: any = window.navigator["connection"]
  ? window.navigator["connection"]
  : {
      effectiveType: "n/a",
      cnxDownlink: 0
    };

import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
@Injectable()
export class MonitorService {
  constructor(private http: HttpClient) {}
  public metrics() {
    var timeChangeDetection = window["ng"].profiler.timeChangeDetection();
    var memory: any = window.performance["memory"]
      ? window.performance["memory"]
      : {
          jsHeapSizeLimit: 0,
          totalJSHeapSize: 0,
          usedJSHeapSize: 0
        };
    var connection: any = window.navigator["connection"]
      ? window.navigator["connection"]
      : {
          effectiveType: "n/a",
          cnxDownlink: 0
        };
    var perf = {
      msPerTick: timeChangeDetection.msPerTick,
      numTicks: timeChangeDetection.numTicks,
      core: window.navigator.hardwareConcurrency,
      appVersion: window.navigator.appVersion,
      jsHeapSizeLimit: memory.jsHeapSizeLimit,
      totalJSHeapSize: memory.totalJSHeapSize,
      usedJSHeapSize: memory.usedJSHeapSize,
      cnxEffectiveType: connection.effectiveType,
      cnxDownlink: connection.downlink
    };
    this.http.post("https://api.yourwebsite/metrics/", perf);
    return perf;
  }
}
