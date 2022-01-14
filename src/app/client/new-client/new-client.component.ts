import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Cllient';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-new-client',
  templateUrl: './new-client.component.html',
  styleUrls: ['./new-client.component.scss']
})
export class NewClientComponent implements OnInit {

  clientForm: FormGroup = this.formBuilder.group({});

  constructor(
    private formBuilder: FormBuilder, 
    private clientService: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.clientForm = this.formBuilder.group({
      'nom': ['', Validators.required],
      'prenom': ['', Validators.required],
      'adresse': ['', [Validators.required, Validators.email]],
      'email': ['', Validators.required],
      'job': ['', Validators.required],
      'dateCreation': ['', Validators.required]
    });
  }

  onAddClient() {
    let valueForm = this.clientForm.value;

    let client = new Client();
    client.nom = valueForm['nom'];
    client.prenom = valueForm['prenom'];
    client.adresse = valueForm['adresse'];
    client.email = valueForm['email'];
    client.job = valueForm['job'];
    client.dateCreation = valueForm['dateCreation'];

    this.clientService.saveClient(client).subscribe(
      (data: Client) => {
        this.router.navigate(['/client', 'list-client']);
      },
      (error) => {
        console.log('Une erreur est survenue lors de la creation du client');
      }
    );
  }
}
