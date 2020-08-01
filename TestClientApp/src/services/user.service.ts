import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User } from 'src/models/user';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
    }

    getUser(userId: string) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('userId', userId);
        let options = { params: httpParams };
        return this.http
            .get(`${environment.apiUrl}/api/user`, options)
            .pipe(map(user => {
                return user
            }));
    }

    getUsers() {
        return this.http
            .get(`${environment.apiUrl}/api/users`)
            .pipe(map(users => {
                return users
            }));
    }

    deleteUser(userId: string) {
        let httpParams = new HttpParams();
        httpParams = httpParams.append('userId', userId);
        let options = { params: httpParams };
        return this.http
            .get(`${environment.apiUrl}/api/delete`, options)
            .pipe(map(result => {
                return result;
            }));
    }

    addUser(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/api/add`, user)
            .pipe(map(result => {
                return result;
            }));
    }

    updateUser(user: User) {
        return this.http.post<any>(`${environment.apiUrl}/api/update`, user)
            .pipe(map(result => {
                return result;
            }));
    }
}