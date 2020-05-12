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
var Dictionary_1 = require("./Dictionary");
var Header_1 = require("./Header");
var react_notifications_1 = require("react-notifications");
var react_router_dom_1 = require("react-router-dom");
var config = require('config');
var API_Path = config.API_Path;
var axios = require('axios');
var Verify = /** @class */ (function (_super) {
    __extends(Verify, _super);
    function Verify(props) {
        var _this = _super.call(this, props) || this;
        var dictionary = new Dictionary_1.KeyedCollection();
        _this.state = { isLoaded: false, item: null, error: null, imageDictionary: dictionary, token: props.match.params.id };
        _this.reloadPage = _this.reloadPage.bind(_this);
        return _this;
    }
    Verify.prototype.componentWillMount = function () {
        var _this = this;
        axios.get(API_Path + '/Auth/' + this.state.token)
            .then(function (response) {
            _this.setState({ isLoaded: true });
            react_notifications_1.NotificationManager.success(response.data.message);
        })
            .catch(function (error) {
            _this.setState({ isLoaded: true, error: error });
        })
            .then();
    };
    Verify.prototype.reloadPage = function () {
        //do nothing
    };
    Verify.prototype.render = function () {
        var _a = this.state, error = _a.error, isLoaded = _a.isLoaded, item = _a.item;
        if (error) {
            return (React.createElement("div", null,
                React.createElement(Header_1.Header, { reloadPage: this.reloadPage }),
                React.createElement("div", { className: "hero-wrap", style: { backgroundImage: "linear-gradient(rgba(255, 255, 255, .5), rgba(255, 255, 255, .8)), url('images/background_2.jpg')" } },
                    React.createElement("div", { className: "row no-gutters slider-text align-items-center justify-content-center" },
                        React.createElement("div", { className: "col-md-9 text-center" },
                            React.createElement("h1", { className: "mb-0 bread" }, "ARE YOU HAPPY NOW?"),
                            React.createElement("h5", null, "Just kidding! Our bad. 404 NOT FOUND"))))));
        }
        else if (!isLoaded) {
            return React.createElement("div", { className: "loading" }, "Loading\u2026");
        }
        else {
            return React.createElement(react_router_dom_1.Redirect, { to: '/#/' });
        }
    };
    return Verify;
}(React.Component));
exports.Verify = Verify;
//# sourceMappingURL=PageVerify.js.map