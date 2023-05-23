import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../Client';
import { ClientService } from '../client.service';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
  export class ClientComponent implements OnInit {
    clients: Client[] = [];
    isEditing: boolean = false;
    submitted: boolean = false;
    formGroupClient: FormGroup;

    constructor(
      private clientService: ClientService,
      private formBuilder: FormBuilder
    ) {
      this.formGroupClient = formBuilder.group({
        id: [''],
        name: ['',[Validators.required] ],
        telefone: ['',[Validators.required] ],
        endereco: ['',[Validators.required] ],
        email: ['',[Validators.required, Validators.email]],
      });
    }
    ngOnInit(): void {
      this.loadClients();
    }
    loadClients() {
      this.clientService.getClients().subscribe({
        next: (data) => (this.clients = data),
      });
    }
    save() {


        if (this.isEditing) {
          this.clientService.update(this.formGroupClient.value).subscribe({
            next: () => {
              this.loadClients();
              this.formGroupClient.reset();
              this.isEditing = false;
              this.submitted =false;
            },
          });
        } else {
          this.clientService.save(this.formGroupClient.value).subscribe({
            next: (data) => {
              this.clients.push(data);
              this.formGroupClient.reset();
              this.submitted =false;
            },
          });
        }



    }

    edit(client: Client) {
      this.formGroupClient.setValue(client);
      this.isEditing = true;
    }

    delete(client: Client) {
      this.clientService.delete(client).subscribe({
        next: () => this.loadClients(),
      });
    }
    clear() {
      this.formGroupClient.reset();
      this.isEditing = true;
      this.submitted = false;
    }

    get name() : any{
      return this.formGroupClient.get("name");
    }
    get email() : any{
      return this.formGroupClient.get("email");
    }
}
