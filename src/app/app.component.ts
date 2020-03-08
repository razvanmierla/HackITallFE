import { Component, OnInit, OnChanges } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "Vending Machine";
  products: Array<Product>;
  usesCash = false;
  productId: number;
  productQuantity: number;
  sumPaid: number;
  rest: number;
  selectedProduct: Product;

  private async getProducts(): Promise<Product[]> {
    return await this.http
      .get<Product[]>(environment.productApiUrl, { responseType: "json" })
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
      console.log("Cantitate indisponibila. Stocul este de: " + this.selectedProduct.quantity);
    }
  }

  calculateRest() {
    var totalSumForProduct = this.productQuantity * this.selectedProduct.price;
    if (this.sumPaid != 0 && this.sumPaid > totalSumForProduct) {
      console.log(this.sumPaid, totalSumForProduct)
      this.rest = this.sumPaid - totalSumForProduct;
    }
  }
  submit() { }

  constructor(private http: HttpClient) { }
}
