import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { SuscriptionsComponent } from './components/suscriptions/suscriptions.component';
import { SuscriptionDetailComponent } from './components/suscription-detail/suscription-detail.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { UsersComponent } from './components/users/users.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { PaymentsComponent } from './components/payments/payments.component';
import { AuthGuard } from './components/login/services/auth.guard';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: '', component: HomeComponent, canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent },
            { path: 'suscripciones', component: SuscriptionsComponent },
            { path: 'suscripcion/detail/:id', component: SuscriptionDetailComponent },
            { path: 'cronograma/suscripcion/:id', component: ScheduleComponent },
            { path: 'pago/suscripcion/:id', component: PaymentsComponent },
            { path: 'users', component: UsersComponent },
          ]
     }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }