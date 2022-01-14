import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/Cllient';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  constructor(private http: HttpClient) { }

  /**
   * Recuperation des clients depuis l'api rest(le backend spring)
   * La classe HttpHeaders permet d'envoyer des entêtes http
   */
  public loadAllClients(){
    /*let headers = new HttpHeaders();
    headers.append('content-type', 'application/json');
    headers.append('accept', 'application/json'); */
    return this.http.get<Client[]>("http://localhost:8080/rest/client/api/clients", /*{ headers: headers }*/);
  }

  /**
   * Récupérationn d'un seul client depuis l'api rest(le backend)
   */
  public loadOneClient(idClient: number) {
    return this.http.get<Client>("http://localhost:8080/rest/client/api/clients/"+idClient);
  }

  /**
   * appel de la methode searchClientsByNom() depuis le backend
   */
  public loadClientsByNom(nom: string, page: number, size: number) {
	return this.http.get<any>("http://localhost:8080/rest/client/api/searchClientNom?nom="+nom+"&page="+page+"&size="+size)
  }

   /**
	* Modifier un client depuis le backend
   */
	public saveClient(client: Client) {
		return this.http.post<Client>("http://localhost:8080/rest/client/api/clients", client);
	} 

  /**
	* Modifier un client depuis le backend
   */
	public EditClient(id: number, client: Client) {
		return this.http.put<Client>("http://localhost:8080/rest/client/api/clients/"+id, client);
	} 

  /**
	* Supprimer un client depuis le backend
   */
  public deleteClient(id: number) {
	  return this.http.delete<boolean>("http://localhost:8080/rest/client/api/clients/"+id);
  } 
}
