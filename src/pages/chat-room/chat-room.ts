import { Component } from '@angular/core';
import { NavController, IonicPage, NavParams, ToastController } from 'ionic-angular';
import { Socket } from 'ng-socket-io';
import { Observable } from 'rxjs/Observable';
import { Storage } from "@ionic/storage";
import { DatosPage } from '../datos/datos';


@Component({
  selector: 'page-chat-room',
  templateUrl: 'chat-room.html',
})
export class ChatRoomPage {
  messages = [];
  nickname = 'test';
  message = '';
  usuario: any;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private socket: Socket,
    private toastCtrl: ToastController,
    public _storage: Storage) {
    //this.nickname = this.navParams.get('nickname');

    this._storage.get('user').then((resp) => {
      this.nickname = resp.nombreUsuario
      this.joinChat()

      this.usuario = resp

      this.getMessages().subscribe(message => {
        this.messages.push(message);
      });


      this.getUsers().subscribe(data => {
        let user = data['user'];
        if (data['event'] === 'left') {
          this.showToast('User left: ' + user);
        } else {
          this.showToast('Usuario unido: ' + user);
        }
      });


    })




  }
  joinChat() {
    this.socket.connect();
    this._storage.set("statusChat", 1)
    this.socket.emit('set-nickname', this.nickname)

    // this.navCtrl.push('ChatRoomPage', { nickname: this.nickname });
  }

  sendMessage() {
    this.socket.emit('add-message', { usuario: this.usuario, text: this.message });
    this.message = '';
  }

  getMessages() {
    let observable = new Observable(observer => {
      this.socket.on('message', (data) => {
        observer.next(data);
      });
    })
    return observable;
  }

  getUsers() {
    let observable = new Observable(observer => {
      this.socket.on('users-changed', (data) => {
        observer.next(data);
      });
    });
    return observable;
  }

  ionViewWillLeave() {
    // this.socket.disconnect();
  }
  inicio()
  {
    this.navCtrl.setRoot(DatosPage)
  }
  showToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }
}