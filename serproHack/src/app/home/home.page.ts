import { Platform } from '@ionic/angular';
import { Hotspot, HotspotNetwork } from '@ionic-native/hotspot/ngx';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  networks: HotspotNetwork[] = [];

  constructor(public platform:Platform, public hotspot: Hotspot) {
    this.platform.ready().then(()=>{
      this.hotspot.scanWifi().then((newtworks:HotspotNetwork[])=>{
        this.networks = newtworks;
        console.log("net: " + newtworks)
      })
    }).catch(error => {
      console.log(error.message)
    })
  }

}
