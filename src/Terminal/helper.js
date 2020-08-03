function onCd(second) {
  let res;
  if (second === '..') res = this.pathAction('goBack');
  else res = this.pathAction(second);
  if (res) this.putPath(`${this.getPath()}>`);
  else {
    this.putPath(`Don't found folder ${second}`, false);
    this.putPath(`${this.getPath()}>`);
  }
}

function onOpen(second) {
  const res = this.openFile(second);
  if (!res) this.putPath(`${this.getPath()}>`);
  else {
    this.putPath(res, false);
    this.putPath(`${this.getPath()}>`);
  }
}

function onRun(second) {
  const res = this.runFile(second);
  if (res === false) {
    this.putPath(`Don't found file ${second}`, res);
  } else {
    this.putPath(res, false);
  }
  this.putPath(`${this.getPath()}>`);
}

function onCreate(second, third) {
  if (
    (second === 'file' || second === 'folder')
    && third === undefined
  ) {
    this.putPath(`Please writh ${second} name`, false);
  } else if (second === 'file' || second === 'folder') {
    this.putPath(this.create(second, third), false);
  } else {
    this.putPath('You can create only file or folder', false);
  }
  this.putPath(`${this.getPath()}>`);
}

function onDelete(second) {
  if (this.remove(second)) this.putPath(`${second} deleted`, false);
  else this.putPath(`${second} don't found in this folder`, false);
  this.putPath(`${this.getPath()}>`);
}

function onRename(second, third) {
  if (second === undefined || third === undefined) {
    this.putPath(
      'You must writh "rename [old name] [new name]"',
      false,
    );
  } else if (this.rename(second, third)) {
    this.putPath(`You rename ${second} to ${third}`, false);
  } else {
    this.putPath(`We can't rename ${second} to ${third}`, false);
  }
  this.putPath(`${this.getPath()}>`);
}

function terminalCommandsHandler(value) {
  const commandsArray = value.split(' ');
  if (commandsArray.length === 1) {
    const [first] = commandsArray;
    if (first === 'help') {
      this.halp();
      this.putPath(`${this.getPath()}>`);
    } else {
      this.putPath("it's not a correct command, writh help", false);
      this.putPath(`${this.getPath()}>`);
    }
  } else if (commandsArray.length !== 2 && commandsArray.length !== 3) {
    this.putPath("it's not a correct command, writh help", false);
    this.putPath(`${this.getPath()}>`);
  } else {
    const [first, second, third] = commandsArray;
    switch (first) {
      case 'cd':
        {
          onCd.call(this, second);
        }
        break;
      case 'open':
        {
          onOpen.call(this, second);
        }
        break;
      case 'run':
        {
          onRun.call(this, second);
        }
        break;
      case 'create':
        {
          onCreate.call(this, second, third);
        }
        break;
      case 'delete':
        {
          onDelete.call(this, second);
        }
        break;
      case 'rename':
        {
          onRename.call(this, second, third);
        }
        break;
      default: {
        this.putPath("it's not a correct command, writh help", false);
        this.putPath(`${this.getPath()}>`);
      }
    }
  }
}

const changeVal = (val) => val.replace(/\s+/g, ' ').trim();

const helpArr = ['Change folder "cd [folder name]"',
  'Open file "open [file name]"',
  'Run file "run [file name]"',
  'Create file "create file [file name]"',
  'Create folder "create folder [folder name]"',
  'Delete file or folder "delete [name]"',
  'Rename file or folder "rename [old name] [new name]"'];

function commandHelp() {
  const main = document.createElement('p');
  main.classList.add('main');
  main.innerHTML = helpArr.map((element) => (
    `<p class="main"><p class="path">${element}</p></p>`
  )).join(' ');
  this.terminalContent.append(main);
}

export { terminalCommandsHandler, changeVal, commandHelp };
