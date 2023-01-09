import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './common/layout/layout.component';
import { HeaderComponent } from './common/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ForgetPasswordComponent } from './auth/forget-password/forget-password.component';
import { SideBarComponent } from './common/side-bar/side-bar.component';
import { WorkspaceComponent } from './pages/workspace/workspace.component';
import { ComingSoonComponent } from './pages/coming-soon/coming-soon.component';
import { FooterComponent } from './common/footer/footer.component';
import { ManageProjectComponent } from './pages/manage-project/manage-project.component';
import { CreateNewProjectComponent } from './pages/create-new-project/create-new-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { NgFileDragDropModule } from 'ng-file-drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { CustomerDetailsComponent } from './pages/customer-details/customer-details.component';
import { OrderDetailsComponent } from './pages/order-details/order-details.component';
import { AngularFileUploaderModule } from "angular-file-uploader";
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    HeaderComponent,
    ForgetPasswordComponent,
    SideBarComponent,
    WorkspaceComponent,
    ComingSoonComponent,
    FooterComponent,
    ManageProjectComponent,
    CreateNewProjectComponent,
    CustomerDetailsComponent,
    OrderDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatStepperModule,
    MatFormFieldModule,
    MatProgressBarModule,
    NgFileDragDropModule,
    MatButtonModule,
    AngularFileUploaderModule,
    NgxPaginationModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
