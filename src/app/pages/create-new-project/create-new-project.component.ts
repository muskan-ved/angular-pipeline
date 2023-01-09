import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Input, Output, EventEmitter } from "@angular/core";
import { trigger,  state,  style,  animate,  transition} from "@angular/animations";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { MatStepper } from '@angular/material/stepper';
declare let $: any;
@Component({
  selector: 'app-create-new-project',
  templateUrl: './create-new-project.component.html',
  styleUrls: ['./create-new-project.component.css']
})
export class CreateNewProjectComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  isSubmitted: boolean = false;
  message!: string;
  result: any;
  error: boolean = false;
  success: boolean = false;
  errorForm: boolean = false;
  successForm: boolean = false;
  errorUpload: boolean = false;
  successUpload: boolean = false;
  isEditable = false;
  dragDropConfig = {
    showList: false,
    showProgress: false
  }
  urls: any[] = [];
  firstForm: any;
  step: number = 0;
  tableData: any;
  fileNameArr: any = [];
  extArr: any = [];
  id: any;
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  progress: any[] = [];
  messages: string[] = [];
  previews: string[] = [];
  imageInfos?: Observable<any>;
  dragAreaClass: any;
  errors: any;
  msg: any;

  constructor(private _formBuilder: FormBuilder, private authService: AuthService, private router: Router) {
    this.firstFormGroup = this._formBuilder.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(10)])],
      address: ["", Validators.required],
      projectName: ["", Validators.required],
      projectDescription: ["", Validators.required],
      startDate: ["", Validators.required],
      endDate: ["", Validators.required],
      orderId: [""],
      completePercent: ["", Validators.required],
    });
    this.secondFormGroup = this._formBuilder.group({
      document: [""],
      customerId: [""],
      projectId: [""],

    });
  }

  get formControlsFirst() { return this.firstFormGroup.controls };
  get formControlsSecond() { return this.secondFormGroup.controls };

  ngOnInit(): void {
    this.dragAreaClass = "dragarea";
    this.firstForm = JSON.parse(localStorage.getItem('first-form-group') || '{}');
    if (this.firstForm && this.firstForm.customer_insertId) {
      this.getfirstFormValue();
    }
  }

  next() {
    this.step = this.step + 1;
    this.error = false;
    this.success = false;
    this.message = '';
    this.isSubmitted = false;
    if (this.firstForm && this.firstForm.customer_insertId) {
      this.getfirstFormValue();
    }
    this.errorDocumentUpload = { isError: false, errorMessage: '' };
  }

  back() {
    this.step = this.step - 1;
    this.error = false;
    this.success = false;
    this.message = '';
    this.isSubmitted = false;
    this.firstForm = JSON.parse(localStorage.getItem('first-form-group') || '{}');
    if (this.firstForm && this.firstForm.customer_insertId) {
      this.getfirstFormValue();
    }
    this.errorDocumentUpload = { isError: false, errorMessage: '' };
  }

  goBack(stepper: MatStepper) {
    stepper.previous();
  }

  goForward(stepper: MatStepper) {
    this.isSubmitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    } else {
      if (this.firstForm && this.firstForm.customer_insertId) {
        let endPoint: string = "admin/update-customer-project/" + this.firstForm.customer_insertId + '/project/' + this.firstForm.project_insertId;
        this.authService.sendRequest('put', endPoint, this.firstFormGroup.value).subscribe((result: any) => {
          this.result = result;
          if (this.result.success == false) {
            this.msg = this.result.content.messageList
            if (this.result.content.messageList && this.result.content.messageList.customer) {
              this.errorForm = true;
              this.successForm = false;
              this.message = this.result.content.messageList.customer;
            }
          } else if (this.result.success == true) {
            this.errorForm = false;
            this.successForm = false;
            this.message = '';
            this.msg = ''
            stepper.next();
            this.ngOnInit();
          }
        })
      } else {
        let endPoint: string = "admin/save-customer-project";
        this.authService.sendRequest('post', endPoint, this.firstFormGroup.value).subscribe((result: any) => {
          this.result = result;
          if (this.result.success == false) {
            this.msg = this.result.content.messageList
            if (this.result.content.messageList && this.result.content.messageList.customer) {
              this.errorForm = true;
              this.successForm = false;
              this.message = this.result.content.messageList.customer;
            }
          } else if (this.result.success == true) {
            this.errorForm = false;
            this.successForm = false;
            this.message = '';
            this.msg = '';
            stepper.next();
            localStorage.setItem('first-form-group', JSON.stringify(this.result.content.dataList[0]));
            this.ngOnInit();
          }

        })
      }
    }

  }

  onSubmitFirstForm() {
    this.isSubmitted = true;
    if (this.firstFormGroup.invalid) {
      return;
    } else { }
  }

  getfirstFormValue() {
    var endPoint: string = 'admin/getcustomerbyid/' + this.firstForm.customer_insertId;
    this.authService.sendRequest('get', endPoint, '').subscribe(result => {
      this.result = result;
      if (this.result.success == false) {
      } else if (this.result.success == true) {
        this.tableData = this.result.content.dataList
        this.reEnterValue(this.result.content.dataList);
        this.getType()
      }
    })
  }

  reEnterValue(data: any) {
    this.firstFormGroup.controls["firstName"].setValue(data[0].first_name);
    this.firstFormGroup.controls["lastName"].setValue(data[0].last_name);
    this.firstFormGroup.controls["email"].setValue(data[0].email);
    this.firstFormGroup.controls["phone"].setValue(data[0].phone);
    this.firstFormGroup.controls["address"].setValue(data[0].address);
    this.firstFormGroup.controls["projectName"].setValue(data[0].project_name);
    this.firstFormGroup.controls["orderId"].setValue(data[0].order_id);
    this.firstFormGroup.controls["startDate"].setValue(data[0].start_date);
    this.firstFormGroup.controls["endDate"].setValue(data[0].end_date);
    this.firstFormGroup.controls["completePercent"].setValue(data[0].complete_percent);
    this.firstFormGroup.controls["projectDescription"].setValue(data[0].project_description);
    if (data[0] && data[0].filename) {
      this.secondFormGroup.patchValue({
        document: data[0].filename
      });
      this.progress = [];
      this.progressInfos = [];
      for (let index = 0; index < data.length; index++) {
        const element = data[index];
        this.progress[index] = { value: 100, fileName: element.filename };
      }
    }
  }

  getType() {
    for (const key in this.tableData) {
      if (Object.prototype.hasOwnProperty.call(this.tableData, key)) {
        const element = this.tableData[key];
        var ext = element.path.split(".");
        this.extArr[key] = ext[(ext.length) - 1];
        var fileName = element.path.split("/");
        this.fileNameArr[key] = decodeURIComponent(fileName[(fileName.length) - 1]);
        var docExt = this.extArr[key];
      }
    }
  }

  confirmDialog(id: number): void {
    this.id = id
    $('#exampleModal').modal('show');
  }

  deleteDoc(value: string) {
    if (value == 'yes') {
      var endPoint: string = 'admin/delete-document/' + this.id;
      this.authService.sendRequest('delete', endPoint, '').subscribe(result => {
        this.result = result;
        if (this.result.success == false) {
          this.error = true;
          this.success = false;
          this.message = this.result.content.messageList.document;
        } else if (this.result.success == true) {
          $('#exampleModal').modal('hide');
          this.error = false;
          this.success = true;
          this.message = this.result.content.messageList.document;
          setTimeout(() => {
            this.success = false;
            this.error = false;
            this.message = '';
            this.getfirstFormValue();
          }, 1000);
        }
      })
    } else {
      $('#exampleModal').modal('hide');
    }

  }

  /* Dowloading the documents */ 
  download(path: any) {
    if (path.split('.') === "pdf" ||
      path.split('.') === "doc" ||
      path.split('.') === "docx" ||
      path.split('.') === "txt" ||
      path.split('.') === "xlsx" ||
      path.split('.') === "xls" ||
      path.split('.') === "csv"
    ) {
      var link = document.createElement('a');
      link.href = 'http://103.127.29.85/prototype/node-backend/uploads/' + path;
      link.download = 'http://103.127.29.85/prototype/node-backend/uploads/' + path;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open('http://103.127.29.85/prototype/node-backend/uploads/' + path, '_blank');
    }
  }

  lastStep() {
    localStorage.removeItem('first-form-group');
    this.router.navigate(['/manage-project']);
  }

  errorDocument: any = { isError: false, errorMessage: '' };
  goDocumentForward(stepper: MatStepper) {
    if ((this.progress && this.progress.length > 0) || (this.progressInfos && this.progressInfos.length > 0)) {
      stepper.next();
      this.errorDocument = { isError: false, errorMessage: '' };
    } else {
      this.errorDocument = { isError: true, errorMessage: 'please select the file' };
    }
  }


  /* Image Uploading with the type validations */ 

  uploadFiles(): void {
    this.messages = [];
    if (this.selectedFiles) {
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

  errorDocumentUpload: any = { isError: false, errorMessage: '' };
  selectFiles(event: any): void {
    let errorFileName = [];
    this.errorDocument = { isError: false, errorMessage: '' };
    this.secondFormGroup.patchValue({
      document: event
    });
    this.messages = [];
    this.progressInfos = [];
    this.selectedFiles = event.target.files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        let sFileExtension = this.selectedFiles[i].name.split('.')[this.selectedFiles[i].name.split('.').length - 1].toLowerCase();
        if ((sFileExtension === "pdf" || sFileExtension === "doc" || sFileExtension === "docx" || sFileExtension === "txt" || sFileExtension === "xlsx" ||
          sFileExtension === "xls" || sFileExtension === "jpeg" || sFileExtension === "jpg" || sFileExtension === "png" || sFileExtension === "csv")) {
          this.errorDocumentUpload = { isError: false, errorMessage: '' };
          const reader = new FileReader();
          reader.onload = (e: any) => {
            this.previews.push(e.target.result);
          };
          reader.readAsDataURL(this.selectedFiles[i]);
          this.upload(i, this.selectedFiles[i]);
        } else {
          errorFileName.push(this.selectedFiles[i].name);
          this.errorDocumentUpload = { isError: true, errorMessage: errorFileName + ' is not valid Please Upload the valid document' };
        }
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      this.authService.upload(file, this.firstForm.customer_insertId, this.firstForm.project_insertId).subscribe({
        next: (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.getfirstFormValue()
            this.messages.push(msg);
          }
        },
        error: (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.messages.push(msg);
        }
      });
    }
  }

  /* For the Drag and Drop Functionality */ 

  @HostListener("dragover", ["$event"]) onDragOver(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragenter", ["$event"]) onDragEnter(event: any) {
    this.dragAreaClass = "droparea";
    event.preventDefault();
  }

  @HostListener("dragend", ["$event"]) onDragEnd(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }

  @HostListener("dragleave", ["$event"]) onDragLeave(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
  }

  @HostListener("drop", ["$event"]) onDrop(event: any) {
    this.dragAreaClass = "dragarea";
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files) {
      let files: FileList = event.dataTransfer.files;
      this.saveFiles(files);
    }
  }

  saveFiles(files: any) {
    this.messages = [];
    this.progressInfos = [];
    this.selectedFiles = files;
    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.upload(i, this.selectedFiles[i]);
      }
    }
  }

}