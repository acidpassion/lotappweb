import { Component, ViewChild, ElementRef } from '@angular/core';

import { ConferenceData } from '../../providers/conference-data';

import { Platform} from 'ionic-angular';

import { LocalNotifications } from '@ionic-native/local-notifications';


@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('mapCanvas') mapElement: ElementRef;
  constructor(public confData: ConferenceData, public platform: Platform, private localNotifications: LocalNotifications) {
    // this.localNotifications.on('click', (event, notification, state) => {
    //     let json = JSON.parse(notification.data);
    //     let alert = alertCtrl.create({
    //       title: notification.title,
    //       subTitle: json.mydata
    //     });
    //     alert.present();
    //   })
  }

  scheduleNotification() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Attention',
      text: 'Simons Notification',
      data: { mydata: 'My hidden message this is' },
      at: new Date(new Date().getTime() + 5 * 1000)
    });
  }

  ionViewDidLoad() {

    

  }
}
