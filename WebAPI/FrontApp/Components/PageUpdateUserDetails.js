"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Header_1 = require("./Header");
var Dictionary_1 = require("./Dictionary");
var sfcookies_1 = require("sfcookies");
var react_notifications_1 = require("react-notifications");
require("react-notifications/lib/notifications.css");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var UpdateUserDetails = /** @class */ (function (_super) {
    __extends(UpdateUserDetails, _super);
    function UpdateUserDetails(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        _this.state = {
            firstName: '',
            lastName: '',
            state: '',
            city: '',
            streetAddress: '',
            zipCode: '',
            phone: '',
            waitingResponse: false,
            isChanged: false
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        return _this;
    }
    UpdateUserDetails.prototype.componentWillMount = function () {
        var _this = this;
        if (sfcookies_1.read_cookie('token') != null && sfcookies_1.read_cookie('token').length !== 0) {
            axios.get(API_Path + '/Users', {
                headers: {
                    token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
                }
            })
                .then(function (response) {
                var user_details = response.data.data[0];
                _this.setState({
                    isLoaded: true,
                    firstName: user_details.FirstName,
                    lastName: user_details.LastName,
                    state: user_details.State,
                    city: user_details.City,
                    streetAddress: user_details.StreetAddress,
                    zipCode: user_details.ZipCode,
                    phone: user_details.Phone
                });
            })
                .catch(function (error) {
                _this.setState({ isLoaded: true, error: error });
            })
                .then();
        }
    };
    UpdateUserDetails.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
        this.setState({ isChanged: true });
    };
    UpdateUserDetails.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }
        axios.put(API_Path + '/Users', {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            state: this.state.state,
            city: this.state.city,
            streetAddress: this.state.streetAddress,
            zipCode: this.state.zipCode,
            phone: this.state.phone
        }, {
            headers: {
                token: sfcookies_1.read_cookie('token') //the token is a variable which holds the token
            }
        })
            .then(function (response) {
            react_notifications_1.NotificationManager.success(response.data.message);
        })
            .catch(function (error) {
            react_notifications_1.NotificationManager.error("Request failed. Please, try again later.");
        })
            .then(function () {
            _this.setState({ waitingResponse: false });
        });
    };
    UpdateUserDetails.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, waitingResponse = _a.waitingResponse, isChanged = _a.isChanged;
        if (error) {
            console.log(error);
            return React.createElement("div", null,
                "Error: ",
                error.message);
        }
        else if (!isLoaded) {
            console.log(this.state);
            return (React.createElement("main", { id: "main" },
                waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
                React.createElement("div", null,
                    React.createElement(Header_1.Header, null),
                    React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                                React.createElement("div", { className: "col-md-9 text-center" },
                                    React.createElement("h1", { className: "mb-0 bread" }, "Update personal details"))))),
                    React.createElement("div", { className: "loading" }, "Loading\u2026"),
                    ";")));
        }
        else {
            return (React.createElement("main", { id: "main" },
                waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
                React.createElement("div", null,
                    React.createElement(Header_1.Header, null),
                    React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                                React.createElement("div", { className: "col-md-9 text-center" },
                                    React.createElement("h1", { className: "mb-0 bread" }, "Update personal details"))))),
                    React.createElement("section", { className: "ftco-section" },
                        React.createElement("div", { className: "container" },
                            React.createElement("div", { className: "row justify-content-center" },
                                React.createElement("div", { className: "col-xl-10" },
                                    React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                        React.createElement("h3", { className: "mb-4 billing-heading" }, "Personal Details"),
                                        React.createElement("div", { className: "row align-items-end" },
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "firstname" }, "First Name"),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.firstName, onChange: this.handleChange, name: "firstName", id: "firstName", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "lastname" }, "Last Name"),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.lastName, onChange: this.handleChange, name: "lastName", id: "lastName", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "country" }, "State / Country"),
                                                    React.createElement("div", { className: "select-wrap" },
                                                        React.createElement("div", { className: "icon" },
                                                            React.createElement("span", { className: "ion-ios-arrow-down" })),
                                                        React.createElement("select", { className: "form-control", value: this.state.state, onChange: this.handleChange, name: "state", id: "state", required: true },
                                                            React.createElement("option", { value: "" }, "Select"),
                                                            React.createElement("option", { value: "France" }, "France"),
                                                            React.createElement("option", { value: "Italy" }, "Italy"),
                                                            React.createElement("option", { value: "Philippines" }, "Philippines"),
                                                            React.createElement("option", { value: "South Korea" }, "South Korea"),
                                                            React.createElement("option", { value: "Hongkong" }, "Hongkong"),
                                                            React.createElement("option", { value: "Japan" }, "Japan"))))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "towncity" }, "Town / City"),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.city, onChange: this.handleChange, name: "city", id: "city", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-12" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "streetaddress" }, "Street Address"),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "Street Address", value: this.state.streetAddress, onChange: this.handleChange, name: "streetAddress", id: "streetAddress", maxLength: 50, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "postcodezip" }, "Postcode / ZIP *"),
                                                    React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.zipCode, onChange: this.handleChange, name: "zipCode", id: "zipCode", maxLength: 10, required: true }))),
                                            React.createElement("div", { className: "col-md-6" },
                                                React.createElement("div", { className: "form-group" },
                                                    React.createElement("label", { htmlFor: "phone" }, "Phone"),
                                                    React.createElement("input", { type: "tel", className: "form-control", placeholder: "", value: this.state.phone, onChange: this.handleChange, name: "phone", id: "phone", maxLength: 32, required: true }))),
                                            React.createElement("div", { className: "w-100" }),
                                            React.createElement("div", { className: "col-md-8" },
                                                React.createElement("div", { className: "form-group" }, isChanged ?
                                                    React.createElement("input", { type: "submit", value: "Update details", className: "btn btn-primary py-3 px-5" })
                                                    :
                                                        React.createElement("input", { type: "submit", value: "Update details", className: "btn btn-primary py-3 px-5", disabled: true }))))))))))));
        }
    };
    return UpdateUserDetails;
}(React.Component));
exports.UpdateUserDetails = UpdateUserDetails;
//# sourceMappingURL=PageUpdateUserDetails.js.map