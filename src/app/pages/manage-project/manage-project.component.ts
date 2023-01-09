import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-manage-project',
  templateUrl: './manage-project.component.html',
  styleUrls: ['./manage-project.component.css']
})
export class ManageProjectComponent implements OnInit {
  projectData: any;
  result: any;
  currentPageNmuber: number = 1;
  itemPerPage = 10;
  limitPerPage = [
    { value: '10' },
    { value: '20' },
    { value: '30' },
    { value: '40' },
    { value: '50' }

  ];

  totalRecord = 0;
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.getManageProjectData();
  }

  getManageProjectData() {
    var endPoint: string = 'admin/manage-project/';
    this.authService.sendRequest('get', endPoint, '').subscribe(result => {
      this.result = result;
      if (this.result.success == false) {
      } else if (this.result.success == true) {
        this.projectData = this.result.content.dataList.reverse();
        this.totalRecord = this.projectData.length
      }
    })
  }

  download(path: any) {
    var link = document.createElement('a');
    link.href = 'http://103.127.29.85/prototype/node-backend/uploads/' + path;
    link.download = 'http://103.127.29.85/prototype/node-backend/uploads/' + path;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  pageChanged(event: any) {
    this.currentPageNmuber = event;
    this.getManageProjectData();
  }

  goToPg(eve: any) {
    if (isNaN(eve)) {
      eve = this.currentPageNmuber;
    } else {
      if (eve > Math.round(this.totalRecord / this.itemPerPage)) {
        setTimeout(() => {
          $('#responseMessage').hide();
        }, 3000);
      } else {
        this.currentPageNmuber = eve;
        this.getManageProjectData();
      }
    }
  }

  setItemPerPage(limit: any) {
    if (isNaN(limit)) {
      limit = this.itemPerPage;
    }
    this.itemPerPage = limit;
    this.getManageProjectData()
  }

}
