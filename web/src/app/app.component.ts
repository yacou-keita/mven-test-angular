import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Client, Provider } from './interfaces/types';
import { Fournisseur } from './modeles/fournisseur.model';
import { ClientService } from './services/client/client.service';
import { FournisseurService } from './services/founisseur/fournisseur.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit {
  clientDialog: boolean = false;
  clientDialogSubmitLabel = '';
  clientDialogHeaderTitle = '';
  clients: Client[] = [];
  providers: Provider[] = [];

  client: any;
  fourniseeur = new Fournisseur('');

  submitted: boolean = false;
  submittedProvider: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService,
    private clientService: ClientService,
    private fournisseurService: FournisseurService
  ) {}

  ngOnInit() {
    this.runGetClients();
    this.runGetproviders();
  }

  runGetClients(): void {
    this.clientService.getClients().subscribe((data) => {
      this.clients = data.data.clients;
    });
  }

  runGetproviders(): void {
    this.fournisseurService.getProviders().subscribe((data) => {
      this.providers = data.data.providers;
    });
  }

  addClient() {
    this.clientDialogHeaderTitle = 'Ajouter client';
    this.clientDialogSubmitLabel = 'Ajouter';
    this.client = {};
    this.submitted = false;
    this.clientDialog = true;
  }

  editClient(editingClient: any) {
    this.clientDialogHeaderTitle = 'Modifier client';
    this.clientDialogSubmitLabel = 'Modifier';
    this.client = { ...editingClient };
    this.clientDialog = true;
  }

  deleteClient(client: any) {
    this.confirmationService.confirm({
      message: `Voulez-vraiment supprimer ${client.name} ?`,
      header: 'Client',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clientService
          .deleteClientById(client._id)
          .subscribe((clientDeleted) => {
            if (clientDeleted.status === 'success') {
              this.messageService.add({
                severity: 'Client',
                summary: 'Successful',
                detail: `${client.name} a été supprimer`,
                life: 3000,
              });
              this.runGetClients();
            }
          });
      },
    });
  }

  deleteProvider(provider: any) {
    this.confirmationService.confirm({
      message: `Voulez-vraiment supprimer ${provider.name} ?`,
      header: 'Fournisseur',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.fournisseurService
          .deleteProvidersById(provider._id)
          .subscribe((providerDeleted) => {
            if (providerDeleted.status === 'success') {
              this.messageService.add({
                severity: 'Fournisseur',
                summary: 'Successful',
                detail: `${provider.name} a été supprimer`,
                life: 3000,
              });
              this.runGetproviders();
            }
          });
      },
    });
  }

  runAddProvider(provider: Fournisseur) {
    const hasError = !provider.name;
    if (hasError) {
      this.submittedProvider = true;
      return;
    } else this.submittedProvider = false;
    delete provider.id;
    this.fournisseurService
      .addProviders(provider)
      .subscribe((providerAdded) => {
        if (providerAdded.status === 'success') {
          this.messageService.add({
            severity: 'Fournisseur',
            summary: 'Successful',
            detail: `${provider.name} a été ajouter`,
            life: 3000,
          });
          this.runGetproviders();
          this.fourniseeur.name = '';
        }
      });
  }

  hideDialog() {
    this.clientDialog = false;
    this.submitted = false;
  }

  submitClientData() {
    this.submitted = true;
    if (this.client._id) {
      this.runEditCLient();
      return;
    }
    this.runAddClient();
  }
  runAddClient() {
    this.clientService.addClient(this.client).subscribe((clientAdded) => {
      if (clientAdded.status === 'success') {
        this.runGetClients();
        this.messageService.add({
          severity: 'Client',
          summary: 'Successful',
          detail: `${this.client.name} a été ajouter`,
          life: 3000,
        });
        this.clientDialog = false;
        this.client = {};
      }
    });
  }
  runEditCLient() {
    this.clientService
      .updateClientById(this.client)
      .subscribe((clientUpdated) => {
        if (clientUpdated.status === 'success') {
          this.runGetClients();
          this.messageService.add({
            severity: 'Client',
            summary: 'Successful',
            detail: `${this.client.name} a été modifier`,
            life: 3000,
          });
          this.clientDialog = false;
          this.client = {};
        }
      });
  }
}
