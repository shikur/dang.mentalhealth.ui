import { NgModule } from '@angular/core';
import { CommonModule, NgClass } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, NgbModalModule, NgClass],
  exports: [CommonModule, RouterModule, FormsModule, NgbModalModule, NgClass]
})
export class SharedModule { }
