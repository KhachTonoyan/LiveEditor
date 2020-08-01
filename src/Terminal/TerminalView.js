import { terminalCommandsHandler, changeVal, commandHelp } from './helper.js';

const container = document.getElementById('container');

class TerminalView {
  constructor() {
    this.openTerminalButton = document.getElementById('terminalBtn');
    this.terminal = document.getElementById('terminal');
    this.terminalContent = this.terminal.querySelector('#terminalContent');
    this.closeTerminal = this.terminal.querySelector('#closeTerminal');
    this.activInput = null;

    this.openTerminalButton.onclick = this.terminalBtnHandler;
    this.closeTerminal.onclick = this.closeTerminalHandler;
    this.terminal.onclick = () => {
      this.activInput && this.activInput.focus();
    };
  }
  closeTerminalHandler = () => {
    this.terminal.style.display = 'none';
    this.terminalContent.innerHTML = '';
    container.classList.remove('terminal-open');
  };
  terminalBtnHandler = () => {
    if (this.terminal.style.display === 'block') {
      this.closeTerminalHandler();
    } else {
      this.terminal.style.display = 'block';
      this.putPath(`${this.getPath()}>`);
      container.classList.add('terminal-open');
    }
  }
  putPath = (path, ok) => {
    const main = document.createElement('p');
    main.classList.add('main');
    main.innerHTML = `
              <p class="path">${path}</p>
              ${ok === undefined ? '<p class="logP"><input class="log activLog" maxlength="60"/></p>' : ''}
              `;
    this.terminalContent.append(main);
    this.activInput = main.querySelector('.activLog');
    if (this.activInput) {
      this.activInput.focus();
      this.activInput.onkeyup = this.hendleInput;
    }
  }

  hendleInput = (event) => {
    if (event.key === 'Enter') {
      const inpVal = changeVal(this.activInput.value);
      this.activInput.classList.remove('activLog');
      this.activInput.disabled = 'disabled';
      this.activInput.onkeyup = null;
      this.activInput = null;
      if (inpVal !== '') this.do(inpVal);
      else this.putPath(`${this.getPath()}>`);
    }
  }

  do = (value) => {
    terminalCommandsHandler.call(this, value);
  }

    halp = () => {
      commandHelp.call(this);
    }

    // binding
  bindOnGetPath = (cb) => {
    this.getPath = cb;
  }

  bindRename = (cb) => {
    this.rename = cb;
  }

  bindPathAction = (cb) => {
    this.pathAction = cb;
  }

  bindOpenFile = (cb) => {
    this.openFile = cb;
  }

  bindRunFile = (cb) => {
    this.runFile = cb;
  }

  bindCreate = (cb) => {
    this.create = cb;
  }

  bindRemove = (cb) => {
    this.remove = cb;
  }
}

export default TerminalView;
