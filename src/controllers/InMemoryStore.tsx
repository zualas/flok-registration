import React from "react";

/**
 * Singleton in-memory store
 */

export default class InMemoryStore {
  private static store: InMemoryStore;
  private data: object[] = [];
  private id: number = 0;
  listener: StoreListener;
  static getStorage = (): InMemoryStore => {
    if (InMemoryStore.store === undefined) {
      InMemoryStore.store = new InMemoryStore();
    }
    return InMemoryStore.store;
  };

  addListener = (listener: StoreListener): void => {
    this.listener = listener;
  };

  createRecord = (record: object): void => {
    const last = this.id;
    const deleteRun = () => {
      InMemoryStore.getStorage().deleteRecord(last);
      this.listener.onChange();
    };
    // @ts-ignore so that we don't have to define all possible properties
    record["delete"] = (
      <DeleteButton delete={deleteRun} listener={this.listener} />
    );
    record["id"] = this.id++;
    this.data.push(record);
  };

  getData = (): object[] => {
    return this.data;
  };

  deleteRecord = (id: number) => {
    for (let i = 0; i < this.data.length; i++) {
      // @ts-ignore
      if (this.data[i].id === id) {
        let tempData = this.data
          .slice(0, i)
          .concat(this.data.slice(i + 1, this.data.length));
        this.data = tempData;
      }
    }
  };
}

/* The Store is not a react component,
 * so when a user is clicking DeleteButton component,
 * the parent component needs to subscribe to changes in order to re-render itself
 */
export interface StoreListener {
  onChange(): void;
}

/*
 * Component that is shown in UserManagement and allows to delete a user
 */
class DeleteButton extends React.Component {
  render() {
    return (
      // @ts-ignore
      <button onClick={this.props.delete}>Delete</button>
    );
  }
}
