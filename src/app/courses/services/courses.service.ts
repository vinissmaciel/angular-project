import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { delay, first, tap } from 'rxjs';

import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CoursesService {
  private readonly API = 'api/courses';

  constructor(private httpClient: HttpClient) {}

  list() {
    return this.httpClient.get<Course[]>(this.API).pipe(
      first(),
      //delay(300),
      tap((courses) => console.log(courses))
    );
  }

  save(record: Partial<Course>) {
    if (record.id) {
      return this.update(record);
    } else {
      return this.create(record);
    }
  }

  private create(record: Partial<Course>) {
    return this.httpClient.post<Course>(this.API, record);
  }

  private update(record: Partial<Course>) {
    return this.httpClient.put<Course>(`${this.API}/${record.id}`, record);
  }

  remove(id: string) {
    return this.httpClient.delete(`${this.API}/${id}`);
  }

  loadById(id: string) {
    return this.httpClient.get<Course>(`${this.API}/${id}`);
  }
}
