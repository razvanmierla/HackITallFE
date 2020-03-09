import { Component, OnInit, OnChanges } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Vending Machine';
  products: Array<Product>;
  usesCash = false;
  productId: number;
  productQuantity: number;
  sumPaid: number;
  rest: number;
  selectedProduct: Product;
  notEnoughMoney = false;
  tooMuchMoney = false;

  private async getProducts(): Promise<Product[]> {
    return await this.http
      .get<Product[]>(environment.productApiUrl, { responseType: 'json' })
      .toPromise();
  }

  private async updateProduct(productID: number,productQuantity: number): Promise<Product> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return await this.http
      .put<Product>(environment.productApiUrl + '/' + productID + '/' + productQuantity, { responseType: 'json', headers})
      .toPromise();
  }

  ngOnInit() {
    this.getProducts().then((data: any) => {
      console.log(data);
      this.products = data.products;
    });
  }

  onChangeIdHandler(e) {
    this.productId = e.target.value;
    if (this.productId) {
      this.selectedProduct = this.products.find(x => x.id == this.productId);
    }
  }

  onChangeQuantityHandler(e) {
    this.productQuantity = e.target.value;
    this.checkQuantity();
  }

  onRadioButtonChange(e) {
    if (e.value == 1) {
      this.usesCash = true;
    }
  }

  onSumPaidChange(e) {
    this.sumPaid = e.target.value;
    this.calculateRest();
  }

  checkQuantity() {
    if (this.productQuantity > this.selectedProduct.quantity) {
      console.log('Cantitate indisponibila. Stocul este de: ' + this.selectedProduct.quantity);
    }
  }

  calculateRest() {
    let totalSumForProduct = this.productQuantity * this.selectedProduct.price;
    if (this.sumPaid != 0 && this.sumPaid > totalSumForProduct) {
      console.log(this.sumPaid, totalSumForProduct);
      this.rest = this.sumPaid - totalSumForProduct;
      this.tooMuchMoney = true;
      this.notEnoughMoney = false;
    } else {
      this.tooMuchMoney = false;
      this.notEnoughMoney = true;
    }
  }
  submit() {
    this.updateProduct(this.productId,this.productQuantity);
   }

  constructor(private http: HttpClient) { }
}
