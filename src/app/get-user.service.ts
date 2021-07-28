import { Injectable } from '@angular/core';
//import { Users } from '../mock-users';
import { Observable, of, from} from 'rxjs';
import { catchError, find, map, tap } from 'rxjs/operators';
import { User} from '../interfaces/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Setting } from 'src/interfaces/setting';

interface TokenUser  {
  token: string,
  user: User
}
@Injectable({
  providedIn: 'root'
})
export class GetUserService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor( private http: HttpClient) { }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {     
      console.error(error); 
      return of(result as T);
    };
  }
  login (email: string, password: string): Observable<TokenUser> {
    const user = {email, password}
    return this.http.post<TokenUser>('api/auth/login', user).pipe(
      catchError(this.handleError<TokenUser>('login'))
    )
  } 
  register (email: string, password: string, sex: boolean, firstName: string, lastName: string) : Observable<User> {
    const user = {email, password, sex, firstName, lastName}
    return this.http.post<User>('api/auth/register', user).pipe(      
      catchError(this.handleError<User>('register'))
    )
  }
  findUserById(id: string): Observable<User> {
    const url = `api/user/${id}`;    
    return this.http.get<User>(url).pipe(      
      catchError(this.handleError<User>('userById'))
    )
  }
  editUser(user: {}, id: string): Observable<User> {
    const url = `api/user/${id}`;    
    return this.http.post<User>(url, user).pipe(      
      catchError(this.handleError<User>('userById'))
    )
  }
  getUsers(): Observable<User[]> {
    const url = `api/user`;    
    return this.http.get<User[]>(url).pipe(      
      catchError(this.handleError<User[]>('userById'))
    )
  }
  getFirstSetting (): Observable<Setting> {
    const url = `api/setting`; 
    return this.http.get<Setting>(url).pipe(      
      catchError(this.handleError<Setting>('setting')))
  }
  updateSetting (id: string, setting: {}) : Observable<Setting> {
    const url = `api/setting/${id}`
    return this.http.patch<Setting>(url, setting).pipe(
      catchError(this.handleError<Setting>('setting'))
    )
  }
}
