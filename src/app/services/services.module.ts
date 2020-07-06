import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RepositoryService } from './repository/repository.service';



@NgModule({
  imports: [],
  providers: [
      RepositoryService,
  ]
})
export class ServicesModule { }
