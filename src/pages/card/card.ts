import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

/**
 * Generated class for the CardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-card',
  templateUrl: 'card.html',
})
export class CardPage {

    card:any;

    // comment = {};

    newComment;

    comments = [];



  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataProvider) {



      this.card = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    console.log(this.card.comments);
  }

    logForm() {
        // this.card.comment = this.comment;
        let newDate = new Date();




        this.card.comments.push({comment: this.newComment, date: newDate});
        this.newComment = '';
        this.dataService.updateComment(this.card);
        // let today = new Date();
        // let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        // let time = today.getHours() + ":" + today.getMinutes();
        // //To add second add this [ + ":" + today.getSeconds() ]
        // let dateTime ='Posted:'+' '+date+' ' +'At:'+' '+time; this.comments['date'] = dateTime;
    }


}
