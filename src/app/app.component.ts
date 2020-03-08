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
  title = "HackITallFE";
  products: Array<Product>;
  usesCash = false;

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

  constructor(private http: HttpClient) {}
}
