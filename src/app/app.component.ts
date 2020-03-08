import { Component, OnInit, OnChanges } from "@angular/core";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Product } from "./product";
import { ToastrService } from "ngx-toastr";

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

  onChangeIdHandler(event) {
    this.productId = event.target.value;
  }

  onChangeQuantityHandler(e) {
    this.productQuantity = e.target.value;
  }

  submit() {}

  constructor(private http: HttpClient) {}
}
