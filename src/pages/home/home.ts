import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController} from 'ionic-angular';
import {DataProvider} from "../../providers/data/data";

@IonicPage()

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cards:any;

  constructor(public navCtrl: NavController, public dataService:DataProvider, public alertCtrl:AlertController) {

    this.cards = this.dataService.cardList;

  }

    likesClicked(card):void {
        card.likes ++;
        this.dataService.updateLikes(card);
    }

    dislikesClicked(card):void {
        card.dislikes ++;
        this.dataService.updateDislikes(card);
    }

    addCard():void {
            let prompt = this.alertCtrl.create({
                title: 'Add Post',
                message: "Add the following information to add a card.",
                inputs: [
                    {
                        name: 'cardName',
                        placeholder: 'Title'
                    },
                    {
                        name: 'cardContent',
                        placeholder: 'Description'
                    },
                    {
                        name: 'img',
                        placeholder: 'Image (URL)'
                    },
                    {
                        name: 'cardAvatar',
                        placeholder: 'Avatar (URL)'
                    },
                    {
                        name: 'userName',
                        placeholder: 'Your Name or Synonym'
                    },
                ],

                buttons: [
                    {
                        text: 'Cancel',
                        handler: data => {
                            console.log('Cancel clicked');
                        }
                    },
                    {
                        text: 'Save',
                        handler: data => {

                            if(data.cardAvatar == "") {
                                data.cardAvatar = "assets/img/Anonymous.jpg"
                            }
                            // this.cards.push(data);

                            if(data.cardName == ""){
                                data.cardName = "Untitled Beauty"
                            }

                            if(data.cardContent == ""){
                                data.cardContent = "No Description"
                            }

                            if(data.userName == ""){
                                data.userName = "Anonymous User"
                            }

                            data["likes"] = 0;
                            data["dislikes"] = 0;
                            data["comments"] = [];
                            // let today = new Date();
                            // data["date"] = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
                            let today = new Date();
                            let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
                            let time = today.getHours() + ":" + today.getMinutes();
                            //To add second add this [ + ":" + today.getSeconds() ]
                            let dateTime ='Posted:'+' '+date+' ' +'At:'+' '+time; data['date'] = dateTime;
                            // data["date"] = new Date().toString();
                            this.dataService.addNewCard(data);
                        }
                    }
                ]
            });
            prompt.present();
        }

    deleteCard(id):void {
      this.dataService.deleteCard(id);
    }
    updateCard(card):void {
        let prompt = this.alertCtrl.create({
            title: 'Edit Post',
            message: "Edit the following information on the card.",
            inputs: [
                {
                    name: 'cardName',
                    value: card.cardName
                },
                {
                    name: 'cardContent',
                    value: card.cardContent
                },
                {
                    name: 'img',
                    value: card.img
                },
                // {
                //     name: 'cardAvatar',
                //     value: card.cardAvatar
                // },
            ],
            buttons: [
                {
                    text: 'Cancel',
                    handler: data => {
                        console.log('Cancel clicked');
                    }
                },
                {
                    text: 'Save',
                    handler: data => {
                        let today = new Date();
                        let date = (today.getMonth()+1)+'-'+today.getDate()+'-'+today.getFullYear();
                        let time = today.getHours() + ":" + today.getMinutes();
                        //To add second add this [ + ":" + today.getSeconds() ]
                        let dateTime ='Edit Posted:'+' '+date+' ' +'At:'+' '+time; data['date'] = dateTime;
                        this.dataService.updateCard(card.id, data);
                        // data["date"] = new Date().toString();
                        // this.dataService.updateCard(data);
                    }
                }
            ]
        });
        prompt.present();
    }

    cardPageClick(card) {
      this.navCtrl.push("CardPage",card);
    }

}
