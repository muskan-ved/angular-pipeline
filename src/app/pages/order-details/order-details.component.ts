import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  result: any;
  orderData: any;
  orderId: any;

  constructor(public authService: AuthService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.orderId = this.route.snapshot.paramMap.get('id');
    this.getOrderData();
  }

  getOrderData() {
    var endPoint: string = 'admin/getorderbyid/' + this.orderId;
    this.authService.sendRequest('get', endPoint, '').subscribe(result => {
      this.result = result;
      if (this.result.success == false) {
      } else if (this.result.success == true) {
        this.orderData = this.result.content.dataList;
      }
    })
  }

  onBack() {
    window.history.back();
  }
}
