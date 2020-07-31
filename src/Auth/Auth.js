import state from '../State/State.js';
import {
  newRootForJSON,
  authHandler,
  parseDataFromSv,
} from './helper.js';

const firebaseConfig = {
  apiKey: 'AIzaSyD2hOiJs7HTEcYgaaWGXtwiLnrIw4eE83E',
  authDomain: 'liveeditorpicsart.firebaseapp.com',
  databaseURL: 'https://liveeditorpicsart.firebaseio.com',
  projectId: 'liveeditorpicsart',
  storageBucket: 'liveeditorpicsart.appspot.com',
  messagingSenderId: '105636177693',
  appId: '1:105636177693:web:d86672592b00db8d8f63f4',
};
firebase.initializeApp(firebaseConfig);

class Auth {
  constructor() {
    this.authModal = document.getElementById('authModal');
    this.authForm = this.authModal.querySelector('#authForm');
    this.email = this.authModal.querySelector('#email');
    this.password = this.authModal.querySelector('#password');
    this.signinBtn = document.getElementById('signin');
    this.signupBtn = document.getElementById('signup');
    this.save = document.getElementById('save');
    this.closeBtn = this.authModal.querySelector('#closeModal');
    this.errorMessage = this.authModal.querySelector('#errorMessage');

    this.signinBtn.onclick = this.clickHandler;
    this.signupBtn.onclick = this.clickHandler;
    this.save.onclick = this.onSave;
    this.closeBtn.onclick = this.onClose;
  }
  clickHandler = ({ target: { id } }) => {
    this.onClickSave(id);
  };
  onClose = () => {
    this.authModal.style.display = 'none';
    this.email.value = '';
    this.password.value = '';
    this.errorMessage.textContent = '';
  };
  onClickSave = (type) => {
    this.authModal.style.display = 'block';
    this.authForm.onsubmit = type === 'signup' ? this.signupWithEmailAndPassword : this.signinWithEmailAndPassword;
  };

  onSave = () => {
    const newRoot = JSON.stringify(newRootForJSON(state.root));
    console.log(newRoot);
    firebase.database().ref(`data/${state.userID}`).set({
      root: newRoot,
    });
  };
  signupWithEmailAndPassword = (e) => {
    e.preventDefault();
    const { value: email } = this.email;
    const { value: password } = this.password;
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then(({ user }) => {
        state.userID = user.uid;
        this.email.value = '';
        this.password.value = '';
        this.authModal.style.display = 'none';
        this.errorMessage.textContent = '';
        this.save.disabled = false;
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage.textContent = err.message;
      });
  };

  signinWithEmailAndPassword = (e) => {
    e.preventDefault();
    const { value: email } = this.email;
    const { value: password } = this.password;
    authHandler(email, password)
      .then((val) => {
        this.email.value = '';
        this.password.value = '';
        this.authModal.style.display = 'none';
        this.errorMessage.textContent = '';
        state.root = val ? parseDataFromSv(val) : state.root;
        console.log(state.root);
        this.save.disabled = false;
        console.log(this.save);
        state.updateUI();
        state.onAuth();
      })
      .catch((err) => {
        console.log(err);
        this.errorMessage.textContent = err.message;
      });
  };
}

export default new Auth();
