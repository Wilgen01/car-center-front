import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { MatDrawer } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private authService = inject(AuthService);
  private router = inject(Router);
  @ViewChild('drawer') drawer!: MatDrawer;

  public name: string = "Jon Doe"
  public email: string = "fake@mail.com";

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  ngOnInit(): void {
    this.authService.getProfile().subscribe({
      next: (profile) => {
        this.name = profile?.name ?? "";
        this.email = profile?.email ?? "";
      },
      error: (e: HttpErrorResponse) => {
        if (e.status == 401)
          this.logout();
      }
    })
  }


  toggleDrawer() {
    this.drawer.toggle();
  }

  public logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
