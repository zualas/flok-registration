import React from "react";
import FormValidation from "../controllers/FormValidation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMale,
  faBusinessTime,
  faMoneyBill,
  faUser,
  faEnvelope,
  faKey,
  faFileAlt,
  faTree
} from "@fortawesome/free-solid-svg-icons";
import Slider from "react-rangeslider";
import "react-rangeslider/lib/index.css";
import { withRouter } from "react-router-dom";
import InMemoryStore from "../controllers/InMemoryStore";

interface RegistrationProps {
  store: InMemoryStore;
}

export class Registration extends React.Component<RegistrationProps, any> {
  state = {
    isCompany: true, // true if company, false if private
    companyName: "",
    companyRegistryCode: "",
    name: "",
    age: "", // initial value
    email: "",
    password: "",

    showFormValidation: false // flag for validation to be shown
  };

  componentDidMount() {
    document.title = "Flok Registratsioon";
  }

  validateAndSave = () => {
    this.setState({ showFormValidation: true }, () => {
      document.getElementById("errors").innerHTML = "";
      const record = {
        companyName: this.state.companyName.trim(),
        companyRegistryCode: this.state.companyRegistryCode.trim(),
        name: this.state.name.trim(),
        age: this.state.age,
        email: this.state.email.trim(),
        password: this.state.password
      };
      let errorMessages = 0;
      if (this.state.isCompany) {
        !this.fieldValidOrShowError("companyName", record.companyName) &&
          errorMessages++;
        !this.fieldValidOrShowError(
          "companyRegistryCode",
          record.companyRegistryCode
        ) && errorMessages++;
      }
      !this.fieldValidOrShowError("name", record.name) && errorMessages++;
      !this.fieldValidOrShowError("age", record.age) && errorMessages++;
      !this.fieldValidOrShowError("email", record.email) && errorMessages++;
      !this.fieldValidOrShowError("password", record.password) &&
        errorMessages++;

      if (errorMessages === 0) {
        this.props.store.createRecord(record);
        // @ts-ignore
        this.props.history.push("/user-management");
      }
    });
  };

  fieldValidOrShowError = (element: string, input: string): boolean => {
    const el = document.getElementById(element);
    const elError = document.createElement("div");
    elError.classList.add("error");
    elError.innerHTML = FormValidation(element);
    // User tried to click registration button
    if (
      !FormValidation.checkValid(element, input) &&
      this.state.showFormValidation
    ) {
      if (!el.classList.contains("invalid")) {
        el.classList.add("invalid");
        el.classList.remove("valid");

        !el.lastChild.isEqualNode(elError) && el.appendChild(elError);
      }
      return false;
    } // User has not clicked registration, no need to show hints
    else if (!FormValidation.checkValid(element, input)) {
      el.classList.remove("invalid");
      el.classList.remove("valid");
      return false;
    } // All good, field valid
    else if (FormValidation.checkValid(element, input)) {
      el.classList.add("valid");
      el.classList.remove("invalid");
      el.contains(elError) && el.removeChild(elError);
      return true;
    }
  };

  render() {
    return (
      <form>
        <div className="row">
          <div className="input-group">
            <input
              type="radio"
              name="company-profile"
              value="true"
              id="company"
              checked={this.state.isCompany}
              onChange={() => this.setState({ isCompany: true })}
            />
            <label htmlFor="company">
              <span>
                <FontAwesomeIcon icon={faBusinessTime} /> Ettevõte
              </span>
            </label>
            <input
              type="radio"
              name="company-profile"
              value="false"
              id="individual"
              checked={!this.state.isCompany}
              onChange={() => this.setState({ isCompany: false })}
            />
            <label htmlFor="individual">
              {" "}
              <span>
                <FontAwesomeIcon icon={faMale} /> Eraisik
              </span>
            </label>
          </div>
          {this.state.isCompany && (
            <div id="companyName" className="input-group input-group-icon">
              <input
                type="text"
                placeholder="Ettevõtte nimi"
                value={this.state.companyName}
                onChange={event => {
                  this.setState({ companyName: event.target.value });
                  this.fieldValidOrShowError("companyName", event.target.value);
                }}
              />
              <div className="input-icon">
                <FontAwesomeIcon icon={faMoneyBill} />
              </div>
            </div>
          )}
          {this.state.isCompany && (
            <div
              id="companyRegistryCode"
              className={"input-group input-group-icon"}
            >
              <input
                type="text"
                placeholder="Ettevõtte registrikood"
                value={this.state.companyRegistryCode}
                onChange={event => {
                  this.setState({ companyRegistryCode: event.target.value });
                  this.fieldValidOrShowError(
                    "companyRegistryCode",
                    event.target.value
                  );
                }}
              />
              <div className="input-icon">
                <FontAwesomeIcon icon={faFileAlt} />
              </div>
            </div>
          )}
          <div id="name" className={"input-group input-group-icon"}>
            <input
              type="text"
              placeholder="Nimi"
              value={this.state.name}
              onChange={event => {
                this.setState({ name: event.target.value });
                this.fieldValidOrShowError("name", event.target.value);
              }}
            />
            <div className="input-icon">
              <FontAwesomeIcon icon={faUser} />
            </div>
          </div>
          <div id="age" className="input-group input-group-icon">
            <div className="input">
              <span className="input-label">
                Vanus<b>{(this.state.age && ": ") + this.state.age}</b>
              </span>
              <Slider
                value={this.state.age}
                onChange={value => {
                  this.fieldValidOrShowError("age", value);
                  this.setState({ age: value });
                }}
                min={18}
                max={120}
              />
              <div className="input-icon">
                <FontAwesomeIcon icon={faTree} />
              </div>
            </div>
          </div>

          <div id="email" className={"input-group input-group-icon"}>
            <input
              type="email"
              placeholder="E-mail"
              value={this.state.email}
              onChange={event => {
                this.setState({ email: event.target.value });
                this.fieldValidOrShowError("email", event.target.value);
              }}
            />
            <div className="input-icon">
              <FontAwesomeIcon icon={faEnvelope} />
            </div>
          </div>
          <div id="password" className={"input-group input-group-icon"}>
            <input
              type="password"
              placeholder="Salasõna (min 6 sümbolit)"
              value={this.state.password}
              onChange={event => {
                this.setState({ password: event.target.value });
                this.fieldValidOrShowError("password", event.target.value);
              }}
            />
            <div className="input-icon">
              <FontAwesomeIcon icon={faKey} />
            </div>
          </div>
          <div id="register" className="input-group input-group-icon">
            <div id="errors" />
            <input
              type="button"
              value="Registreeri"
              onClick={this.validateAndSave}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default withRouter(Registration);
