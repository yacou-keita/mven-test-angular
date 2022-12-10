import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MessageService, ConfirmationService],
})
export class AppComponent implements OnInit {
  title = 'web';
  productDialog: boolean = false;

  clients = [
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
    {
      id: 'azert',
      name: 'yacou',
      email: 'yacou@gmail.com',
      phone: '444444444',
      providers: [
        {
          id: '7855ss',
          name: 'Orange',
        },
      ],
    },
  ];

  product: any;

  selectedclients!: any;

  submitted: boolean = false;

  constructor(
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit() {}

  openNew() {
    this.product = {};
    this.submitted = false;
    this.productDialog = true;
  }

  deleteSelectedclients() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected clients?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients = this.clients.filter(
          (val) => !this.selectedclients.includes(val)
        );
        this.selectedclients = null;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'clients Deleted',
          life: 3000,
        });
      },
    });
  }

  editProduct(product: any) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: any) {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete ' + product.name + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.clients = this.clients.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Deleted',
          life: 3000,
        });
      },
    });
  }

  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.clients[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Updated',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.clients.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Successful',
          detail: 'Product Created',
          life: 3000,
        });
      }

      this.clients = [...this.clients];
      this.productDialog = false;
      this.product = {};
    }
  }

  findIndexById(id: string): number {
    let index = -1;
    for (let i = 0; i < this.clients.length; i++) {
      if (this.clients[i].id === id) {
        index = i;
        break;
      }
    }

    return index;
  }

  createId(): string {
    let id = '';
    var chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return id;
  }
}
