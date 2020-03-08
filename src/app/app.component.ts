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
  radioButtonValue: number;
  sumPaid: number;

  private async getProducts(): Promise<Product[]> {
    return await this.http
      .get<Product[]>(environment.productApiUrl, { responseType: "json" })
      .toPromise();
  }
  ngOnInit() {
    this.getProducts().then(data => {
      console.log(data);
      this.products = data.products;
    });
  }

  onChangeIdHandler(e) {
    this.productId = e.target.value;
  }

  onChangeQuantityHandler(e) {
    this.productQuantity = e.target.value;
  }

  onRadioButtonChange(e) {
    this.radioButtonValue = e.value;
  }

  onSumPaidChange(e) {
    this.sumPaid = e.target.value;;
  }

  submit() { }

  constructor(private http: HttpClient) { }
}
