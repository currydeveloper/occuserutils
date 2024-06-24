import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


declare const PluginHelper:{
  getCsrfToken:Function
  getPluginRestUrl:Function
  getCurrentUserName:Function
}
declare const SailPoint:{
  CONTEXT_PATH:string
}
export interface userinfo{
  name:string
}
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  headers!:HttpHeaders;
  iiqUrl:string;
  pluginUrl:any;
  token:any;

  constructor(private http:HttpClient) {
    if(isDevMode()){
      console.log("Setting rest params for dev mode");
      this.iiqUrl='/identityiq';
      this.pluginUrl='/identityiq/plugin/rest/userutils/currentuser';
      let encoded=btoa(environment.username+":"+environment.password);
      console.log("Setting encoded:"+encoded);
      const devHeaders=new HttpHeaders().set("Authorization","Basic "+encoded).set("Content-Type","application/json").set("Referrer-Policy","no-referrer")
      this.headers=devHeaders;
      // this.headers=new HttpHeaders({
      //   "Authorization":"Basic "+encoded,
      //   "Content-Type":"application/json",
      //   "Referrer-Policy":"no-referrer"
      // });
      console.log("headers are:"+JSON.stringify(this.headers));
    }else{
      console.log("Prod Mode");
      this.pluginUrl=PluginHelper.getPluginRestUrl('methodpath');
      this.iiqUrl=SailPoint.CONTEXT_PATH;
      this.token=PluginHelper.getCsrfToken();
      this.headers=new HttpHeaders({
        "X-XSRF-TOKEN":this.token,
        "Content-Type":"application/json"
      });
    }
   }
   getData<T>(baseURL: string, endpointURL: string): Observable<T> {
    console.log("headers in request:"+JSON.stringify(this.headers));
    return this.http.get<T>(baseURL + endpointURL, { headers: this.headers });
  }

  async getCurrentUser():Promise<userinfo>{
    console.log("starting the current user request");
    return new Promise<userinfo>((resolve)=>{
      this.getData<userinfo>(this.iiqUrl,'/plugin/rest/userutils/currentuser').subscribe((res:userinfo)=>{
        console.log("Got the response");
        resolve(res);
      });
    });
  }

}
