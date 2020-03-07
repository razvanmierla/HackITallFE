import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Product } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'HackITallFE';

  private async getProducts(): Promise<Product[]> {
    return await this.http.get<Product[]>(environment.productApiUrl, {responseType: 'json'}).toPromise();
  }

  constructor(private http: HttpClient) { }

}
