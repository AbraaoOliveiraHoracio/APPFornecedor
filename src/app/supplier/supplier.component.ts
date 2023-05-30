import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Fornecedor } from '../Fornecedor';
import { FornecedorService } from '../fornecedor.service';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css']
})

  export class SupplierComponent implements OnInit {
    fornecedor: Fornecedor[] = [];
    isEditing: boolean = false;
    submitted: boolean = false;
    formGroupFornecedor: FormGroup;

    constructor(
      private fornecedorService: FornecedorService,
      private formBuilder: FormBuilder
    ) {
      this.formGroupFornecedor = formBuilder.group({
        id: [''],
        name: ['',[Validators.required] ],
        telefone: ['',[Validators.required] ],
        endereco: ['',[Validators.required] ],
      });
    }
    ngOnInit(): void {
      this.loadfornecedor();
    }
    loadfornecedor() {
      this.fornecedorService.getfornecedor().subscribe({
        next: (data) => (this.fornecedor = data),
      });
    }
    save() {


        if (this.isEditing) {
          this.fornecedorService.update(this.formGroupFornecedor.value).subscribe({
            next: () => {
              this.loadfornecedor();
              this.formGroupFornecedor.reset();
              this.isEditing = false;
              this.submitted =false;
            },
          });
        } else {
          this.fornecedorService.save(this.formGroupFornecedor.value).subscribe({
            next: (data) => {
              this.fornecedor.push(data);
              this.formGroupFornecedor.reset();
              this.submitted =false;
            },
          });
        }



    }

    edit(fornecedor: Fornecedor) {
      this.formGroupFornecedor.setValue(fornecedor);
      this.isEditing = true;
    }

    delete(fornecedor: Fornecedor) {
      this.fornecedorService.delete(fornecedor).subscribe({
        next: () => this.loadfornecedor(),
      });
    }
    clear() {
      this.formGroupFornecedor.reset();
      this.isEditing = true;
      this.submitted = false;
    }

    get name() : any{
      return this.formGroupFornecedor.get("name");
    }
    get email() : any{
      return this.formGroupFornecedor.get("email");
    }
    get endereco() : any{
      return this.formGroupFornecedor.get("endereco");
    }
    get telefone() : any{
      return this.formGroupFornecedor.get("telefone");
    }
}

