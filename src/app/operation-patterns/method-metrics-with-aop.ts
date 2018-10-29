function myFunc() {
  Console.log("hello");
}
function myBeforeAspect() {
  Console.log("before...");
}
function myAfterAspect() {
  Console.log("after");
}
var oldFunc = myFunc;
myFunc = function() {
  myBeforeAspect();
  oldFunc();
  myAfterAspect();
};


constructor(){
    this.click = function(){
    this.before();
    this.click();
    this.after();
    }
    }
    after(){
    console.log("after")
    }
    before(){
    console.log("before");
    }
    click(){
    console.log("hello")
    }
` <button (click)="click()">click</button>`


class LoggerAspect {
    @afterMethod({
    classNamePattern: /^someClass/,
    methodNamePattern: /^(some|other)/
    })
    invokeAfterMethod(meta: Metadata) {
    console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
    }
    @beforeMethod({
    classNamePattern: /^someClass/,
    methodNamePattern: /^(get|set)/
    })
    invokeBeforeMethod(meta: Metadata) {
    console.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
    }
}


static httpStatic:HttpClient
constructor(private http:HttpClient) {
MonitorService.httpStatic = http;
}
static sendLog(log:string){
MonitorService.httpStatic.post("https://api.yourwebsite/logs/", log)
}


import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable()
export class MonitorService implements ErrorHandler{
static httpStatic:HttpClient
constructor(private http:HttpClient) {
MonitorService.httpStatic = http;
}
public static log(log:string){
MonitorService.httpStatic.post("https://api.yourwebsite/logs/", log)
}
handleError(error) {
this.http.post("https://api.yourwebsite/metrics/", error)
}
public metric(label:string, value:any){
this.http.post("https://api.yourwebsite/metric/", {
label:label,
value:value,
})
}
public metrics(){
var timeChangeDetection = window["ng"].profiler.timeChangeDetection()
var memory:any = window.performance["memory"] ? window.performance["memory"] : {
"jsHeapSizeLimit":0,
"totalJSHeapSize":0,
"usedJSHeapSize":0,
}
var connection:any = window.navigator["connection"] ? window.navigator["connection"] : {
"effectiveType": "n/a",
"cnxDownlink": 0,
}
this.metric("msPerTick", timeChangeDetection.msPerTick);
this.metric("numTicks", timeChangeDetection.numTicks);
this.metric("core", window.navigator.hardwareConcurrency);
this.metric("appVersion", window.navigator.appVersion);
this.metric("jsHeapSizeLimit", memory.jsHeapSizeLimit);
this.metric("totalJSHeapSize", memory.totalJSHeapSize);
this.metric("usedJSHeapSize", memory.usedJSHeapSize);
this.metric("cnxEffectiveType", connection.effectiveType);
this.metric("cnxDownlink", connection.downlink);
}
}


class LoggerAspect {
    @afterMethod({
    classNamePattern: /^SomeClass/,
    methodNamePattern: /^(some|other)/
    })
    invokeBeforeMethod(meta: Metadata) {
    MonitorService.log(`Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
    }
    @beforeMethod({
    classNamePattern: /^SomeClass/,
    methodNamePattern: /^(get|set)/
    })
    invokeBeforeMethod(meta: Metadata) {
    MonitorService.log(`Inside of the logger. Called ${meta.className}.${meta.method.name} with args: ${meta.method.args.join(', ')}.`);
    }
    }


    @Wove({ bar: 42, foo : "bar" })
    class SomeClass { }


@Wove({ startTime: 0 })
class SomeClass { }
class ExecutionTimeAspect {
@afterMethod({
classNamePattern: /^SomeClass/,
methodNamePattern: /^(some|other)/
})
invokeBeforeMethod(meta: Metadata) {
meta.startTime = Date.now();
}
@beforeMethod({
classNamePattern: /^SomeClass/,
methodNamePattern: /^(get|set)/
})
invokeBeforeMethod(meta: Metadata) {
MonitorService.metric(`${meta.className}.${meta.method.name`,
Date.now() - meta.startTime;
}
}
