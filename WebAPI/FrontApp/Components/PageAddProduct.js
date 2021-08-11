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
        _this.state = {
            name_ro: '', name_it: '', name_en: '', price_RON: '', price_EUR: '', price_GBP: '', file1: null, file2: null, file3: null, description_ro: '', description_it: '', description_en: '', gender: '', type: '', image: '', styleCode: '', leatherType: '', colour: '', api_response: '', loggedIn: false, headerDictionary: dictionary, waitingResponse: false, language: sfcookies_1.read_cookie('lang')
        };
        _this.handleChange = _this.handleChange.bind(_this);
        _this.handleSubmit = _this.handleSubmit.bind(_this);
        _this.handleFileChange1 = _this.handleFileChange1.bind(_this);
        _this.handleFileChange2 = _this.handleFileChange2.bind(_this);
        _this.handleFileChange3 = _this.handleFileChange3.bind(_this);
        _this.escapeHTML = _this.escapeHTML.bind(_this);
        _this.reloadPage = _this.reloadPage.bind(_this);
        _this.changePrice = _this.changePrice.bind(_this);
        _this.cleanPage = _this.cleanPage.bind(_this);
        return _this;
    }
    AddProduct.prototype.changePrice = function (e) {
        if (e.target.validity.valid) {
            var newNum1 = +(e.target.value);
            this.setState({
                price_RON: newNum1,
                price_EUR: Math.round(newNum1 * 0.2),
                price_GBP: Math.round(newNum1 * 0.18)
            });
        }
    };
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
        formData.append('data', JSON.stringify({
            name_ro: this.state.name_ro,
            name_it: this.state.name_it,
            name_en: this.state.name_en,
            price_RON: this.state.price_RON,
            price_EUR: this.state.price_EUR,
            price_GBP: this.state.price_GBP,
            description_ro: this.escapeHTML(this.state.description_ro),
            description_it: this.escapeHTML(this.state.description_it),
            description_en: this.escapeHTML(this.state.description_en),
            gender: this.state.gender,
            type: this.state.type,
            styleCode: this.state.styleCode,
            leatherType: this.state.leatherType,
            colour: this.state.colour
        }));
        var config = {
            headers: { token: sfcookies_1.read_cookie('token') }
        };
        axios.post(API_Path + '/Products', formData, config)
            .then(function (response) {
            _this.setState({ api_response: response.data, loggedIn: true });
            react_notifications_1.NotificationManager.success(response.data.message);
        })
            .catch(function (error) {
            _this.setState({ error: error });
            react_notifications_1.NotificationManager.error("Operation failed! Please, try again.");
        })
            .then(this.setState({ waitingResponse: false }));
    };
    AddProduct.prototype.escapeHTML = function (unsafe) {
        return unsafe.replace(/[&<"']/g, function (m) {
            switch (m) {
                case '&':
                    return '&amp;';
                case '<':
                    return '&lt;';
                case '"':
                    return '&quot;';
                default:
                    return '&apos;';
            }
        });
    };
    ;
    AddProduct.prototype.reloadPage = function () {
        //do nothing
    };
    AddProduct.prototype.cleanPage = function () {
        this.setState({ name_ro: '', name_it: '', name_en: '', price_RON: '', price_EUR: '', price_GBP: '', description_ro: '', description_it: '', description_en: '', file1: null, file2: null, file3: null, gender: '', type: '', image: '', styleCode: '', leatherType: '', colour: '' });
    };
    AddProduct.prototype.render = function () {
        var waitingResponse = this.state.waitingResponse;
        return (React.createElement("main", { id: "main" },
            waitingResponse ? React.createElement("div", { className: "loading" }, "Loading\u2026") : React.createElement("div", null),
            React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap page-title", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    React.createElement("div", { className: "row justify-content-center" },
                        React.createElement("div", { className: "col-md-12 heading-section text-center" },
                            React.createElement("h1", { className: "mb-4" },
                                React.createElement(Translate, { content: 'product.AddProduct' })),
                            React.createElement("button", { type: "button", className: "btn btn-light", onClick: this.cleanPage }, " Clear fields ")))),
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
                                                React.createElement("label", { htmlFor: "name_ro" },
                                                    React.createElement(Translate, { content: 'product.Name' }),
                                                    " (RO)"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.name_ro, onChange: this.handleChange, name: "name_ro", id: "name_ro", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "name_it" },
                                                    React.createElement(Translate, { content: 'product.Name' }),
                                                    " (IT)"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.name_it, onChange: this.handleChange, name: "name_it", id: "name_it", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "name_en" },
                                                    React.createElement(Translate, { content: 'product.Name' }),
                                                    " (EN)"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.name_en, onChange: this.handleChange, name: "name_en", id: "name_en", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "styleCode" },
                                                    React.createElement(Translate, { content: 'product.StyleCode' })),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.styleCode, onChange: this.handleChange, name: "styleCode", id: "styleCode", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "leatherType" },
                                                    React.createElement(Translate, { content: 'product.Leather' })),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.leatherType, onChange: this.handleChange, name: "leatherType", id: "leatherType", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "colour" },
                                                    React.createElement(Translate, { content: 'product.Colour' })),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.colour, onChange: this.handleChange, name: "colour", id: "colour", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "price_RON" },
                                                    React.createElement(Translate, { content: 'product.Price' }),
                                                    " RON"),
                                                React.createElement("input", { type: "number", className: "form-control", placeholder: "", value: this.state.price_RON, onChange: this.changePrice, name: "price_RON", id: "price_RON", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "price_EUR" },
                                                    React.createElement(Translate, { content: 'product.Price' }),
                                                    " EUR"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.price_EUR, onChange: this.handleChange, name: "price_EUR", id: "price_EUR", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-6" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "price_GBP" },
                                                    React.createElement(Translate, { content: 'product.Price' }),
                                                    " GBP"),
                                                React.createElement("input", { type: "text", className: "form-control", placeholder: "", value: this.state.price_GBP, onChange: this.handleChange, name: "price_GBP", id: "price_GBP", maxLength: 32, required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "description_ro" },
                                                    React.createElement(Translate, { content: 'product.Description' }),
                                                    " (RO)"),
                                                React.createElement("textarea", { className: "form-control", value: this.state.description_ro, onChange: this.handleChange, name: "description_ro", id: "description_ro", rows: 10, style: { resize: 'vertical' }, required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "description_it" },
                                                    React.createElement(Translate, { content: 'product.Description' }),
                                                    " (IT)"),
                                                React.createElement("textarea", { className: "form-control", value: this.state.description_it, onChange: this.handleChange, name: "description_it", id: "description_it", rows: 10, style: { resize: 'vertical' }, required: true }))),
                                        React.createElement("div", { className: "col-md-12" },
                                            React.createElement("div", { className: "form-group" },
                                                React.createElement("label", { htmlFor: "description_en" },
                                                    React.createElement(Translate, { content: 'product.Description' }),
                                                    " (EN)"),
                                                React.createElement("textarea", { className: "form-control", value: this.state.description_en, onChange: this.handleChange, name: "description_en", id: "description_en", rows: 10, style: { resize: 'vertical' }, required: true }))),
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
                                                        React.createElement("option", { value: "Accessories" }, "Accessories"),
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