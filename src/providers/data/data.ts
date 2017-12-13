import { Injectable } from '@angular/core';
import {AngularFirestoreCollection, AngularFirestore} from "angularfire2/firestore";
import {Observable} from "rxjs";

/*
  Generated class for the DataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

export interface Card {
    id?: string;
    cardAvatar: string;
    cardContent: string;
    likes: number;
    img:string;
    cardName:string;
    dislikes:number;
    date:string;
    userName: string;
    // comment: string;
    comments: Array<any>;
    commentDate:Array<any>;
}

@Injectable()
export class DataProvider {

    //Card was any
    cardsListRef:AngularFirestoreCollection<Card>;
    //Card was any
    cardList: Observable<Card[]>;

  constructor(private afs:AngularFirestore) {
      this.cardsListRef = this.afs.collection(`Cards`);
      // this.cardList = this.cardsListRef.valueChanges();
      this.cardList = this.cardsListRef.snapshotChanges().map(actions => {
          return actions.map(action => {
              const data = action.payload.doc.data() as Card;
              const id = action.payload.doc.id;
              return { id, ...data };
          });
      });
  }

    deleteCard(cardID):void {
      this.cardsListRef.doc(cardID).delete();
}

  updateLikes(card:Card){
   this.cardsListRef.doc(card.id).update({ likes: card.likes });
  }

  updateDislikes(card:Card){
    this.cardsListRef.doc(card.id).update({ dislikes: card.dislikes });
  }

    updateCard(cardID, data):void {
      this.cardsListRef.doc(cardID).update(data);
  }

  addNewCard(cardInfo):void {
      if(cardInfo){
          this.cardsListRef.add(cardInfo);
      }
  }

  updateComment(card) {
      this.cardsListRef.doc(card.id).update({ comments: card.comments });
      // this.cardsListRef.doc(card.id).update({commentDate:card.commentDate});
  }

  updateCommentDate(card) {
      this.cardsListRef.doc(card.id).update({commentDate:card.commentDate});
  }

}
