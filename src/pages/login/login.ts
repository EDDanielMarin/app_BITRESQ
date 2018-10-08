import { Component } from '@angular/core';
import { IonicPage, NavController,LoadingController, Loading, AlertController} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Storage } from '@ionic/storage';

import { RestProvider } from '../../providers/rest/rest';
import { HomePage } from '../home/home';
import { TabsControllerPage } from '../tabs-controller/tabs-controller';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

 

  myForm: FormGroup;
  user: any={}
  public loading:Loading;

  constructor(
    public navCtrl: NavController,
    public formBuilder: FormBuilder,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private storage: Storage,
    private _rest:RestProvider
  ) {
    this.myForm = this.formBuilder.group({
      usuario: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.user = {}
  }

  loginUser(){
    var data=
    {
      nombreUsuario:  this.myForm.value.usuario,
      password : this.myForm.value.password
    } 
    this._rest.ejecutaPost('login',data).subscribe((resp)=>
    {
      this.storage.set('user', resp.user);
      this.storage.set('jwt', resp.token);
      this.navCtrl.setRoot(HomePage)
      ///console.log(resp)
      
    },
    (err)=>{

      this.loading.dismiss().then( () => {
       // console.log(err.message)
        let alert = this.alertCtrl.create({
          message: err.error.mesagge,
          buttons: [
            {
              text: "Ok",
              role: 'cancel'
            }
          ]
        });
        alert.present();
      });
    })
   

    this.loading = this.loadingCtrl.create({
      dismissOnPageChange: true,
    });
    this.loading.present();
  }
  

  goToSignup(){
    this.navCtrl.push('SignupPage');
  }

  goToResetPassword(){
    this.navCtrl.push('ResetPasswordPage');
  }

  

}
