import state from '../State/State.js';
import {
  newRootForJSON,
  authHandler,
  parseDataFromSv,
} from './helper.js';

require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AURH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
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
    this.signoutBtn = document.getElementById('signout');
    this.save = document.getElementById('save');
    this.closeBtn = this.authModal.querySelector('#closeModal');
    this.errorMessage = this.authModal.querySelector('#errorMessage');
    this.emailP = document.getElementById('emailP');

    this.signinBtn.onclick = this.clickHandler;
    this.signupBtn.onclick = this.clickHandler;
    this.save.onclick = this.onSave;
    this.closeBtn.onclick = this.onClose;
    this.signoutBtn.onclick = this.signout;
  }
  signout = () => {
    firebase.auth().signOut()
      .then(() => {
        state.userID = '';
        state.email = '';
        this.signinBtn.style.display = 'block';
        this.signupBtn.style.display = 'block';
        this.signoutBtn.style.display = 'none';
        this.emailP.textContent = '';
      });
    state.reset();
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
        state.email = user.email;
        this.signinBtn.style.display = 'none';
        this.signupBtn.style.display = 'none';
        this.signoutBtn.style.display = 'block';
        this.emailP.textContent = state.email;
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
        this.signinBtn.style.display = 'none';
        this.signupBtn.style.display = 'none';
        this.signoutBtn.style.display = 'block';
        this.emailP.textContent = state.email;
        this.email.value = '';
        this.password.value = '';
        this.authModal.style.display = 'none';
        this.errorMessage.textContent = '';
        state.root = val ? parseDataFromSv(val) : state.root;
        this.save.disabled = false;
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
