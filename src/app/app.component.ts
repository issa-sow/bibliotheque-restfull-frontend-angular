import { Component } from '@angular/core';
import { map } from 'rxjs/operators'
import { Client } from './models/Cllient';
import { ClientService } from './services/client.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html', 
  styleUrls: ['./app.component.scss']
})
export class AppComponent{
  
  constructor() {}

}
