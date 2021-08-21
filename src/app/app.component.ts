import { Component ,OnInit } from '@angular/core'; 
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  title = 'demo2';

  constructor(private primengConfig: PrimeNGConfig) {}

    ngOnInit() {
        this.primengConfig.ripple = true;
    }

  AppHideMenu:boolean=false;

  callMethod(){
    this.AppHideMenu=!this.AppHideMenu;
  }

  onMaskClick() {
    this.AppHideMenu=false;
  }


}
