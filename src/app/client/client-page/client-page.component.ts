import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Client } from 'src/app/models/Cllient';
import { ClientService } from 'src/app/services/client.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './client-page.component.html',
  styleUrls: ['./client-page.component.scss']
})
export class ClientPageComponent implements OnInit {

  clients: Client[] = [];

  /*cette section concerne la recherche */
  pages: Array<number> = [];
  chercherParNom = '';
  currentPage: number = 0;
  size: number = 2;

  /**
   * cette section concerne le mode d'affficage: 
   * liste des clients, resultat recherche ou encore formulaire de modification
   **/
  displayMode: number = 1;

  /* cette section de code concerne les modificications des clients */
  client: Client = new Client();

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAllClients();
  }

  /* Recuperation des clients depuis le service ClientService */
  getAllClients() {
    this.clientService.loadAllClients().subscribe(
      (data: Client[]) => {
        this.clients = data;
        this.displayMode = 1;
      },
      (error) => {
        console.log("Une erreur est survenue lors de chargement des clients: " + error);
      }
    );
  }

  chercherClient() {
    this.clientService.loadClientsByNom(this.chercherParNom, this.currentPage, this.size).subscribe(
      (data) => {
        this.clients = data.content;
        this.pages = new Array(data.totalPages);
      }
    );
  }

  onChercherClient() {
    this.chercherClient();
    this.displayMode = 2;
  }

  onGoToPage(i: number) {
    this.currentPage = i;
    this.chercherClient();
  }

  onEdit(client: Client) {
    /*this.clientService.loadOneClient(id).subscribe(
      (data: Client) => {
        this.client = data;
      }
    );*/
    this.client = client;
    this.displayMode = 3;
  }

  onSaveEdit() {
    this.clientService.EditClient(this.client.id, this.client).subscribe(
      (data: Client) => {
        this.displayMode = 1;
        this.getAllClients();
      }
    );
  }

  onDelete(id: number) {
    if(confirm("Souhaitez-vous vraiment supprimer le client de id: "+id)) {
      this.clientService.deleteClient(id).subscribe(
        (data: boolean) => {
          if(data) {
            alert("Le client dont l'id est " + id + ' a été supprimé avec succés');
            this.getAllClients();
          }
        }
      );
    }
  }

  /* Code de style css */
  getBgColor(i: number) {
    return (this.currentPage == i) ? 'blue' : null;
  }

  getColor(i: number) {
    return (this.currentPage == i) ? 'white' : null;
  }
}