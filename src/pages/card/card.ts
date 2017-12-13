import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";
import {update} from "ionic-angular/umd/components/slides/swiper/swiper";

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

    commentDate = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public dataService:DataProvider) {



      this.card = this.navParams.data;

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CardPage');
    console.log(this.card.comments);
  }

    logForm() {
        // this.card.comment = this.comment;
        this.card.comments.push(this.newComment);
        this.dataService.updateComment(this.card);
        this.newComment = '';
        if(this.card.comments) {
            this.card.commentDate = new Date();
        }

        // let today = new Date();
        // let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
        // let time = today.getHours() + ":" + today.getMinutes();
        // //To add second add this [ + ":" + today.getSeconds() ]
        // let dateTime ='Posted:'+' '+date+' ' +'At:'+' '+time; this.comments['date'] = dateTime;
    }


}
