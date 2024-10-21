import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { catchError, Observable, of, pipe } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, Router } from '@angular/router';

import { ErrorDialogComponent } from '../../shared/components/error-dialog/error-dialog.component';
import { CategoryPipe } from '../../shared/pipes/category.pipe';
import { Course } from '../model/course';
import { CoursesService } from '../services/courses.service';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { ConfirmationDialogComponent } from '../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    CategoryPipe,
    MatIconModule,
    CoursesListComponent,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss',
})
export class CoursesComponent implements OnInit {
  courses$: Observable<Course[]> | null = null;

  //displayedColumns: string[] = ['name', 'category', 'actions'];

  constructor(
    private courseService: CoursesService,
    public dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.refresh();
  }

  onError(erroMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: erroMsg,
    });
  }

  refresh() {
    this.courses$ = this.courseService.list().pipe(
      catchError((error) => {
        this.onError('Erro ao carregar a lista de cursos');
        return of([]);
      })
    );
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

  onEdit(course: Course) {
    this.router.navigate(['edit', course.id], { relativeTo: this.route });
  }

  onRemove(course: Course) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: 'Deseja realmente excluir o curso ' + course.name,
    });
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.courseService.remove(course.id).subscribe(
          () => {
            this.refresh();
            this.snackBar.open('Curso removido com sucesso', 'X', {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
            });
          },
          () => this.onError('Erro ao tentar remover curso.')
        );
      }
    });
  }

  ngOnInit(): void {}
}
