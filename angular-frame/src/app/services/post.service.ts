import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  /**
   * get post list.
   * @returns 
   */
  public getPosts(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headerOptions = new HttpHeaders()
      .set('Authorization', `Bearer ${token}`);
    const options = { headers: headerOptions };
    return this.http.get(`${environment.apiUrl}/posts`, options).pipe(retry(3));
  }
}
