import {Component, Inject} from 'angular2/core';
import {AngularFire, FirebaseAuth} from 'angularfire2';
import {FormBuilder, ControlGroup, Control} from 'angular2/common';

@Component({
  selector: 'form-message',
  templateUrl: 'app/form-message/form-message.html',
  styleUrls: ['app/form-message/form-message.css']
})
export class FormMessage {
  
  messageForm: ControlGroup;
  messageControl: Control;

  constructor(@Inject(FirebaseAuth) public auth: FirebaseAuth, fb: FormBuilder, private af: AngularFire) {
    this.messageControl = fb.control('');
    this.messageForm = fb.group({
      messageControl: this.messageControl
    });
  }
  
  sendMessage() {
    this.af.database.list('/messages').push({
      user: this.auth.getAuth().twitter.username, 
      msg: this.messageControl.value,
      date: new Date()
    });
  }

}
