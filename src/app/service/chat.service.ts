import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'
import { AngularFireAuth } from '@angular/fire/auth';
import { firestore } from 'firebase';
import { tokenName } from '@angular/compiler';

interface Message {
  content:string
  type: string
  date: Date
  user: string
}


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  public resAuth;
  public uidEnBase ;
  uid: string;
  id: string;
  email: string;
  public mensajes;

  constructor(public db: AngularFirestore,
    public ad: AngularFireAuth) { }

    getChatRoom(uid){
        return this.db.collection('chatsRooms').doc(uid).valueChanges();
     }

   sendMessageToFirebase(message: Message, uid: string){
     console.log(message, uid);
     this.db.collection('chatsRooms').doc(uid).update({
       messages: firestore.FieldValue.arrayUnion(message),
     })
   }

registerCustom(token){
  return new Promise((res, rej)=>{
    this.ad.auth.signInWithCustomToken(token).then(res =>{
      console.log('res:',res);
      localStorage.setItem('uid', res.user.uid);
    }).catch(err=>{
      console.log('error:',err);
    })
  })
}

registerDb(){
  this.uid = localStorage.getItem('uid');
  console.log(this.uidEnBase)
  console.log(this.uid);
      console.log('no estaba registrado');
                  this.id = localStorage.getItem('id');
                  this.uid = localStorage.getItem('uid');
                  this.email = localStorage.getItem('email');
                  this.db.collection('chatsRooms').doc(this.uid).set({
                   name: localStorage.getItem('name'),
                   uid: this.uid,
                   role: "user",
                   data:
                   {
                     patientId:this.id,
                     email:this.email,
                    }
                  },{merge:true}).catch(err =>{
                    console.log(err, 'error de no escritura');
                  })
                  /* this.db.collection('chatsRooms').add({

                  }) */
      }

      registerToken(token, uid){
        this.id = localStorage.getItem('id');
        this.email = localStorage.getItem('email');
        this.db.collection('chatsRooms').doc(uid).set({
          fcmTokens:token,
          data:
          {
            patientid:this.id,
            email:this.email,
          }
        },{merge:true})
      }
      


   registerForCustom(){
     let registrar = localStorage.getItem('uid')
     if(registrar){
       console.log('ya no registrara');
     }else{
       let token = localStorage.getItem('token')
        return new Promise((resolve, reject)=>{
           this.ad.auth.signInWithCustomToken(token).then(res =>{
             console.log(res);
             localStorage.setItem('uid', res.user.uid )
             if(localStorage.getItem('uid')){
                this.registerDb();
              }else{
                const uid = localStorage.getItem('uid');
                return this.db.collection('chatsRooms').doc(uid).valueChanges()
             }
          }).catch(err => reject(err))
        });
     }
   }
   
/*      loginEmailUser(email, password){
         return new Promise((resolve, reject)=>{
           this.ad.auth.signInWithEmailAndPassword(email, password)
           .then(userData => resolve(userData)),
           err => (reject(err));
         });
     } */

    /*  registerToken(token){
       const uid = localStorage.getItem('uid');
       console.log('token', token);
       console.log('uid', uid);
        this.db.collection('chatsRooms').doc(uid).update({
          datos:{
            fcmToken:token
          }
        }).then(result =>{
          console.log('guardado el fcmToken');
        }).catch(err =>{
          console.log('error', err);
        })
     } */
}
