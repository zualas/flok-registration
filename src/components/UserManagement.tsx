import React from "react";
// @ts-ignore no .d.ts declaration
import Table from "@empd/reactable";
import "@empd/reactable/lib/styles.css";
import InMemoryStore, { StoreListener } from "../controllers/InMemoryStore";

interface UserManagementProps {
  store: InMemoryStore;
}

export default class UserManagement
  extends React.Component<UserManagementProps, any>
  implements StoreListener {
  onChange(): void {
    this.setState({ updated: true });
  }

  state = {
    company: true, // true if company, false if private
    companyName: "",
    companyRegistryCode: "",
    name: "",
    age: 18,
    email: "",
    password: "",
    updated: false
  };

  constructor(props: any) {
    super(props);
  }

  componentDidMount() {
    document.title = "Flok Kasutajahaldus";
    this.props.store.addListener(this);
  }

  render() {
    return (
      <Table
        columns={[
          {
            name: "Ettevõte",
            selector: "companyName",
            className: "w-50",
            sortable: true
          },
          {
            name: "Registrikood",
            selector: "companyRegistryCode",
            sortable: true
          },
          {
            name: "Nimi",
            selector: "name",
            className: "w-50",
            sortable: true
          },
          {
            name: "Vanus",
            selector: "age",
            className: "w-50",
            sortable: true
          },
          {
            name: "Email",
            selector: "email",
            className: "w-50",
            sortable: true
          },
          {
            name: "Delete",
            selector: "delete",
            sortable: false,
            unsearchable: true
          }
        ]}
        data={this.props.store.getData()}
      />
    );
  }
}
