import { createElement, getElement, checkExtension } from '../helper.js';

class TabsView {
  constructor() {
    this.tabs = getElement('tabs');
    this.editor = getElement('editor');
    this.textarea = getElement('content');
    this.oldActive = null;
    this.textarea.value = null;

    this.tabsContainer = createElement('ul', null, 'tabs-container');

    this.tabs.append(this.tabsContainer);
  }

  renderTabs = (activeTab, operation, openTabs) => {
    if (this.oldActive === activeTab && operation === 'select') return;
    this.saveTabContent(this.oldActive, this.textarea.value);
    this.oldActive = activeTab;

    if (activeTab) {
      this.textarea.value = activeTab.content;
    } else {
      this.textarea.value = null;
    }
    // clear all li elements in ul
    while (this.tabsContainer.firstElementChild) {
      this.tabsContainer.firstElementChild.remove();
    }
    const listOfTabs = [];

    openTabs.forEach((file) => {
      const li = createElement('li', null, 'tab');
      li.classList.add(checkExtension(file.name));
      li.setAttribute('data-file', file.name);
      if (activeTab === file) {
        li.classList.add('tab-active');
      }
      li.addEventListener('click', () => {
        this.updateTabsInState(file, 'select');
      });

      const span = createElement('span', null, 'tab-name');
      span.textContent = file.name;

      const closeIcon = createElement('i', null, 'fas fa-times tab-close');
      closeIcon.addEventListener('click', (e) => {
        e.stopPropagation();
        this.updateTabsInState(file, 'closeTab');
      });
      li.append(span, closeIcon);

      listOfTabs.push(li);
    });

    listOfTabs.forEach((tab) => this.tabsContainer.append(tab));
  };

  bindUpdateTabsInState(cb) {
    this.updateTabsInState = cb;
  }

  bindSaveTabContent(cb) {
    this.saveTabContent = cb;
  }
}

export default TabsView;
