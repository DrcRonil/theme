import { Component,EventEmitter, OnInit,Output } from '@angular/core';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {

  @Output() hidemenu: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }
  hidebutton:boolean=false;

  MenuHide(){
   this.hidebutton=!this.hidebutton;
   this.hidemenu.emit();
  }
}
