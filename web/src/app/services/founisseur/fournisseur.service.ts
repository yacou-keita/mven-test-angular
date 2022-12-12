import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Fournisseur } from 'src/app/modeles/fournisseur.model';

@Injectable({
  providedIn: 'root',
})
export class FournisseurService {
  providerUrl = `${environment.apiUrl}/providers`;

  constructor(private http: HttpClient) {}

  getProviders(): Observable<any> {
    return this.http.get(this.providerUrl);
  }

  deleteProvidersById(providerId: string): Observable<any> {
    return this.http.delete(`${this.providerUrl}/${providerId}`);
  }

  addProviders(provider: Fournisseur): Observable<any> {
    return this.http.post(this.providerUrl,provider);
  }
}
