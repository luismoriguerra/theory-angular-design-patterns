import { Injectable } from '@angular/core'; 
import { HttpClient } from '@angular/common/http'; 
 
//ApiStatus class 
class ApiStatus { 
 
  public lastFail: number 
  public calls: Call[] 
 
  constructor(public url: string) { } 
 
  //Compute the fail percentage 
  public failPercentage(timeWindow: number): number { 
 
    var i = this.calls.length - 1; 
    var success = 0 
    var fail = 0; 
 
    while (this.calls[i].time > Date.now() - timeWindow && i >= 0) { 
      if (this.calls[i].status) { 
        success++; 
      } else { 
        fail++; 
      } 
      i--; 
    } 
    return fail / (fail + success) 
  } 
 
} 
 
//An Api Call 
class Call { 
  constructor(public time: number, public status: boolean) { } 
} 
 
@Injectable() 
export class ApiwithBreakerService { 
 
  constructor(private http: HttpClient) { } 
 
  private apis: Map<string, ApiStatus>; 
  private failPercentage: number = 0.2; 
  private timeWindow : number = 60*60*24; 
  private timeToRetry : number = 60; 
 
  //Http get an url 
  public getURL(url: string): void { 
 
    var rootUrl = this.extractRootDomain(url); 
 
    if(this.isClosed(rootUrl) || this.readyToRetry(rootUrl)){ 
      let timeout; 
 
      let sub = this.http.get(url) 
        .subscribe((res) => { 
          console.log(res); 
          clearTimeout(timeout); 
          this.addCall(rootUrl, true); 
        }); 
   
      timeout = setTimeout( 
        () => {  
          sub.unsubscribe(); 
          this.addCall(rootUrl, false); 
        }, 1000 
      ); 
    } 
  } 
 
  //Add a call 
  private addCall(url: string, status: boolean) { 
 
    let res = this.apis.get(url); 
 
    if (res == null) { 
      res = new ApiStatus(url); 
      this.apis.set(url, res); 
    } 
 
    res.calls.push(new Call(Date.now(), status)); 
 
    if(!status){ 
      res.lastFail = Date.now(); 
    } 
  } 
 
  //Are we ready to retry 
  private readyToRetry(url:string): boolean { 
 
    return this.apis.get(url).lastFail < (Date.now() - this.timeToRetry) 
  } 
 
  //Is it closed ? 
  private isClosed(url :string) : boolean { 
 
    return this.apis.get(url) == null ||  
      !(this.apis.get(url).failPercentage(this.timeWindow) > this.failPercentage); 
  } 
 
  private extractHostname(url: string) : string { 
    var hostname; 
    //find & remove protocol (http, ftp, etc.) and get hostname 
 
    if (url.indexOf("://") > -1) { 
      hostname = url.split('/')[2]; 
    } 
    else { 
      hostname = url.split('/')[0]; 
    } 
 
    //find & remove port number 
    hostname = hostname.split(':')[0]; 
    //find & remove "?" 
    hostname = hostname.split('?')[0]; 
 
    return hostname; 
  } 
 
  private extractRootDomain(url: string) : string{ 
    var domain = this.extractHostname(url), 
      splitArr = domain.split('.'), 
      arrLen = splitArr.length; 
 
    //extracting the root domain here 
    //if there is a subdomain  
    if (arrLen > 2) { 
      domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1]; 
      //check to see if it's using a Country Code Top Level Domain (ccTLD) (i.e. ".me.uk") 
      if (splitArr[arrLen - 1].length == 2 && splitArr[arrLen - 1].length == 2) { 
        //this is using a ccTLD 
        domain = splitArr[arrLen - 3] + '.' + domain; 
      } 
    } 
    return domain; 
  } 
} 
