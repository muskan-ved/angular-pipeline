import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './common/layout/layout.component';
import { AuthGuard } from './guards/auth.guard';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { CreateNewProjectComponent } from './pages/create-new-project/create-new-project.component';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { ManageProjectComponent } from './pages/manage-project/manage-project.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'forget-password', component: ForgetPasswordComponent, data: { title: 'Forget Password' } },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'workspace', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Work space' } },
      { path: 'coming-soon', component: ComingSoonComponent, data: { title: 'Coming Soon' } },
      { path: 'manage-project', component: ManageProjectComponent, canActivate: [AuthGuard], data: { title: 'Manage Project' } },
      { path: 'create-new-project', component: CreateNewProjectComponent, canActivate: [AuthGuard], data: { title: 'Create New Project' } },
      { path: 'extract', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Extract' } },
      { path: 'configure', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Configure' } },
      { path: 'user-management', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'user-management' } },
      { path: 'instanace-management', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Instanace-management' } },
      { path: 'billing', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Billing' } },
      { path: 'capacity', component: ComingSoonComponent, canActivate: [AuthGuard], data: { title: 'Capacity' } },
      { path: 'customer-details/:id', component: CustomerDetailsComponent, canActivate: [AuthGuard], data: { title: 'Customer Details' } },
      { path: 'order-details/:id', component: OrderDetailsComponent, canActivate: [AuthGuard], data: { title: 'Order Details' } },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
