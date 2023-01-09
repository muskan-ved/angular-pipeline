import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
declare var $: any;
@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.css']
})
export class CustomerDetailsComponent implements OnInit {
  result: any;
  customerData: any;
  customerId: any;
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

  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.customerId = this.route.snapshot.paramMap.get('id');
    this.getCustomerData();
  }

  getCustomerData() {
    var endPoint: string = 'admin/getcustomerbyid/' + this.customerId;
    this.authService.sendRequest('get', endPoint, '').subscribe(result => {
      this.result = result;
      if (this.result.success == false) {
      } else if (this.result.success == true) {
        this.customerData = this.result.content.dataList
        this.totalRecord = this.customerData.length;
      }
    })
  }

  download(path: any) {
    if (path.split('.') === "pdf" ||
      path.split('.') === "doc" ||
      path.split('.') === "docx" ||
      path.split('.') === "txt" ||
      path.split('.') === "xlsx" ||
      path.split('.') === "xls"
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


  pageChanged(event: any) {
    this.currentPageNmuber = event;
    this.getCustomerData();
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
        this.getCustomerData();
      }
    }
  }


  setItemPerPage(limit: any) {
    if (isNaN(limit)) {
      limit = this.itemPerPage;
    }
    this.itemPerPage = limit;
    this.getCustomerData()
  }

  onBack() {
    window.history.back();
  }
}
