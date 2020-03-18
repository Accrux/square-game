import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from "@angular/forms";
import { SquareComponent } from './square/square.component';
import {GameService} from './services/game.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import {MatFormFieldModule} from '@angular/material/form-field';
import { InfoComponent } from './info/info.component';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatDialogModule} from "@angular/material/dialog";
import { ModalComponent } from './modal/modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SquareComponent, 
    InfoComponent, ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatButtonModule,
    MatDividerModule,
    MatListModule,
    MatDialogModule
  ],
  providers: [GameService],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
