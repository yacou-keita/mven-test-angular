import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from 'src/app/interfaces/types';

import { environment } from './../../../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class ClientService {
  clientUrl = `${environment.apiUrl}/clients`

  constructor(private http: HttpClient) {}

  getClients(): Observable<any> {
    return this.http.get(this.clientUrl);
  }

  deleteClientById(clienId:string):Observable<any> {
    return this.http.delete(`${this.clientUrl}/${clienId}`);
  }

  updateClientById(clientToUpdate:Client):Observable<any> {
    delete clientToUpdate.providers;
    return this.http.patch(`${this.clientUrl}/${clientToUpdate._id}`,clientToUpdate);
  }

  addClient(clientToAdd:Client):Observable<any> {
    delete clientToAdd.providers;
    return this.http.post(this.clientUrl,clientToAdd);
  }
}
