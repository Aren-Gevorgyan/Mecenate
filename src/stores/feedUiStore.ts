import { makeAutoObservable } from 'mobx';

class FeedUiStore {
  isRefreshing = false;

  constructor() {
    makeAutoObservable(this);
  }

  setRefreshing = (value: boolean) => {
    this.isRefreshing = value;
  };
}

export const feedUiStore = new FeedUiStore();
