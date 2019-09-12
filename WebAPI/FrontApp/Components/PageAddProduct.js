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
var Translate = require("react-translate-component");
var en_1 = require("./languages/en");
var it_1 = require("./languages/it");
var ro_1 = require("./languages/ro");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var counterpart = require('counterpart');
counterpart.registerTranslations('en', en_1.default);
counterpart.registerTranslations('ro', ro_1.default);
counterpart.registerTranslations('it', it_1.default);
var AddProduct = /** @class */ (function (_super) {
    __extends(AddProduct, _super);
    function AddProduct(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        dictionary.Add(props.Active, 'cta cta-colored');
        counterpart.setLocale(sfcookies_1.read_cookie('lang'));
        _this.state = { name: '', price: '', file1: null, file2: null, file3: null, description: '', gender: '', type: '', image: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false, language: sfcookies_1.read_cookie('lang') };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleFileChange1 = _this.handleFileChange1.bind(_this);
        _this.handleFileChange2 = _this.handleFileChange2.bind(_this);
        _this.handleFileChange3 = _this.handleFileChange3.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    AddProduct.prototype.handleChange = function (event) {
        var _a;
        this.setState((_a = {}, _a[event.target.name] = event.target.value, _a));
    };
    AddProduct.prototype.handleFileChange1 = function (event) {
        this.setState({ file1: event.target.files[0] });
    };
    AddProduct.prototype.handleFileChange2 = function (event) {
        this.setState({ file2: event.target.files[0] });
    };
    AddProduct.prototype.handleFileChange3 = function (event) {
        this.setState({ file3: event.target.files[0] });
    };
    AddProduct.prototype.handleSubmit = function (event) {
        var _this = this;
        event.preventDefault();
        if (this.state.waitingResponse == false) {
            this.setState({ waitingResponse: true });
        }
        var formData = new FormData();
        formData.append('Image1', this.state.file1);
        formData.append('Image2', this.state.file2);
        formData.append('Image3', this.state.file3);
        formData.append('data', JSON.stringify({ name: this.state.name, price: this.state.price, description: this.state.description, gender: this.state.gender, type: this.state.type }));
        var config = {
            headers: { token: sfcookies_1.read_cookie('token') }
        };
        axios.post(API_Path + '/Products', formData, config)
            .then(function (response) {
            _this.setState({ name: '', price: '', description: '', file: null, api_response: response.data, loggedIn: true });
            react_notifications_1.NotificationManager.success(response.data.message);
        })
            .catch(function (error) {
            _this.setState({ error: error });
            react_notifications_1.NotificationManager.error("Operation failed! Please, try again.");
        })
            .then(this.setState({ waitingResponse: false }));
    };
    AddProduct.prototype.reloadPage = function () {
        //do nothing
    };
    AddProduct.prototype.render = function () {
        var waitingResponse = this.state.waitingResponse;
        return (React.createElement("main", { id: "main" },
            waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap hero-bread", style: { backgroundImage: "url('images/background.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center mb-3 pb-3" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" },
                                React.createElement(Translate, { content: 'product.AddProduct' }))))),
                React.createElement("section", { className: "ftco-section" },
                    React.createElement("div", { className: "container" },
                        React.createElement("div", { className: "row justify-content-center" },
                            React.createElement("div", { className: "col-xl-10" },
                                React.createElement("form", { action: "", className: "billing-form", onSubmit: this.handleSubmit },
                                    React.createElement("h3", { className: "mb-4 billing-heading" },
                                        React.createElement(Translate, { content: 'product.ProductDetails' })),
                                    React.createElement("div", { className: "row align-items-end" },
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "name" },
                                                    React.createElement(Translate, { content: 'product.Name' })),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.name, onChange: this.handleChange, name: "name", id: "name", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "price" },
                                                    React.createElement(Translate, { content: 'product.Price' })),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.price, onChange: this.handleChange, name: "price", id: "price", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "description" },
                                                    React.createElement(Translate, { content: 'product.Description' })),
                                                React.createElement("textarea", { className: "form-control", value: this.state.description, onChange: this.handleChange, name: "description", id: "description", required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "file", onChange: this.handleFileChange1, accept: "image/*", required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "file", onChange: this.handleFileChange2, accept: "image/*", required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("input", { type: "file", onChange: this.handleFileChange3, accept: "image/*", required: true }))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "gender" },
                                                    React.createElement(Translate, { content: 'product.Gender' })),
                                                React.createElement("div", { className: "select-wrap" },
                                                    React.createElement("div", { className: "icon" },
                                                        React.createElement("span", { className: "ion-ios-arrow-down" })),
                                                    React.createElement("select", { className: "form-control", value: this.state.gender, onChange: this.handleChange, name: "gender", id: "state", required: true },
                                                        React.createElement("option", { value: "" }, "Select"),
                                                        React.createElement("option", { value: "Women" }, "Women"),
                                                        React.createElement("option", { value: "Men" }, "Men"))))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "type" },
                                                    React.createElement(Translate, { content: 'product.Type' })),
                                                React.createElement("div", { className: "select-wrap" },
                                                    React.createElement("div", { className: "icon" },
                                                        React.createElement("span", { className: "ion-ios-arrow-down" })),
                                                    React.createElement("select", { className: "form-control", value: this.state.type, onChange: this.handleChange, name: "type", id: "type", required: true },
                                                        React.createElement("option", { value: "" }, "Select"),
                                                        React.createElement("option", { value: "Belts" }, "Belt"),
                                                        React.createElement("option", { value: "Bags" }, "Bag"))))),
                                        React.createElement("div", { className: "w-100" }),
                                        React.createElement("div", { className: "col-md-8" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement(Translate, { component: "input", attributes: { value: 'product.AddProduct', }, type: "submit", className: "btn btn-primary py-3 px-5" }))))))))))));
    };
    return AddProduct;
}(React.Component));
exports.AddProduct = AddProduct;
//# sourceMappingURL=PageAddProduct.js.map