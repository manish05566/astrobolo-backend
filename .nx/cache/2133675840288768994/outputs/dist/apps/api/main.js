/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

module.exports = require("tslib");

/***/ }),
/* 2 */
/***/ ((module) => {

module.exports = require("@nestjs/core");

/***/ }),
/* 3 */
/***/ ((module) => {

module.exports = require("express");

/***/ }),
/* 4 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const serve_static_1 = __webpack_require__(7);
const modules_1 = __webpack_require__(8);
const config_1 = __webpack_require__(11);
const constants_1 = __webpack_require__(74);
const onboardings_module_1 = __webpack_require__(75);
const users_module_1 = __webpack_require__(79);
const vendors_module_1 = __webpack_require__(83);
const payments_module_1 = __webpack_require__(87);
const chats_module_1 = __webpack_require__(91);
const auth_module_1 = __webpack_require__(99);
const authVendor_module_1 = __webpack_require__(103);
const configuration_module_1 = __webpack_require__(107);
const countries_module_1 = __webpack_require__(112);
let ApiModule = class ApiModule {
};
exports.ApiModule = ApiModule;
exports.ApiModule = ApiModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            modules_1.ConfigModule,
            modules_1.LoggerModule,
            modules_1.JwtModule,
            modules_1.DatabaseModule,
            auth_module_1.AuthModule,
            authVendor_module_1.AuthVendorModule,
            users_module_1.UserModule,
            vendors_module_1.VendorModule,
            payments_module_1.PaymentModule,
            configuration_module_1.ConfigurationModule,
            chats_module_1.ChatModule,
            modules_1.CacheModule,
            onboardings_module_1.OnboardingModule,
            countries_module_1.CountriesModule,
            serve_static_1.ServeStaticModule.forRootAsync({
                useFactory: async (config) => {
                    return [
                        {
                            rootPath: config.get("uploadPath") || "",
                            serveRoot: "/static",
                        },
                    ];
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [
            {
                provide: constants_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    transform: true,
                    whitelist: true,
                    forbidNonWhitelisted: true,
                    transformOptions: {
                        enableImplicitConversion: false,
                    },
                }),
            },
        ],
    })
], ApiModule);


/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("@nestjs/common");

/***/ }),
/* 7 */
/***/ ((module) => {

module.exports = require("@nestjs/serve-static");

/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(9), exports);
tslib_1.__exportStar(__webpack_require__(10), exports);
tslib_1.__exportStar(__webpack_require__(13), exports);
tslib_1.__exportStar(__webpack_require__(37), exports);
tslib_1.__exportStar(__webpack_require__(40), exports);
tslib_1.__exportStar(__webpack_require__(42), exports);
tslib_1.__exportStar(__webpack_require__(43), exports);
tslib_1.__exportStar(__webpack_require__(62), exports);


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CacheModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
let CacheModule = class CacheModule {
};
exports.CacheModule = CacheModule;
exports.CacheModule = CacheModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [],
        providers: [],
        exports: [],
    })
], CacheModule);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(11);
const configuration_1 = __webpack_require__(12);
let ConfigModule = class ConfigModule {
};
exports.ConfigModule = ConfigModule;
exports.ConfigModule = ConfigModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [configuration_1.configuration],
            }),
        ],
        providers: [config_1.ConfigService],
        exports: [config_1.ConfigService],
    })
], ConfigModule);


/***/ }),
/* 11 */
/***/ ((module) => {

module.exports = require("@nestjs/config");

/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.configuration = void 0;
const configuration = () => ({
    environment: process.env["NODE_ENV"],
    apiHost: process.env["API_HOST"] || "127.0.0.1",
    apiPort: parseInt(process.env["API_PORT"] || "3000", 10),
    limit: parseInt(process.env["LIMIT"] || "15", 10),
    openAiKey: process.env["OPENAI_KEY"],
    dbHost: process.env["DB_HOST"] || "127.0.0.1",
    dbPort: parseInt(process.env["DB_PORT"] || "5432", 10),
    dbUser: process.env["DB_USER"] || "mysql",
    dbPassword: process.env["DB_PASSWORD"] || "",
    dbName: process.env["DB_NAME"] || "workforce",
    smtpHost: process.env["SMTP_HOST"] || "127.0.0.1",
    smtpPort: parseInt(process.env["SMTP_PORT"] || "587", 10),
    smtpUser: process.env["SMTP_USER"] || "",
    smtpPassword: process.env["SMTP_PASSWORD"] || "",
    smtpSecure: process.env["SMTP_SECURE"] === "true",
    mailTemplatePath: process.env["MAIL_TEMPLATE_PATH"] || "",
    jwtPrivateKey: process.env["JWT_PRIVATE_KEY"],
    jwtPublicKey: process.env["JWT_PUBLIC_KEY"],
    identifier: process.env["PURCHASE_IDENTIFIER"],
    jwtExpiry: process.env["JWT_EXPIRY"],
    jwtRefreshExpiry: process.env["JWT_REFRESH_EXPIRY"],
    jwtIssuer: process.env["JWT_ISSUER"],
    jwtAlgorithm: process.env["JWT_ALGORITHM"] || "RS256",
    storageType: process.env["STORAGE_TYPE"] || "DISK",
    uploadPath: process.env["UPLOAD_PATH"] || "",
    logType: process.env["LOG_TYPE"] || "console",
    logFileNameFormat: process.env["LOG_FILE_NAME_FORMAT"] || "YYYY-MM-DD",
    logPath: process.env["LOG_PATH"],
    logLevel: process.env["LOG_LEVEL"] || "DEBUG",
    googleClientId: process.env["GOOGLE_CLIENT_ID"] || "",
    googleClientSecret: process.env["GOOGLE_CLIENT_SECRET"] || "",
    googleRedirectUrl: process.env["GOOGLE_REDIRECT_URL"] || "",
    twitterAPIKey: process.env["TWITTER_API_KEY"] || "",
    twitterAPIKeySecret: process.env["TWITTER_API_KEY_SECRET"] || "",
    twitterRedirectUrl: process.env["TWITTER_REDIRECT_URL"] || "",
    msClientId: process.env["MS_CLIENT_ID"] || "",
    msObjectId: process.env["MS_OBJECT_ID"] || "",
    msTanentId: process.env["MS_TENANT_ID"] || "",
    msSecretValue: process.env["MS_SECRET_VALUE"] || "",
    msRedirectUrl: process.env["MS_REDIRECT_URL"] || "",
    appleClientId: process.env["APPLE_CLIENT_ID"] || "",
    appleTeamId: process.env["APPLE_TEAM_ID"] || "",
    appleKeyId: process.env["APPLE_KEY_ID"] || "",
    appleKeyPath: process.env["APPLE_KEY_PATH"] || "",
    appleRedirectUrl: process.env["APPLE_REDIRECT_URL"] || "",
    appleBundleId: process.env["APPLE_BUNDLE_ID"] || "",
    sendgridApiKey: process.env["SENDGRID_API_KEY"] || "",
    mailSource: process.env["MAIL_SOURCE"] || "",
    enableLogger: process.env["ENABLE_LOGGER"] || "",
});
exports.configuration = configuration;


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DatabaseModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(11);
const sequelize_1 = __webpack_require__(14);
const sequelize_typescript_1 = __webpack_require__(15);
const cls_hooked_1 = __webpack_require__(16);
const models_1 = __webpack_require__(17);
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [
            sequelize_1.SequelizeModule.forRootAsync({
                useFactory: (config) => {
                    // Setting up a Global Transaction namespace for Sequelize
                    sequelize_typescript_1.Sequelize.useCLS((0, cls_hooked_1.createNamespace)("pbBloxTransaction"));
                    return {
                        dialect: "mysql",
                        name: "astrobolo",
                        host: config.get("dbHost") || "localhost",
                        port: config.get("dbPort") || 3306,
                        username: config.get("dbUser") || "mysql",
                        password: config.get("dbPassword") || "",
                        database: config.get("dbName") || "astrobolo",
                        autoLoadModels: true,
                        models: models_1.models,
                        logging: console.log,
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        providers: [],
        exports: [],
    })
], DatabaseModule);


/***/ }),
/* 14 */
/***/ ((module) => {

module.exports = require("@nestjs/sequelize");

/***/ }),
/* 15 */
/***/ ((module) => {

module.exports = require("sequelize-typescript");

/***/ }),
/* 16 */
/***/ ((module) => {

module.exports = require("cls-hooked");

/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.models = void 0;
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(18), exports);
tslib_1.__exportStar(__webpack_require__(26), exports);
tslib_1.__exportStar(__webpack_require__(27), exports);
tslib_1.__exportStar(__webpack_require__(28), exports);
tslib_1.__exportStar(__webpack_require__(29), exports);
tslib_1.__exportStar(__webpack_require__(30), exports);
tslib_1.__exportStar(__webpack_require__(31), exports);
tslib_1.__exportStar(__webpack_require__(32), exports);
tslib_1.__exportStar(__webpack_require__(33), exports);
tslib_1.__exportStar(__webpack_require__(34), exports);
tslib_1.__exportStar(__webpack_require__(35), exports);
tslib_1.__exportStar(__webpack_require__(36), exports);
const otp_model_1 = __webpack_require__(18);
const user_model_1 = __webpack_require__(26);
const onboardings_model_1 = __webpack_require__(27);
const age_model_1 = __webpack_require__(28);
const systemconfig_model_1 = __webpack_require__(29);
const vendor_model_1 = __webpack_require__(33);
const recharge_payment_model_1 = __webpack_require__(34);
const chat_transactions_model_1 = __webpack_require__(36);
const chat_model_1 = __webpack_require__(35);
const country_model_1 = __webpack_require__(30);
const state_model_1 = __webpack_require__(31);
const city_model_1 = __webpack_require__(32);
exports.models = [
    user_model_1.User,
    otp_model_1.Otp,
    onboardings_model_1.Onboardings,
    age_model_1.AgeGroup,
    systemconfig_model_1.SystemConfig,
    country_model_1.Country,
    state_model_1.State,
    city_model_1.City,
    vendor_model_1.Vendor,
    recharge_payment_model_1.RechargePayment,
    chat_transactions_model_1.ChatTransaction,
    chat_model_1.Chat
];


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Otp = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
const constant_1 = __webpack_require__(20);
let Otp = class Otp extends base_model_1.BaseModel {
};
exports.Otp = Otp;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Otp.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.ENUM({
            values: Object.keys(constant_1.OtpTypeEnum),
        }),
    }),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "type", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "ip", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.INTEGER),
    tslib_1.__metadata("design:type", Number)
], Otp.prototype, "attempts", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "ua", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.STRING),
    tslib_1.__metadata("design:type", String)
], Otp.prototype, "device", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.DATE),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], Otp.prototype, "ttl", void 0);
exports.Otp = Otp = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "otps" })
], Otp);


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BaseModel = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
class BaseModel extends sequelize_typescript_1.Model {
}
exports.BaseModel = BaseModel;
tslib_1.__decorate([
    sequelize_typescript_1.PrimaryKey,
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], BaseModel.prototype, "id", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.CreatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'createdAt' }),
    tslib_1.__metadata("design:type", typeof (_a = typeof Date !== "undefined" && Date) === "function" ? _a : Object)
], BaseModel.prototype, "createdAt", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.UpdatedAt,
    (0, sequelize_typescript_1.Column)({ field: 'updatedAt' }),
    tslib_1.__metadata("design:type", typeof (_b = typeof Date !== "undefined" && Date) === "function" ? _b : Object)
], BaseModel.prototype, "updatedAt", void 0);


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(21), exports);
tslib_1.__exportStar(__webpack_require__(22), exports);
tslib_1.__exportStar(__webpack_require__(23), exports);
tslib_1.__exportStar(__webpack_require__(24), exports);
tslib_1.__exportStar(__webpack_require__(25), exports);


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserTypeEnum = void 0;
var UserTypeEnum;
(function (UserTypeEnum) {
    UserTypeEnum["CREATOR"] = "CREATOR";
    UserTypeEnum["SPECTATOR"] = "SPECTATOR";
    UserTypeEnum["ADMIN"] = "ADMIN";
})(UserTypeEnum || (exports.UserTypeEnum = UserTypeEnum = {}));


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenderEnum = void 0;
var GenderEnum;
(function (GenderEnum) {
    GenderEnum["MALE"] = "MALE";
    GenderEnum["FEMALE"] = "FEMALE";
    GenderEnum["OTHER"] = "OTHER";
})(GenderEnum || (exports.GenderEnum = GenderEnum = {}));


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OtpTypeEnum = void 0;
var OtpTypeEnum;
(function (OtpTypeEnum) {
    OtpTypeEnum["REGISTRATION"] = "REGISTRATION";
    OtpTypeEnum["LOGIN"] = "LOGIN";
    OtpTypeEnum["RESET"] = "RESET";
})(OtpTypeEnum || (exports.OtpTypeEnum = OtpTypeEnum = {}));


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeConcentAcceptanceEnum = void 0;
var AgeConcentAcceptanceEnum;
(function (AgeConcentAcceptanceEnum) {
    AgeConcentAcceptanceEnum["ACCEPTED"] = "ACCEPTED";
    AgeConcentAcceptanceEnum["REJECTED"] = "REJECTED";
})(AgeConcentAcceptanceEnum || (exports.AgeConcentAcceptanceEnum = AgeConcentAcceptanceEnum = {}));


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginSourceEnum = void 0;
var LoginSourceEnum;
(function (LoginSourceEnum) {
    LoginSourceEnum["ANONYMNOUS"] = "ANONYMNOUS";
    LoginSourceEnum["PASSWORD"] = "PASSWORD";
    LoginSourceEnum["OTP"] = "OTP";
    LoginSourceEnum["GOOGLE"] = "GOOGLE";
    LoginSourceEnum["TWITTER"] = "TWITTER";
    LoginSourceEnum["TWITCH"] = "TWITCH";
    LoginSourceEnum["MICROSOFT"] = "MICROSOFT";
    LoginSourceEnum["APPLE"] = "APPLE";
})(LoginSourceEnum || (exports.LoginSourceEnum = LoginSourceEnum = {}));


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.User = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let User = class User extends base_model_1.BaseModel {
};
exports.User = User;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "email", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(12),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "birth_date", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "birth_time", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(7),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "birth_place", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "country", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "state", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "city", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(7),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "pincode", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "marital_status", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "religion", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "language", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "image", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "topic_of_concern", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
    }),
    tslib_1.__metadata("design:type", String)
], User.prototype, "occupation", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], User.prototype, "is_login", void 0);
exports.User = User = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "users" })
], User);


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Onboardings = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let Onboardings = class Onboardings extends base_model_1.BaseModel {
};
exports.Onboardings = Onboardings;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(250),
    }),
    tslib_1.__metadata("design:type", String)
], Onboardings.prototype, "image", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], Onboardings.prototype, "title", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    tslib_1.__metadata("design:type", String)
], Onboardings.prototype, "description", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Onboardings.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
    }),
    tslib_1.__metadata("design:type", Number)
], Onboardings.prototype, "position", void 0);
exports.Onboardings = Onboardings = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "onboardings" })
], Onboardings);


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AgeGroup = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let AgeGroup = class AgeGroup extends base_model_1.BaseModel {
};
exports.AgeGroup = AgeGroup;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], AgeGroup.prototype, "age", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], AgeGroup.prototype, "is_active", void 0);
exports.AgeGroup = AgeGroup = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "age_groups" })
], AgeGroup);


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SystemConfig = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let SystemConfig = class SystemConfig extends base_model_1.BaseModel {
};
exports.SystemConfig = SystemConfig;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], SystemConfig.prototype, "feature", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], SystemConfig.prototype, "sub_feature", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)(sequelize_typescript_1.DataType.JSON) // ✅ use JSON for MySQL
    ,
    tslib_1.__metadata("design:type", typeof (_a = typeof Record !== "undefined" && Record) === "function" ? _a : Object)
], SystemConfig.prototype, "value", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: 0, // ✅ 0 instead of false
    }),
    tslib_1.__metadata("design:type", Boolean)
], SystemConfig.prototype, "is_active", void 0);
exports.SystemConfig = SystemConfig = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "systemconfig" })
], SystemConfig);


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Country = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
let Country = class Country extends sequelize_typescript_1.Model {
};
exports.Country = Country;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING }),
    tslib_1.__metadata("design:type", String)
], Country.prototype, "name", void 0);
exports.Country = Country = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "countries", timestamps: false })
], Country);


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.State = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
let State = class State extends sequelize_typescript_1.Model {
};
exports.State = State;
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], State.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], State.prototype, "country_id", void 0);
exports.State = State = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "states",
        timestamps: false, // ⛔ disables createdAt/updatedAt expectation
    })
], State);


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.City = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
let City = class City extends sequelize_typescript_1.Model {
};
exports.City = City;
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", String)
], City.prototype, "name", void 0);
tslib_1.__decorate([
    sequelize_typescript_1.Column,
    tslib_1.__metadata("design:type", Number)
], City.prototype, "state_id", void 0);
exports.City = City = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "cities", timestamps: false })
], City);


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Vendor = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let Vendor = class Vendor extends base_model_1.BaseModel {
};
exports.Vendor = Vendor;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(40),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "email", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(12),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "birth_date", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(7),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "country", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "state", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(30),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "city", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "pincode", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(10),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "marital_status", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(15),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "religion", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "language", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "image", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "specialist", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "address", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "experience", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "call_charge", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "chat_charge", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "admin_call_charge", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.SMALLINT(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "admin_chat_charge", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "chat_min", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER(),
    }),
    tslib_1.__metadata("design:type", Number)
], Vendor.prototype, "call_min", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "document1", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.TEXT(),
    }),
    tslib_1.__metadata("design:type", String)
], Vendor.prototype, "document2", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Vendor.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.BOOLEAN,
        defaultValue: false,
    }),
    tslib_1.__metadata("design:type", Boolean)
], Vendor.prototype, "is_login", void 0);
exports.Vendor = Vendor = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "vendors" })
], Vendor);


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RechargePayment = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
let RechargePayment = class RechargePayment extends base_model_1.BaseModel {
};
exports.RechargePayment = RechargePayment;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], RechargePayment.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.UUID,
        defaultValue: sequelize_typescript_1.DataType.UUIDV4,
    }),
    tslib_1.__metadata("design:type", String)
], RechargePayment.prototype, "astrologer_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.DECIMAL(10, 2),
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", Number)
], RechargePayment.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(50),
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], RechargePayment.prototype, "method", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(100),
        allowNull: false,
    }),
    tslib_1.__metadata("design:type", String)
], RechargePayment.prototype, "transaction_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        defaultValue: "pending",
    }),
    tslib_1.__metadata("design:type", String)
], RechargePayment.prototype, "status", void 0);
exports.RechargePayment = RechargePayment = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "recharge_payments" })
], RechargePayment);


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Chat = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
const vendor_model_1 = __webpack_require__(33);
const chat_transactions_model_1 = __webpack_require__(36); // ✅ Import
let Chat = class Chat extends base_model_1.BaseModel {
};
exports.Chat = Chat;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "sender_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => vendor_model_1.Vendor),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "receiver_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => vendor_model_1.Vendor, { as: "astrologer", foreignKey: "receiver_id" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof vendor_model_1.Vendor !== "undefined" && vendor_model_1.Vendor) === "function" ? _a : Object)
], Chat.prototype, "astrologer", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.TEXT, allowNull: false }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "message", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.STRING, allowNull: true }),
    tslib_1.__metadata("design:type", String)
], Chat.prototype, "message_type", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.BOOLEAN, defaultValue: false }),
    tslib_1.__metadata("design:type", Boolean)
], Chat.prototype, "is_read", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.HasOne)(() => chat_transactions_model_1.ChatTransaction, { foreignKey: "chat_id" }),
    tslib_1.__metadata("design:type", typeof (_b = typeof chat_transactions_model_1.ChatTransaction !== "undefined" && chat_transactions_model_1.ChatTransaction) === "function" ? _b : Object)
], Chat.prototype, "chat_transaction", void 0);
exports.Chat = Chat = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "chats" })
], Chat);


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatTransaction = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_typescript_1 = __webpack_require__(15);
const base_model_1 = __webpack_require__(19);
const vendor_model_1 = __webpack_require__(33);
const chat_model_1 = __webpack_require__(35); // ✅ Import Chat model
let ChatTransaction = class ChatTransaction extends base_model_1.BaseModel {
};
exports.ChatTransaction = ChatTransaction;
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    tslib_1.__metadata("design:type", String)
], ChatTransaction.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => vendor_model_1.Vendor),
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: false }),
    tslib_1.__metadata("design:type", String)
], ChatTransaction.prototype, "astrologer_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => chat_model_1.Chat) // ✅ Link to Chat model
    ,
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.UUID, allowNull: true }),
    tslib_1.__metadata("design:type", String)
], ChatTransaction.prototype, "chat_id", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    tslib_1.__metadata("design:type", Number)
], ChatTransaction.prototype, "total_charge", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({ type: sequelize_typescript_1.DataType.DECIMAL(10, 2), allowNull: false }),
    tslib_1.__metadata("design:type", Number)
], ChatTransaction.prototype, "duration_minutes", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING(20),
        allowNull: false,
        defaultValue: "completed",
    }),
    tslib_1.__metadata("design:type", String)
], ChatTransaction.prototype, "status", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => vendor_model_1.Vendor, { as: "astrologer", foreignKey: "astrologer_id" }),
    tslib_1.__metadata("design:type", typeof (_a = typeof vendor_model_1.Vendor !== "undefined" && vendor_model_1.Vendor) === "function" ? _a : Object)
], ChatTransaction.prototype, "astrologer", void 0);
tslib_1.__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => chat_model_1.Chat, { as: "chat", foreignKey: "chat_id" }) // ✅ Add this
    ,
    tslib_1.__metadata("design:type", typeof (_b = typeof chat_model_1.Chat !== "undefined" && chat_model_1.Chat) === "function" ? _b : Object)
], ChatTransaction.prototype, "chat", void 0);
exports.ChatTransaction = ChatTransaction = tslib_1.__decorate([
    (0, sequelize_typescript_1.Table)({ tableName: "chat_transactions" })
], ChatTransaction);


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(11);
const jwt_1 = __webpack_require__(38);
const fs_1 = __webpack_require__(39);
let JwtModule = class JwtModule {
};
exports.JwtModule = JwtModule;
exports.JwtModule = JwtModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        imports: [
            jwt_1.JwtModule.registerAsync({
                useFactory: async (config) => {
                    return {
                        secretOrKeyProvider(type) {
                            switch (type) {
                                case jwt_1.JwtSecretRequestType.SIGN:
                                    return (0, fs_1.readFileSync)(config.get('jwtPrivateKey') || '', 'utf8');
                                case jwt_1.JwtSecretRequestType.VERIFY:
                                    return (0, fs_1.readFileSync)(config.get('jwtPublicKey') || '', 'utf8');
                            }
                        },
                        signOptions: {
                            expiresIn: config.get('jwtExpiry'),
                            issuer: config.get('jwtIssuer'),
                            algorithm: config.get('jwtAlgorithm'),
                        },
                    };
                },
                inject: [config_1.ConfigService],
            }),
        ],
        exports: [jwt_1.JwtModule],
    })
], JwtModule);


/***/ }),
/* 38 */
/***/ ((module) => {

module.exports = require("@nestjs/jwt");

/***/ }),
/* 39 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JwtAuthGuard = void 0;
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(38);
const passport_jwt_1 = __webpack_require__(41);
let JwtAuthGuard = class JwtAuthGuard {
    constructor(reflector, jwt) {
        this.reflector = reflector;
        this.jwt = jwt;
    }
    canActivate(context) {
        const ctx = context.switchToHttp();
        const req = ctx.getRequest();
        const token = passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken()(req);
        //console.log('token in auth', token)
        if (!token) {
            throw new common_1.HttpException("Your session is expired. Please log in again to continue.", 401);
        }
        try {
            const payload = this.jwt.verify(token);
            // Check for user or vendor
            if (payload.user) {
                req["user"] = payload.user;
                req.headers["x-user-id"] = payload.user.id;
            }
            else if (payload.vendor) {
                req.vendor = payload.vendor;
                req.headers['x-vendor-id'] = payload.vendor.id;
            }
            else {
                throw new common_1.HttpException("Invalid token. Please log in again.", 401);
            }
            return true;
        }
        catch (error) {
            throw new common_1.HttpException("Your session is expired. Please log in again to continue.", 401);
        }
    }
};
exports.JwtAuthGuard = JwtAuthGuard;
exports.JwtAuthGuard = JwtAuthGuard = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof core_1.Reflector !== "undefined" && core_1.Reflector) === "function" ? _a : Object, typeof (_b = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _b : Object])
], JwtAuthGuard);


/***/ }),
/* 41 */
/***/ ((module) => {

module.exports = require("passport-jwt");

/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const logger_service_1 = __webpack_require__(43);
let LoggerModule = class LoggerModule {
};
exports.LoggerModule = LoggerModule;
exports.LoggerModule = LoggerModule = tslib_1.__decorate([
    (0, common_1.Global)(),
    (0, common_1.Module)({
        providers: [logger_service_1.LoggerService],
        exports: [logger_service_1.LoggerService],
    })
], LoggerModule);


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoggerService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const fs_1 = __webpack_require__(39);
const config_1 = __webpack_require__(11);
const path_1 = __webpack_require__(4);
const types_1 = __webpack_require__(44);
const moment = __webpack_require__(61);
const allowedLogLevels = {
    DEBUG: [types_1.LogLevel.DEBUG, types_1.LogLevel.INFO, types_1.LogLevel.WARNING, types_1.LogLevel.ERROR],
    INFO: [types_1.LogLevel.INFO, types_1.LogLevel.WARNING, types_1.LogLevel.ERROR],
    WARNING: [types_1.LogLevel.WARNING, types_1.LogLevel.ERROR],
    ERROR: [types_1.LogLevel.ERROR],
    VERBOSE: [types_1.LogLevel.DEBUG, types_1.LogLevel.INFO, types_1.LogLevel.WARNING, types_1.LogLevel.ERROR],
};
let LoggerService = class LoggerService {
    constructor(config) {
        this.config = config;
        this.level = config.get('logLevel') || types_1.LogLevel.DEBUG;
        this.type = config.get('logType') || 'console';
    }
    _log(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    level, message, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    stack, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestPayload) {
        if (allowedLogLevels[this.level].includes(level)) {
            // if (this.config.get('environment') === 'production') {
            if (this.config.get('environment') === 'development') {
                return this._logFormatted(level, message, stack, requestPayload);
            }
            else {
                console[level === types_1.LogLevel.ERROR ? 'error' : 'log'](message, stack);
            }
        }
    }
    _logFormatted(severity, message, stack, 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    requestPayload) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const globalFields = {};
        if (requestPayload) {
            const project = this.config.get('googleProjectId');
            const { trace, body, ...req } = requestPayload;
            globalFields['httpRequest'] = req;
            globalFields['jsonPayload'] = body;
            if (trace) {
                if (trace && project) {
                    const [traceId] = trace.split('/');
                    globalFields['logging.googleapis.com/trace'] = `projects/${project}/traces/${traceId}`;
                }
            }
        }
        const entry = Object.assign({
            severity,
            message,
            textPayload: stack,
        }, globalFields);
        if (this.type === 'file') {
            this._write(entry);
        }
        else {
            // console[severity === LogLevel.ERROR ? 'error' : 'log'](
            //   JSON.stringify(entry)
            // );
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _write(data) {
        const match = data.textPayload.match(/at (\w+)\.(\w+) \(/);
        const serviceName = match ? match[1] : 'Unknown Service';
        const fileName = serviceName + '-' + moment().format('YYYY-MM-DD-HH-mm-ss') + '.log', filePath = (0, path_1.join)(this.config.get('logPath') || '', fileName), message = this._format(this.level, data.message, data.textPayload) + '\r\n';
        (0, fs_1.open)(filePath, 'a+', () => {
            // eslint-disable-next-line @typescript-eslint/no-empty-function
            (0, fs_1.appendFile)(filePath, message, () => { });
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    _format(level, message, stack = null) {
        if (stack) {
            message = message + '\r\n' + stack;
        }
        if (!message) {
            return '';
        }
        if (typeof message !== 'string' && typeof message.message !== 'undefined') {
            message = message.message;
        }
        return `[${moment().format('YYYY-MM-DD-HH-mm-ss')}] ${level}: ${message}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    log(message, stack = null) {
        this._log(types_1.LogLevel.INFO, message, stack);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error(message, stack, requestPayload) {
        this._log(types_1.LogLevel.ERROR, message, stack, requestPayload);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    warn(message, stack = null) {
        this._log(types_1.LogLevel.WARNING, message, stack);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    debug(message, stack = null) {
        this._log(types_1.LogLevel.DEBUG, message, stack);
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    verbose(message, stack = null) {
        this._log(types_1.LogLevel.VERBOSE, message, stack);
    }
};
exports.LoggerService = LoggerService;
exports.LoggerService = LoggerService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], LoggerService);


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(45), exports);
tslib_1.__exportStar(__webpack_require__(46), exports);
tslib_1.__exportStar(__webpack_require__(47), exports);
tslib_1.__exportStar(__webpack_require__(48), exports);
tslib_1.__exportStar(__webpack_require__(49), exports);
tslib_1.__exportStar(__webpack_require__(50), exports);
tslib_1.__exportStar(__webpack_require__(51), exports);
tslib_1.__exportStar(__webpack_require__(52), exports);
tslib_1.__exportStar(__webpack_require__(53), exports);
tslib_1.__exportStar(__webpack_require__(54), exports);
tslib_1.__exportStar(__webpack_require__(55), exports);
tslib_1.__exportStar(__webpack_require__(56), exports);
tslib_1.__exportStar(__webpack_require__(57), exports);
tslib_1.__exportStar(__webpack_require__(58), exports);
tslib_1.__exportStar(__webpack_require__(59), exports);
tslib_1.__exportStar(__webpack_require__(60), exports);


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ModelAction = void 0;
var ModelAction;
(function (ModelAction) {
    ModelAction["ALL"] = "ALL";
    ModelAction["CREATE"] = "CREATE";
    ModelAction["EDIT"] = "EDIT";
    ModelAction["DELETE"] = "DELETE";
    ModelAction["DESTROY"] = "DESTROY";
    ModelAction["PUSH"] = "PUSH";
    ModelAction["CLOSE"] = "CLOSE";
})(ModelAction || (exports.ModelAction = ModelAction = {}));


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARNING"] = "WARNING";
    LogLevel["ERROR"] = "ERROR";
    LogLevel["VERBOSE"] = "VERBOSE";
})(LogLevel || (exports.LogLevel = LogLevel = {}));


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ClientType = void 0;
var ClientType;
(function (ClientType) {
    ClientType["BUSINESS"] = "BUSINESS";
    ClientType["INDIVIDUAL"] = "INDIVIDUAL";
})(ClientType || (exports.ClientType = ClientType = {}));


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AddressType = void 0;
var AddressType;
(function (AddressType) {
    AddressType["BILLING"] = "BILLING";
    AddressType["SHIPPING"] = "SHIPPING";
})(AddressType || (exports.AddressType = AddressType = {}));


/***/ }),
/* 51 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CustomFieldType = void 0;
var CustomFieldType;
(function (CustomFieldType) {
    CustomFieldType["TEXTBOX"] = "TEXTBOX";
    CustomFieldType["TEXTAREA"] = "TEXTAREA";
    CustomFieldType["EMAIL"] = "EMAIL";
    CustomFieldType["URL"] = "URL";
    CustomFieldType["PHONE"] = "PHONE";
    CustomFieldType["NUMBER"] = "NUMBER";
    CustomFieldType["AMOUNT"] = "AMOUNT";
    CustomFieldType["PERCENT"] = "PERCENT";
    CustomFieldType["DATE"] = "DATE";
    CustomFieldType["DATETIME"] = "DATETIME";
    CustomFieldType["CHECKBOX"] = "CHECKBOX";
    CustomFieldType["DROPDOWN"] = "DROPDOWN";
    CustomFieldType["MULTISELECT"] = "MULTISELECT";
    CustomFieldType["LOOKUP"] = "LOOKUP";
    CustomFieldType["ATTACHMENT"] = "ATTACHMENT";
})(CustomFieldType || (exports.CustomFieldType = CustomFieldType = {}));


/***/ }),
/* 52 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 53 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VerificationCodeType = void 0;
var VerificationCodeType;
(function (VerificationCodeType) {
    VerificationCodeType["EMAIL"] = "EMAIL";
    VerificationCodeType["PHONE"] = "PHONE";
    VerificationCodeType["PASSWORD"] = "PASSWORD";
    VerificationCodeType["OTHER"] = "OTHER";
})(VerificationCodeType || (exports.VerificationCodeType = VerificationCodeType = {}));


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ActivityType = void 0;
var ActivityType;
(function (ActivityType) {
    ActivityType["USER"] = "USER";
    ActivityType["CATEGORY"] = "CATEGORY";
    ActivityType["MEDIA"] = "MEDIA";
    ActivityType["NEWSLETTER"] = "NEWSLETTER";
    ActivityType["ROLE"] = "ROLE";
    ActivityType["STORY"] = "STORY";
    ActivityType["PUBLICATION"] = "PUBLICATION";
    ActivityType["AUTH"] = "AUTH";
    ActivityType["TEAM"] = "TEAM";
})(ActivityType || (exports.ActivityType = ActivityType = {}));


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TableActionType = exports.TableColumnType = void 0;
var TableColumnType;
(function (TableColumnType) {
    TableColumnType["DATE"] = "DATE";
    TableColumnType["DATE_FROM_NOW"] = "DATE_FROM_NOW";
    TableColumnType["AVATAR"] = "AVATAR";
    TableColumnType["AVATAR_LIST"] = "AVATAR_LIST";
    TableColumnType["MEDIA"] = "MEDIA";
    TableColumnType["STATUS"] = "STATUS";
})(TableColumnType || (exports.TableColumnType = TableColumnType = {}));
var TableActionType;
(function (TableActionType) {
    TableActionType["DETAILS"] = "DETAILS";
    TableActionType["EDIT"] = "EDIT";
    TableActionType["DELETE"] = "DELETE";
    TableActionType["ACTIVATE"] = "ACTIVATE";
    TableActionType["SUSPEND"] = "SUSPEND";
})(TableActionType || (exports.TableActionType = TableActionType = {}));


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserPublicationRole = void 0;
var UserPublicationRole;
(function (UserPublicationRole) {
    UserPublicationRole["OWNER"] = "OWNER";
    UserPublicationRole["EDITOR"] = "EDITOR";
    UserPublicationRole["WRITER"] = "WRITER";
})(UserPublicationRole || (exports.UserPublicationRole = UserPublicationRole = {}));


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));


/***/ }),
/* 61 */
/***/ ((module) => {

module.exports = require("moment");

/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var UploadModule_1;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const config_1 = __webpack_require__(11);
const platform_express_1 = __webpack_require__(63);
// import { Request } from 'express';
const multer_1 = __webpack_require__(64);
const path_1 = __webpack_require__(4);
const utils_1 = __webpack_require__(65);
const fs_1 = __webpack_require__(39);
let UploadModule = UploadModule_1 = class UploadModule {
    static registerForBuffer() {
        return {
            module: UploadModule_1,
            imports: [platform_express_1.MulterModule.register()],
            exports: [platform_express_1.MulterModule],
        };
    }
    static register(option) {
        return {
            module: UploadModule_1,
            imports: [
                platform_express_1.MulterModule.registerAsync({
                    useFactory: (config) => {
                        const factory = {
                            fileFilter: (req, file, callback) => {
                                const ext = (0, path_1.extname)(file.originalname);
                                console.log('ext', ext, 'file.originalname', file.originalname);
                                if (!file.originalname.match(option.regex || '')) {
                                    return callback(new Error(`File with extension .${ext} is not allowed.`), false);
                                }
                                callback(null, true);
                            },
                        };
                        const type = config.get('storageType') || 'DISK';
                        if (type === 'GOOGLE') {
                            // factory.storage = new GoogleStorage({
                            //   projectId: config.get('googleProjectId'),
                            //   keyFilename: config.get('googleKeyPath'),
                            //   bucket: config.get('googleBucket'),
                            //   contentType: (req, file) => {
                            //     return file.mimetype;
                            //   },
                            //   filename: (
                            //     req: Request,
                            //     file: Express.Multer.File,
                            //     callback: (error: Error | null, filename: string) => void
                            //   ) => {
                            //     const name: string = uuid(),
                            //       ext: string = extname(file.originalname);
                            //     callback(null, `${req['publicationId']}/${name}${ext}`);
                            //   },
                            // });
                        }
                        else {
                            factory.dest = config.get('uploadPath');
                            factory.storage = (0, multer_1.diskStorage)({
                                destination: config.get('uploadPath'),
                                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                filename: (req, file, callback) => {
                                    const name = (0, utils_1.uuid)(), ext = (0, path_1.extname)(file.originalname);
                                    const dir = `${config.get('uploadPath')}/${req['publicationId']}`;
                                    if (!(0, fs_1.existsSync)(dir)) {
                                        (0, fs_1.mkdirSync)(dir);
                                    }
                                    callback(null, `${req['publicationId']}/${name}${ext}`);
                                },
                            });
                        }
                        return factory;
                    },
                    inject: [config_1.ConfigService],
                }),
            ],
            exports: [platform_express_1.MulterModule],
        };
    }
};
exports.UploadModule = UploadModule;
exports.UploadModule = UploadModule = UploadModule_1 = tslib_1.__decorate([
    (0, common_1.Module)({})
], UploadModule);


/***/ }),
/* 63 */
/***/ ((module) => {

module.exports = require("@nestjs/platform-express");

/***/ }),
/* 64 */
/***/ ((module) => {

module.exports = require("multer");

/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
tslib_1.__exportStar(__webpack_require__(66), exports);
tslib_1.__exportStar(__webpack_require__(67), exports);
tslib_1.__exportStar(__webpack_require__(71), exports);
tslib_1.__exportStar(__webpack_require__(72), exports);


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Transaction = void 0;
const common_1 = __webpack_require__(6);
const sequelize_typescript_1 = __webpack_require__(15);
const Transaction = () => {
    const Injection = (0, common_1.Inject)(sequelize_typescript_1.Sequelize);
    return function (tagret, propertyKey, descriptor) {
        Injection(tagret, 'connection');
        const originalMethod = descriptor.value;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        descriptor.value = function (...args) {
            return this.connection.transaction(() => {
                return originalMethod.apply(this, args);
            });
        };
    };
};
exports.Transaction = Transaction;


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.generateOTP = exports.hmacSha256 = exports.getLimit = exports.getPage = exports.nameFromSlug = exports.uuid = exports.checkHash = exports.toHash = exports.generateRandomString = exports.generateSalt = void 0;
const bcrypt_1 = __webpack_require__(68);
const uuid_1 = __webpack_require__(69);
const crypto_1 = __webpack_require__(70);
/**
 * generateSalt
 *
 * @param factor number
 */
const generateSalt = (factor) => {
    return (0, bcrypt_1.genSalt)(factor);
};
exports.generateSalt = generateSalt;
/**
 * generateRandomString
 *
 * @param size number
 * @returns string
 */
const generateRandomString = (size) => {
    return (0, crypto_1.randomBytes)(size).toString("hex");
};
exports.generateRandomString = generateRandomString;
/**
 * toHash
 *
 * @param {*} pass
 *
 * password hashing
 */
const toHash = async (pass) => {
    return (0, bcrypt_1.hash)(pass, 10);
};
exports.toHash = toHash;
/**
 * checkHash
 *
 * @param {*} plain
 * @param {*} encrypted
 *
 * compare password hash with plain text
 */
const checkHash = (plain, encrypted) => {
    return (0, bcrypt_1.compare)(plain, encrypted);
};
exports.checkHash = checkHash;
const uuid = () => {
    return (0, uuid_1.v4)();
};
exports.uuid = uuid;
const nameFromSlug = (slug) => {
    return slug.indexOf("-") !== -1
        ? slug
            .split("-")
            .map((s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`)
            .join(" ")
        : `${slug.charAt(0).toUpperCase()}${slug.slice(1)}`;
};
exports.nameFromSlug = nameFromSlug;
const getPage = (pageQuery) => {
    const pageNum = pageQuery ? parseInt(pageQuery) : 1;
    return pageNum ? pageNum : 1;
};
exports.getPage = getPage;
const getLimit = (limit, pageSize) => {
    if (!pageSize) {
        return limit;
    }
    return parseInt(pageSize);
};
exports.getLimit = getLimit;
const hmacSha256 = (key, str, type = "binary") => {
    return (0, crypto_1.createHmac)("sha256", key).update(str).digest(type);
};
exports.hmacSha256 = hmacSha256;
const generateOTP = (length = 6) => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);
    return Math.floor(Math.random() * (max - min) + min);
};
exports.generateOTP = generateOTP;


/***/ }),
/* 68 */
/***/ ((module) => {

module.exports = require("bcrypt");

/***/ }),
/* 69 */
/***/ ((module) => {

module.exports = require("uuid");

/***/ }),
/* 70 */
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AppResponse = void 0;
const success = (res) => {
    return {
        status: true,
        message: res.message || null,
        data: res.data,
        ...res, // Spread the additional properties
    };
};
const failed = (res) => {
    return {
        status: false,
        message: res.message || null,
        data: res.data,
        ...res, // Spread the additional properties
    };
};
const messages = {
    success: "Success",
    failed: "Failed",
    recordInserted: "Record has been inserted successfully",
    recordUpdated: "Record has been updated successfully",
    recordFound: "Record found successfully",
    choiceArr: "User's assessment answers array is empty. Please provide a proper response, including the question ID or choice ID.",
    recordNotFound: "Record not found",
    activityNotFound: "Activity not found",
    interventionNotFound: "Intervention not found",
    slugPlatform: "Both 'Slug' and 'Platform' are required!",
    catIdNotFound: "Category id not found",
    recordDeleted: "Record deleted successfully",
    somethingWentWrong: "Something went wrong!",
    idNotFound: "ID not found!",
    Invalid: "Invalid ID provided",
    InvalidFolk: "Invalid expert id provided",
    deviceId: "Device ID is missing in the request headers",
    missingApp: "App, platform, and country are required in the headers.",
    missingAppPlatform: "Platform is missing from the headers.",
    deviceIdNotFound: "Device ID not found!",
    firebaseToken: "Firebase token has expired!",
    refreshTokenUsed: "Refresh token has already been used!",
    queryParam: "Query parameter(s) missing from URL",
    restartChat: "Conversation restarted.",
    notStarted: "Conversation has not started yet!",
    messageLimit: "You can send a message of up to 1000 characters.",
    ownMessageReact: "You cannot react to your own message.",
    expertMessage: "Expert message id is wrong",
    alreadyClaimed: "You have already claimed ! ",
    fileSizeExceed: "You can upload an image up to 500 KB!",
    accountDeleted: "Account deleted successfully!",
    logout: "Logout successfully!",
    auth: {
        registered: "Email already registered",
        notRegistered: "Email not registered",
        otpSend: "OTP has been sent to your mobile number",
        otpExpired: "OTP has been expired",
        otpInvalid: "OTP is incorrect! Please retry",
        featureExist: "Feature already exist!",
        maxReach: "Maximum OTP attempts reached.",
    },
    message: {
        notFound: "Message not found!",
        feedback: "Feedback updated.",
        feedbackInactive: "Feedback is not active!",
        noRecord: "No record found before the given message",
        notUpdate: "No message updated",
        noEnergy: "You have no energy to do conversation!",
    },
    conversations: {
        notFound: "Conversations not found!",
        restartConversations: "Restart your conversations",
        exist: "Conversation already exists.",
    },
    rewards: {
        ads: "Ads rewads is not active!",
        icode: "Icode rewads is not active!",
        useNotOwn: "You cannot use your own invitation code.",
        invailidReferral: "You cannot use your own invitation code.",
        hours_elapse_24: "Reward has been granted for the day. Please try again after 24 hours elapse",
    },
    customBot: {
        notFound: "No record founds!",
        noBotFound: "No such bot found!",
        botId: "Expert not found!",
        botExsit: "Expert creation limit exceeded in the selected category.",
    },
    questions: {
        notFound: "No record founds!",
        updated: "Data updated successfully",
    },
    utilities: {
        notFound: "No record founds for this model in utilities!",
    },
    folk: {
        notFound: "Expert not found!",
        notDelete: "You cannot delete the expert as it is associated with an conversations or task !",
    },
    task: {
        notFound: "Task not found!",
    },
    user: {
        notFound: "User id not found!",
        selectedCategory: "At least one category must be selected.!",
        userNotFound: "User not found!",
    },
    category: {
        notUpdate: "You cannot update the app because it is associated with an expert !",
        notDelete: "You cannot delete the category as it is associated with an expert or task !",
        notFound: "Category id not found!",
    },
    upload: {
        fileNotFound: "File not found, Please select a file for upload !",
        imageAllowed: "Only image files are allowed!",
    },
};
exports.AppResponse = {
    success,
    failed,
    messages,
};


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.NotBlank = exports.NotBlankConstraint = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
let NotBlankConstraint = class NotBlankConstraint {
    validate(value, args) {
        if (typeof value !== 'string') {
            return false;
        }
        return value.trim() !== '';
    }
    defaultMessage(args) {
        return `${args.property} cannot be blank or contain only white spaces`;
    }
};
exports.NotBlankConstraint = NotBlankConstraint;
exports.NotBlankConstraint = NotBlankConstraint = tslib_1.__decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'notblank', async: false })
], NotBlankConstraint);
function NotBlank(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: NotBlankConstraint,
        });
    };
}
exports.NotBlank = NotBlank;


/***/ }),
/* 73 */
/***/ ((module) => {

module.exports = require("class-validator");

/***/ }),
/* 74 */
/***/ ((module) => {

module.exports = require("@nestjs/core/constants");

/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const onboardings_service_1 = __webpack_require__(76);
const onboardings_controller_1 = __webpack_require__(77);
let OnboardingModule = class OnboardingModule {
};
exports.OnboardingModule = OnboardingModule;
exports.OnboardingModule = OnboardingModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [onboardings_controller_1.OnboardingController],
        providers: [onboardings_service_1.OnboardingService],
    })
], OnboardingModule);


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
let OnboardingService = class OnboardingService {
    async listing(filters) {
        try {
            const { skip, limit, sort, ord } = filters;
            const whereCondition = {};
            whereCondition.is_active = true;
            const onboardingList = await models_1.Onboardings.findAll({
                offset: skip,
                limit,
                order: [[sort, ord]],
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "is_active", "position"],
                },
            });
            if (onboardingList && onboardingList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: onboardingList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async show(id) {
        try {
            const whereCondition = {};
            const onboardingsId = await models_1.Onboardings.findByPk(id);
            if (!onboardingsId) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            if (id) {
                whereCondition.id = id;
            }
            const onboardingsSpecific = await models_1.Onboardings.findOne({
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "position"],
                },
            });
            if (!onboardingsSpecific) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: onboardingsSpecific,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async update(id, updatedData) {
        try {
            const onboarding = await models_1.Onboardings.findByPk(id);
            if (!onboarding) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            await onboarding.update(updatedData);
            const updatedOnboarding = await models_1.Onboardings.findByPk(onboarding.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt", "position"],
                },
            });
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordUpdated,
                data: updatedOnboarding,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
};
exports.OnboardingService = OnboardingService;
exports.OnboardingService = OnboardingService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], OnboardingService);


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const onboardings_service_1 = __webpack_require__(76);
const onboardings_dto_1 = __webpack_require__(78);
const modules_1 = __webpack_require__(8);
let OnboardingController = class OnboardingController {
    constructor(onboardingService) {
        this.onboardingService = onboardingService;
    }
    async listing(skip = 1, limit = 50, sort = "position", ord = "asc") {
        limit = limit ? Number(limit) : 50;
        skip = skip ? (Number(skip) - 1) * limit : 0;
        return await this.onboardingService.listing({
            skip,
            limit,
            sort,
            ord,
        });
    }
    async show(id) {
        return await this.onboardingService.show(id);
    }
    async update(id, updatedData) {
        return await this.onboardingService.update(id, updatedData);
    }
};
exports.OnboardingController = OnboardingController;
tslib_1.__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Query)("skip")),
    tslib_1.__param(1, (0, common_1.Query)("limit")),
    tslib_1.__param(2, (0, common_1.Query)("sort")),
    tslib_1.__param(3, (0, common_1.Query)("ord")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], OnboardingController.prototype, "listing", null);
tslib_1.__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], OnboardingController.prototype, "show", null);
tslib_1.__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof onboardings_dto_1.OnboardingDto !== "undefined" && onboardings_dto_1.OnboardingDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], OnboardingController.prototype, "update", null);
exports.OnboardingController = OnboardingController = tslib_1.__decorate([
    (0, common_1.Controller)("onboardings"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof onboardings_service_1.OnboardingService !== "undefined" && onboardings_service_1.OnboardingService) === "function" ? _a : Object])
], OnboardingController);


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.OnboardingDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
const utils_1 = __webpack_require__(65);
class OnboardingDto {
}
exports.OnboardingDto = OnboardingDto;
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OnboardingDto.prototype, "image", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.Length)(1, 15),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OnboardingDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.Length)(1, 100),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], OnboardingDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], OnboardingDto.prototype, "is_active", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], OnboardingDto.prototype, "position", void 0);


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const users_service_1 = __webpack_require__(80);
const users_controller_1 = __webpack_require__(81);
let UserModule = class UserModule {
};
exports.UserModule = UserModule;
exports.UserModule = UserModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [users_controller_1.UserController],
        providers: [users_service_1.UserService],
        exports: [users_service_1.UserService],
    })
], UserModule);


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const fs = tslib_1.__importStar(__webpack_require__(39));
const path = tslib_1.__importStar(__webpack_require__(4));
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
const config_1 = __webpack_require__(11);
let UserService = class UserService {
    constructor(configService) {
        this.configService = configService;
    }
    async listing(filters) {
        try {
            const { skip, limit, sort, ord } = filters;
            const whereCondition = {};
            whereCondition.is_active = true;
            const userList = await models_1.User.findAll({
                offset: skip,
                limit,
                order: [[sort, ord]],
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "is_active", "position"],
                },
            });
            if (userList && userList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: userList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async show(id) {
        try {
            const whereCondition = {};
            const userId = await models_1.User.findByPk(id);
            if (!userId) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            if (id) {
                whereCondition.id = id;
            }
            const userSpecific = await models_1.User.findOne({
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            if (!userSpecific) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: userSpecific,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async findById(id) {
        // returns the raw User instance (or null)
        return models_1.User.findByPk(id, {
            attributes: ["id", "first_name", "gender", "birth_date", "birth_time", "birth_place", "marital_status", "mobile", "email", "city", "state", "country", "image"], // fetch only what you need
        });
    }
    async update(id, updatedData) {
        try {
            const user = await models_1.User.findByPk(id);
            if (!user) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            //console.log('jkjjkjkjk', updatedData); return false;
            await user.update(updatedData);
            const updatedUser = await models_1.User.findByPk(user.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordUpdated,
                data: updatedUser,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async uploadProfile(payload) {
        const { userid, file } = payload;
        console.log('fileeeee', file);
        const MAX_FILE_SIZE = 50 * 1024; // 50KB
        const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
        if (file.size > MAX_FILE_SIZE) {
            return utils_1.AppResponse.failed({
                message: "File size should not exceed 50KB",
                data: [],
            });
        }
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return utils_1.AppResponse.failed({
                message: "Invalid file type. Only .jpg, .jpeg, .png are allowed.",
                data: [],
            });
        }
        const uploadsDir = path.join(process.cwd(), "uploads", "profile");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filename = `user-${Date.now()}${ext}`;
        const filepath = path.join(uploadsDir, filename);
        fs.writeFileSync(filepath, file.buffer);
        const baseUrl = this.configService.get("BASE_URL");
        const imageUrl = `${baseUrl}/uploads/profile/${filename}`;
        await models_1.User.update({ image: imageUrl }, { where: { id: userid } });
        return utils_1.AppResponse.success({
            message: utils_1.AppResponse.messages.recordUpdated,
            data: imageUrl,
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], UserService);


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const common_2 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(63);
const users_service_1 = __webpack_require__(80);
const users_dto_1 = __webpack_require__(82);
const modules_1 = __webpack_require__(8);
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async listing(skip = 1, limit = 50, sort = "position", ord = "asc") {
        limit = limit ? Number(limit) : 50;
        skip = skip ? (Number(skip) - 1) * limit : 0;
        return await this.userService.listing({
            skip,
            limit,
            sort,
            ord,
        });
    }
    async show(id) {
        return await this.userService.show(id);
    }
    async update(id, updatedData) {
        return await this.userService.update(id, updatedData);
    }
    // Upload image file
    // @Put("/upload-profile/:id")
    // @UseGuards(JwtAuthGuard)
    // @UseInterceptors(FileInterceptor("file"))
    // async uploadProfile(
    //   @Param("id") userid: string,
    //   @UploadedFile() file: Express.Multer.File
    // ) {
    //   if (!file) {
    //     throw new BadRequestException("File should not be empty");
    //   }
    //   const payload = { userid, file };
    //   return await this.userService.uploadProfile(payload);
    // }
    async uploadProfile(userid, file) {
        console.log('come herererer request', file);
        if (!file) {
            throw new common_2.BadRequestException("File should not be empty");
        }
        const payload = { userid, file };
        return await this.userService.uploadProfile(payload);
    }
};
exports.UserController = UserController;
tslib_1.__decorate([
    (0, common_1.Get)("/"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Query)("skip")),
    tslib_1.__param(1, (0, common_1.Query)("limit")),
    tslib_1.__param(2, (0, common_1.Query)("sort")),
    tslib_1.__param(3, (0, common_1.Query)("ord")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "listing", null);
tslib_1.__decorate([
    (0, common_1.Get)("/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "show", null);
tslib_1.__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof users_dto_1.UserDto !== "undefined" && users_dto_1.UserDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Put)("/upload-profile/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("image")) // <-- must match the key in formData
    ,
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], UserController.prototype, "uploadProfile", null);
exports.UserController = UserController = tslib_1.__decorate([
    (0, common_1.Controller)("users"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof users_service_1.UserService !== "undefined" && users_service_1.UserService) === "function" ? _a : Object])
], UserController);


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadProfileDto = exports.UserDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
const utils_1 = __webpack_require__(65);
class UserDto {
}
exports.UserDto = UserDto;
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "First Name must contain only alphabets",
    }),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "Last Name must contain only alphabets",
    }),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Please sign-in with a valid email id!" }),
    (0, class_validator_1.IsString)({ message: "Email must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.Length)(1, 30, { message: "Email must be a maximum of 30 characters long." }),
    (0, class_validator_1.Matches)(/^[^!#$%&*'=?_|~{}]*$/, {
        message: "Email should not contain special characters like !#$%&*'=?_|~{}.",
    }),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "birth_date", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "birth_time", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["MALE", "FEMALE", "OTHER"], {
        message: "Gender must be either MALE, FEMALE, or OTHER",
    }),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "Birth place must contain only alphabets",
    }),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "birth_place", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "state", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "marital_status", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "religion", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "language", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "topic_of_concern", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], UserDto.prototype, "occupation", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000, { message: "Pincode must be a 6-digit number" }),
    (0, class_validator_1.Max)(999999, { message: "Pincode must be a 6-digit number" }),
    tslib_1.__metadata("design:type", Number)
], UserDto.prototype, "pincode", void 0);
class UploadProfileDto {
}
exports.UploadProfileDto = UploadProfileDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], UploadProfileDto.prototype, "userid", void 0);


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VendorModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const vendors_service_1 = __webpack_require__(84);
const vendors_controller_1 = __webpack_require__(85);
let VendorModule = class VendorModule {
};
exports.VendorModule = VendorModule;
exports.VendorModule = VendorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [vendors_controller_1.VendorController],
        providers: [vendors_service_1.VendorService],
    })
], VendorModule);


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VendorService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const fs = tslib_1.__importStar(__webpack_require__(39));
const path = tslib_1.__importStar(__webpack_require__(4));
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
const config_1 = __webpack_require__(11);
let VendorService = class VendorService {
    constructor(configService) {
        this.configService = configService;
    }
    async listing(filters) {
        try {
            const { skip, limit, sort, ord } = filters;
            const whereCondition = {};
            whereCondition.is_active = true;
            const userList = await models_1.Vendor.findAll({
                offset: skip,
                limit,
                order: [[sort, ord]],
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "is_active"],
                },
            });
            if (userList && userList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: userList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async show(id) {
        try {
            const whereCondition = {};
            const userId = await models_1.Vendor.findByPk(id);
            if (!userId) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            if (id) {
                whereCondition.id = id;
            }
            const userSpecific = await models_1.Vendor.findOne({
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            if (!userSpecific) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: userSpecific,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async update(id, updatedData) {
        console.log("jkjkjkjkjkjkjkjkj servicessss");
        try {
            const vendor = await models_1.Vendor.findByPk(id);
            if (!vendor) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.idNotFound,
                    data: {},
                });
            }
            //console.log('jkjjkjkjk', updatedData); return false;
            await vendor.update(updatedData);
            const updatedUser = await models_1.Vendor.findByPk(vendor.id, {
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordUpdated,
                data: updatedUser,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async uploadProfile(payload) {
        const { userid, file } = payload;
        console.log("fileeeee", file);
        const MAX_FILE_SIZE = 50 * 1024; // 50KB
        const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
        if (file.size > MAX_FILE_SIZE) {
            return utils_1.AppResponse.failed({
                message: "File size should not exceed 50KB",
                data: [],
            });
        }
        const ext = path.extname(file.originalname).toLowerCase();
        if (!ALLOWED_EXTENSIONS.includes(ext)) {
            return utils_1.AppResponse.failed({
                message: "Invalid file type. Only .jpg, .jpeg, .png are allowed.",
                data: [],
            });
        }
        const uploadsDir = path.join(process.cwd(), "uploads", "vendor");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const filename = `vendor-${Date.now()}${ext}`;
        const filepath = path.join(uploadsDir, filename);
        fs.writeFileSync(filepath, file.buffer);
        const baseUrl = this.configService.get("BASE_URL");
        const imageUrl = `${baseUrl}/uploads/vendor/${filename}`;
        await models_1.Vendor.update({ image: imageUrl }, { where: { id: userid } });
        return utils_1.AppResponse.success({
            message: utils_1.AppResponse.messages.recordUpdated,
            data: imageUrl,
        });
    }
    // Upload vendor documents
    async uploadDocuments(userid, files) {
        const MAX_FILE_SIZE = 500 * 1024; // 50KB limit per file
        const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];
        const uploadsDir = path.join(process.cwd(), "uploads", "vendor");
        if (!fs.existsSync(uploadsDir)) {
            fs.mkdirSync(uploadsDir, { recursive: true });
        }
        const urls = [];
        for (const file of files) {
            const ext = path.extname(file.originalname).toLowerCase();
            if (file.size > MAX_FILE_SIZE) {
                return utils_1.AppResponse.failed({
                    message: "Each file must not exceed 500KB",
                });
            }
            if (!ALLOWED_EXTENSIONS.includes(ext)) {
                return utils_1.AppResponse.failed({
                    message: "Only .jpg, .jpeg, .png files are allowed",
                });
            }
            const filename = `vendor-${Date.now()}-${Math.random()
                .toString(36)
                .substring(2)}${ext}`;
            const filepath = path.join(uploadsDir, filename);
            // Write the file to disk
            fs.writeFileSync(filepath, file.buffer);
            // Generate the URL for the uploaded file
            const baseUrl = this.configService.get("BASE_URL");
            urls.push(`${baseUrl}/uploads/vendor/${filename}`);
        }
        // Assuming the `Vendor` model has two fields: documents1 and documents2
        await models_1.Vendor.update({
            document1: urls[0],
            document2: urls[1], // Pan Card document
        }, { where: { id: userid } });
        return utils_1.AppResponse.success({
            message: "Documents uploaded successfully",
            data: { document1: urls[0], document2: urls[1] },
        });
    }
};
exports.VendorService = VendorService;
exports.VendorService = VendorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], VendorService);


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.VendorController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(63);
const common_2 = __webpack_require__(6);
const platform_express_2 = __webpack_require__(63);
const vendors_service_1 = __webpack_require__(84);
const vendors_dto_1 = __webpack_require__(86);
const modules_1 = __webpack_require__(8);
let VendorController = class VendorController {
    constructor(vendorService) {
        this.vendorService = vendorService;
    }
    async listing(skip = 1, limit = 50, sort = "experience", ord = "asc") {
        limit = limit ? Number(limit) : 50;
        skip = skip ? (Number(skip) - 1) * limit : 0;
        return await this.vendorService.listing({
            skip,
            limit,
            sort,
            ord,
        });
    }
    //@UseGuards(JwtAuthGuard)
    async show(id) {
        console.log("gettttttt controller");
        return await this.vendorService.show(id);
    }
    async update(id, updatedData) {
        console.log("jkjkjkjkjkjkjkjkj controller");
        return await this.vendorService.update(id, updatedData);
    }
    // Upload image file
    async uploadProfile(userid, file) {
        console.log("come herererer request", file);
        if (!file) {
            throw new common_2.BadRequestException("File should not be empty");
        }
        const payload = { userid, file };
        return await this.vendorService.uploadProfile(payload);
    }
    async uploadDocuments(userid, files) {
        if (!files.document1?.length || !files.document2?.length) {
            throw new common_2.BadRequestException("Both Aadhar (document1) and PAN (document2) are required.");
        }
        return await this.vendorService.uploadDocuments(userid, [
            files.document1[0],
            files.document2[0],
        ]);
    }
};
exports.VendorController = VendorController;
tslib_1.__decorate([
    (0, common_1.Get)("/"),
    tslib_1.__param(0, (0, common_1.Query)("skip")),
    tslib_1.__param(1, (0, common_1.Query)("limit")),
    tslib_1.__param(2, (0, common_1.Query)("sort")),
    tslib_1.__param(3, (0, common_1.Query)("ord")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "listing", null);
tslib_1.__decorate([
    (0, common_1.Get)("/:id")
    //@UseGuards(JwtAuthGuard)
    ,
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "show", null);
tslib_1.__decorate([
    (0, common_1.Put)("/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof vendors_dto_1.VendorDto !== "undefined" && vendors_dto_1.VendorDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "update", null);
tslib_1.__decorate([
    (0, common_1.Put)("/upload-profile/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_2.FileInterceptor)("image")) // <-- must match the key in formData
    ,
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof Express !== "undefined" && (_c = Express.Multer) !== void 0 && _c.File) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "uploadProfile", null);
tslib_1.__decorate([
    (0, common_1.Put)("/upload-documents/:id"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([
        { name: "document1", maxCount: 1 },
        { name: "document2", maxCount: 1 },
    ])),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.UploadedFiles)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], VendorController.prototype, "uploadDocuments", null);
exports.VendorController = VendorController = tslib_1.__decorate([
    (0, common_1.Controller)("vendors"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof vendors_service_1.VendorService !== "undefined" && vendors_service_1.VendorService) === "function" ? _a : Object])
], VendorController);


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UploadProfileDto = exports.VendorDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
const utils_1 = __webpack_require__(65);
class VendorDto {
}
exports.VendorDto = VendorDto;
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "First Name must contain only alphabets",
    }),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "Last Name must contain only alphabets",
    }),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "last_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Please sign-in with a valid email id!" }),
    (0, class_validator_1.IsString)({ message: "Email must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Email is required" }),
    (0, class_validator_1.Length)(1, 30, { message: "Email must be a maximum of 30 characters long." }),
    (0, class_validator_1.Matches)(/^[^!#$%&*'=?_|~{}]*$/, {
        message: "Email should not contain special characters like !#$%&*'=?_|~{}.",
    }),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "email", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "birth_date", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["MALE", "FEMALE", "OTHER"], {
        message: "Gender must be either MALE, FEMALE, or OTHER",
    }),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "city", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "state", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "marital_status", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "religion", void 0);
tslib_1.__decorate([
    (0, utils_1.NotBlank)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "language", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "specialist", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "experience", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], VendorDto.prototype, "chat_charge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    tslib_1.__metadata("design:type", Number)
], VendorDto.prototype, "call_charge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "address", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VendorDto.prototype, "bio", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(100000, { message: "Pincode must be a 6-digit number" }),
    (0, class_validator_1.Max)(999999, { message: "Pincode must be a 6-digit number" }),
    tslib_1.__metadata("design:type", Number)
], VendorDto.prototype, "pincode", void 0);
class UploadProfileDto {
}
exports.UploadProfileDto = UploadProfileDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], UploadProfileDto.prototype, "userid", void 0);


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const payments_service_1 = __webpack_require__(88);
const payments_controller_1 = __webpack_require__(89);
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [payments_controller_1.PaymentController],
        providers: [payments_service_1.PaymentService],
    })
], PaymentModule);


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
const config_1 = __webpack_require__(11);
let PaymentService = class PaymentService {
    constructor(configService) {
        this.configService = configService;
    }
    async listing(filters) {
        try {
            const { skip, limit, sort, ord } = filters;
            const whereCondition = {};
            whereCondition.is_active = true;
            const userList = await models_1.RechargePayment.findAll({
                offset: skip,
                limit,
                order: [[sort, ord]],
                where: whereCondition,
                attributes: {
                    exclude: ["createdAt", "updatedAt", "is_active"],
                },
            });
            if (userList && userList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: userList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async show(user_id) {
        try {
            const userPayment = await models_1.RechargePayment.findOne({
                where: { user_id },
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                },
            });
            if (!userPayment) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: {
                    user_id,
                    amount: userPayment.amount,
                },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async create(data) {
        try {
            const newPayment = await models_1.RechargePayment.create({
                ...data,
            });
            if (!newPayment) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: newPayment,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async updateBalance(userId, deductedAmount) {
        try {
            const payment = await models_1.RechargePayment.findOne({ where: { user_id: userId } });
            if (!payment) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            const newAmount = payment.amount - deductedAmount;
            payment.amount = newAmount;
            await payment.save();
            return utils_1.AppResponse.success({
                message: "Balance updated successfully",
                data: payment,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async walletTransaction(userId) {
        try {
            // Get current balance from RechargePayment
            const payment = await models_1.RechargePayment.findOne({ where: { user_id: userId } });
            // Get transaction history from ChatTransaction
            const transactions = await models_1.ChatTransaction.findAll({
                where: { user_id: userId },
                order: [['createdAt', 'DESC']], // Optional: recent first
            });
            if (!payment) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            // Transform transactions if needed
            const formattedTransactions = transactions.map((txn) => ({
                minuts: txn.duration_minutes || null,
                amount: txn.total_charge,
                datetime: txn.createdAt,
            }));
            return utils_1.AppResponse.success({
                message: "Wallet data fetched successfully",
                data: {
                    balance: payment.amount,
                    transactions: formattedTransactions,
                },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message || "Something went wrong",
                data: {},
            });
        }
    }
    async astrologerWalletTransaction(userId) {
        try {
            console.log('userId', userId);
            // 1. Get admin percentage from vendor table (assuming it's in percent like 20 for 20%)
            const vendor = await models_1.Vendor.findOne({ where: { id: userId } });
            const adminPercentage = vendor?.admin_chat_charge || 0; // fallback to 0% if not set
            // 2. Get transaction history from ChatTransaction
            const transactions = await models_1.ChatTransaction.findAll({
                where: { astrologer_id: userId },
                order: [['createdAt', 'DESC']],
            });
            let totalEarnings = 0;
            // 3. Transform transactions
            const formattedTransactions = transactions.map((txn) => {
                const total = txn.total_charge || 0;
                const adminCut = (total * adminPercentage) / 100;
                const netEarning = +(total - adminCut).toFixed(2); // round to 2 decimal places
                totalEarnings += netEarning;
                return {
                    minuts: txn.duration_minutes || null,
                    amount: total,
                    earning: netEarning,
                    adminearn: adminCut,
                    datetime: txn.createdAt,
                };
            });
            console.log('formattedTransactions', formattedTransactions);
            return utils_1.AppResponse.success({
                message: "Wallet data fetched successfully",
                data: {
                    transactions: formattedTransactions,
                    balance: +totalEarnings.toFixed(2), // rounded total
                },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message || "Something went wrong",
                data: {},
            });
        }
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], PaymentService);


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const payments_service_1 = __webpack_require__(88);
const payments_dto_1 = __webpack_require__(90);
const modules_1 = __webpack_require__(8);
let PaymentController = class PaymentController {
    constructor(paymentService) {
        this.paymentService = paymentService;
    }
    async listing(skip = 1, limit = 50, sort = "experience", ord = "asc") {
        limit = limit ? Number(limit) : 50;
        skip = skip ? (Number(skip) - 1) * limit : 0;
        return await this.paymentService.listing({
            skip,
            limit,
            sort,
            ord,
        });
    }
    //@UseGuards(JwtAuthGuard)
    async show(id) {
        console.log("gettttttt controller");
        return await this.paymentService.show(id);
    }
    async create(id, postData) {
        return await this.paymentService.create(postData);
    }
    async updateBalance(userId, deductedAmount) {
        return this.paymentService.updateBalance(userId, deductedAmount);
    }
    async walletTransaction(userId) {
        return this.paymentService.walletTransaction(userId);
    }
    async astrologerWalletTransaction(userId) {
        return this.paymentService.astrologerWalletTransaction(userId);
    }
};
exports.PaymentController = PaymentController;
tslib_1.__decorate([
    (0, common_1.Get)("/"),
    tslib_1.__param(0, (0, common_1.Query)("skip")),
    tslib_1.__param(1, (0, common_1.Query)("limit")),
    tslib_1.__param(2, (0, common_1.Query)("sort")),
    tslib_1.__param(3, (0, common_1.Query)("ord")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Number, String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "listing", null);
tslib_1.__decorate([
    (0, common_1.Get)("/:id")
    //@UseGuards(JwtAuthGuard)
    ,
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "show", null);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("id")),
    tslib_1.__param(1, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_b = typeof payments_dto_1.PaymentDto !== "undefined" && payments_dto_1.PaymentDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Patch)("update-balance/:userId"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("userId")),
    tslib_1.__param(1, (0, common_1.Body)("amount")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Number]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "updateBalance", null);
tslib_1.__decorate([
    (0, common_1.Get)(':userId/transactions'),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("userId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "walletTransaction", null);
tslib_1.__decorate([
    (0, common_1.Get)(':userId/astrologer/transactions'),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("userId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], PaymentController.prototype, "astrologerWalletTransaction", null);
exports.PaymentController = PaymentController = tslib_1.__decorate([
    (0, common_1.Controller)("payment"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof payments_service_1.PaymentService !== "undefined" && payments_service_1.PaymentService) === "function" ? _a : Object])
], PaymentController);


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PaymentDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
class PaymentDto {
}
exports.PaymentDto = PaymentDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], PaymentDto.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], PaymentDto.prototype, "astrologer_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: "Amount must be at least 1" }),
    tslib_1.__metadata("design:type", Number)
], PaymentDto.prototype, "amount", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["UPI", "CARD", "WALLET", "NETBANKING"], {
        message: "Method must be one of: UPI, CARD, WALLET, NETBANKING",
    }),
    tslib_1.__metadata("design:type", String)
], PaymentDto.prototype, "method", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(100, { message: "Transaction ID must not exceed 100 characters" }),
    tslib_1.__metadata("design:type", String)
], PaymentDto.prototype, "transaction_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["success", "pending", "failed"], {
        message: "Status must be success, pending, or failed",
    }),
    tslib_1.__metadata("design:type", String)
], PaymentDto.prototype, "status", void 0);


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const chats_service_1 = __webpack_require__(92);
const chats_controller_1 = __webpack_require__(94);
const chat_gateway_1 = __webpack_require__(96); // import gateway
const users_module_1 = __webpack_require__(79);
let ChatModule = class ChatModule {
};
exports.ChatModule = ChatModule;
exports.ChatModule = ChatModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [users_module_1.UserModule],
        controllers: [chats_controller_1.ChatController],
        providers: [chats_service_1.ChatService, chat_gateway_1.ChatGateway],
    })
], ChatModule);


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(93);
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
const config_1 = __webpack_require__(11);
let ChatService = class ChatService {
    constructor(configService) {
        this.configService = configService;
    }
    // In chat.service.ts
    async getConversationList(userId) {
        try {
            const { count, rows } = await models_1.ChatTransaction.findAndCountAll({
                where: {
                    user_id: userId,
                },
                include: [
                    {
                        model: models_1.Vendor,
                        as: "astrologer",
                        attributes: ["id", "first_name", "image", "chat_charge", "admin_chat_charge"],
                    },
                ],
                order: [["createdAt", "DESC"]],
            });
            if (!rows || rows.length === 0) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: "Fetched conversation list",
                data: rows,
                totalCount: count,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message || "Something went wrong",
                data: {},
            });
        }
    }
    // async getConversationList(userId: string) {
    //   try {
    //     const rows = await ChatTransaction.findAll({
    //       where: { user_id: userId },
    //       attributes: [
    //         'user_id',
    //         'astrologer_id',
    //         'chat_id',
    //         [fn('SUM', col('duration_minutes')), 'duration_minutes'],
    //         [fn('SUM', col('total_charge')), 'total_charge'],
    //         [fn('MAX', col('createdAt')), 'createdAt'], // get latest createdAt
    //       ],
    //       include: [
    //         {
    //           model: Vendor,
    //           as: "astrologer",
    //           attributes: ["id", "first_name", "image", "chat_charge"],
    //         },
    //       ],
    //       group: ['user_id', 'astrologer_id', 'chat_id', 'astrologer.id'],
    //       order: [[fn('MAX', col('createdAt')), 'DESC']],
    //       raw: false,
    //     });
    //     if (!rows || rows.length === 0) {
    //       return AppResponse.failed({
    //         message: AppResponse.messages.recordNotFound,
    //         data: {},
    //       });
    //     }
    //     console.log('rowwwww', rows)
    //     return AppResponse.success({
    //       message: "Fetched conversation list",
    //       data: rows,
    //       totalCount: rows.length,
    //     });
    //   } catch (error) {
    //     return AppResponse.failed({
    //       message: error.message || "Something went wrong",
    //       data: {},
    //     });
    //   }
    // }
    async fetchConversationList(userId, astrologerId) {
        console.log('userId', userId);
        console.log('astrologerId', astrologerId);
        try {
            const messages = await models_1.Chat.findAll({
                where: {
                    [sequelize_1.Op.or]: [
                        { sender_id: userId, receiver_id: astrologerId },
                        { sender_id: astrologerId, receiver_id: userId },
                    ],
                },
                include: [
                    {
                        model: models_1.Vendor,
                        as: "astrologer",
                        attributes: ["id", "first_name", "image", "chat_charge", "admin_chat_charge"],
                    },
                    {
                        model: models_1.ChatTransaction,
                        attributes: ["duration_minutes"],
                    },
                ],
                order: [["createdAt", "ASC"]],
            });
            const modifiedMessages = messages.map((msg) => {
                const baseCharge = msg.astrologer?.chat_charge || 0;
                const adminCharge = msg.astrologer?.admin_chat_charge || 0;
                const totalCharge = baseCharge + (baseCharge * adminCharge) / 100;
                return {
                    ...msg.toJSON(),
                    total_charge: totalCharge,
                };
            });
            return utils_1.AppResponse.success({
                message: "Fetched conversation list",
                data: modifiedMessages,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message || "Something went wrong",
                data: {},
            });
        }
    }
    async getMessagesBetweenUsers(senderId, receiverId) {
        try {
            console.log('senderIdsenderId', senderId);
            console.log('receiverIdreceiverId', receiverId);
            const getMessage = await models_1.Chat.findAll({
                where: {
                    // Either senderId to receiverId or vice versa
                    [sequelize_1.Op.or]: [
                        { sender_id: senderId, receiver_id: receiverId },
                        { sender_id: receiverId, receiver_id: senderId },
                    ],
                },
                order: [["createdAt", "ASC"]], // You may want to order by time
            });
            if (!getMessage) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: getMessage,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async getUnreadCount(receiver_id) {
        try {
            // Total unread messages
            const count = await models_1.Chat.count({
                where: { receiver_id, is_read: false },
            });
            // Get unique customer_ids who sent unread messages
            const unreadSenders = await models_1.Chat.findAll({
                attributes: ["sender_id"],
                where: { receiver_id, is_read: false },
                group: ["sender_id"],
            });
            const uniqueCustomerIds = unreadSenders.map((msg) => msg.sender_id);
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: {
                    unreadCount: count,
                    customerIds: uniqueCustomerIds,
                },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async markMessagesAsRead(customerId, astrologerId) {
        const result = await models_1.Chat.update({ is_read: true }, {
            where: {
                sender_id: customerId,
                receiver_id: astrologerId,
                is_read: false,
            },
        });
        return {
            status: true,
            message: 'Messages marked as read',
            data: result,
        };
    }
    async create(data) {
        try {
            const newChat = await models_1.Chat.create({
                ...data,
            });
            if (!newChat) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: newChat,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
    async chat_transaction_create(data) {
        try {
            console.log('data', data);
            const newChat = await models_1.ChatTransaction.create({
                ...data,
            });
            if (!newChat) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: {},
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: newChat,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: {},
            });
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _a : Object])
], ChatService);


/***/ }),
/* 93 */
/***/ ((module) => {

module.exports = require("sequelize");

/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const platform_express_1 = __webpack_require__(63);
const multer_1 = __webpack_require__(64);
const chats_service_1 = __webpack_require__(92);
const chats_dto_1 = __webpack_require__(95);
const modules_1 = __webpack_require__(8);
let ChatController = class ChatController {
    constructor(chatService) {
        this.chatService = chatService;
    }
    async fetchConversation(userId, astrologerId) {
        console.log('hererere conversation');
        return this.chatService.fetchConversationList(userId, astrologerId);
    }
    async getConversation(userId) {
        return this.chatService.getConversationList(userId);
    }
    uploadImage(file) {
        if (!file) {
            return { status: false, message: "No file uploaded" };
        }
        return {
            status: true,
            message: "Image uploaded successfully",
            url: `/uploads/chats/${file.filename}`, // ✅ accessible due to static serve in `main.ts`
        };
    }
    async getMessages(senderId, receiverId) {
        console.log('fetch chat conversation');
        return this.chatService.getMessagesBetweenUsers(senderId, receiverId);
    }
    getUnreadCount(receiverId) {
        return this.chatService.getUnreadCount(receiverId);
    }
    async markAsRead(customerId, req) {
        const astrologerId = req.user.id;
        return this.chatService.markMessagesAsRead(customerId, astrologerId);
    }
    async create(postData) {
        return await this.chatService.create(postData);
    }
    async chat_transaction_create(postData) {
        return await this.chatService.chat_transaction_create(postData);
    }
};
exports.ChatController = ChatController;
tslib_1.__decorate([
    (0, common_1.Get)('conversations'),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Query)('userId')),
    tslib_1.__param(1, (0, common_1.Query)('astrologerId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "fetchConversation", null);
tslib_1.__decorate([
    (0, common_1.Get)(':userId'),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)('userId')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "getConversation", null);
tslib_1.__decorate([
    (0, common_1.Post)("upload-image"),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)("file", {
        storage: (0, multer_1.diskStorage)({
            destination: "./uploads/chats",
            filename: (req, file, cb) => {
                const uniqueName = `${Date.now()}-${file.originalname}`;
                cb(null, uniqueName);
            },
        }),
    })),
    tslib_1.__param(0, (0, common_1.UploadedFile)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_c = typeof Express !== "undefined" && (_b = Express.Multer) !== void 0 && _b.File) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatController.prototype, "uploadImage", null);
tslib_1.__decorate([
    (0, common_1.Get)("messages"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Query)("senderId")),
    tslib_1.__param(1, (0, common_1.Query)("receiverId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, String]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "getMessages", null);
tslib_1.__decorate([
    (0, common_1.Get)("unread-count/:receiverId"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("receiverId")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatController.prototype, "getUnreadCount", null);
tslib_1.__decorate([
    (0, common_1.Patch)("mark-read/:customerId"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Param)("customerId")),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "markAsRead", null);
tslib_1.__decorate([
    (0, common_1.Post)("/"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof chats_dto_1.ChatDto !== "undefined" && chats_dto_1.ChatDto) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "create", null);
tslib_1.__decorate([
    (0, common_1.Post)("chat_transation"),
    (0, common_1.UseGuards)(modules_1.JwtAuthGuard),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_e = typeof chats_dto_1.ChatTransactionDto !== "undefined" && chats_dto_1.ChatTransactionDto) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatController.prototype, "chat_transaction_create", null);
exports.ChatController = ChatController = tslib_1.__decorate([
    (0, common_1.Controller)("chat"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof chats_service_1.ChatService !== "undefined" && chats_service_1.ChatService) === "function" ? _a : Object])
], ChatController);


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatTransactionDto = exports.ChatDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
class ChatDto {
}
exports.ChatDto = ChatDto;
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Sender ID is required" }),
    tslib_1.__metadata("design:type", String)
], ChatDto.prototype, "sender_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsUUID)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Receiver ID is required" }),
    tslib_1.__metadata("design:type", String)
], ChatDto.prototype, "receiver_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)({ message: "Message cannot be empty" }),
    tslib_1.__metadata("design:type", String)
], ChatDto.prototype, "message", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["text", "image", "audio"], {
        message: "Message type must be one of: text, image, audio",
    }),
    tslib_1.__metadata("design:type", String)
], ChatDto.prototype, "message_type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], ChatDto.prototype, "is_read", void 0);
class ChatTransactionDto {
}
exports.ChatTransactionDto = ChatTransactionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], ChatTransactionDto.prototype, "user_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], ChatTransactionDto.prototype, "astrologer_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsUUID)(),
    tslib_1.__metadata("design:type", String)
], ChatTransactionDto.prototype, "chat_id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01, { message: "Amount deducted must be greater than 0" }),
    tslib_1.__metadata("design:type", Number)
], ChatTransactionDto.prototype, "total_charge", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0.01, { message: "Amount deducted must be greater than 0" }),
    tslib_1.__metadata("design:type", Number)
], ChatTransactionDto.prototype, "duration_minutes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["chat", "call", "video"], {
        message: "Type must be one of: chat, call, video",
    }),
    tslib_1.__metadata("design:type", String)
], ChatTransactionDto.prototype, "type", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(["completed", "pending", "failed"], {
        message: "Status must be one of: completed, pending, failed",
    }),
    tslib_1.__metadata("design:type", String)
], ChatTransactionDto.prototype, "status", void 0);


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f, _g;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ChatGateway = void 0;
const tslib_1 = __webpack_require__(1);
const websockets_1 = __webpack_require__(97);
const socket_io_1 = __webpack_require__(98);
const chats_service_1 = __webpack_require__(92);
const users_service_1 = __webpack_require__(80);
// 👇 Add this before the @WebSocketGateway decorator
const activeRequests = new Map();
const pendingRequests = new Map(); // astrologerId → customerIds
const activeChats = new Set(); // astrologerIds currently in chat
let ChatGateway = class ChatGateway {
    constructor(chatService, UserService) {
        this.chatService = chatService;
        this.UserService = UserService;
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (!userId) {
            console.warn(`Connection rejected - no userId. Socket ID: ${client.id}`);
            client.disconnect();
            return;
        }
        else {
            client.join(userId);
            console.log(`Client connected: ${client.id} with ${userId}`);
        }
    }
    handleDisconnect(client) {
        console.log(`Client disconnected: ${client.id}`);
    }
    handleJoinRoom(roomId, client) {
        console.log("✅ Backend joined room:", roomId);
        client.join(roomId);
        console.log(`Socket ${client.id} joined room ${roomId}`);
    }
    async handleMessage(payload, client) {
        const { message, roomId } = payload;
        console.log("Saving message:", message);
        const result = await this.chatService.create(message);
        console.log("Result from DB:", result);
        if (result.data) {
            console.log("Emitting message to room:", roomId, result.data);
            this.server.to(roomId).emit("receiveMessage", result.data);
        }
        return { status: "ok" };
    }
    handleEndChatByCustomer(data) {
        console.log("📴 Chat ended by customer:", data);
        // 1️⃣ Remove astrologer from active chat
        activeChats.delete(data.receiverId);
        // 2️⃣ Remove sender from pending list (cleanup)
        const requests = pendingRequests.get(data.receiverId);
        if (requests) {
            requests.delete(data.senderId);
            pendingRequests.set(data.receiverId, requests);
        }
        // 3️⃣ Notify astrologer
        this.server.to(data.receiverId).emit("chat_ended_by_customer", data);
        // 4️⃣ Send next request if any
        const remaining = pendingRequests.get(data.receiverId);
        if (remaining && remaining.size > 0) {
            const nextSenderId = [...remaining][0]; // pick first
            this.UserService.findById(nextSenderId).then((customer) => {
                const enriched = {
                    senderId: nextSenderId,
                    receiverId: data.receiverId,
                    roomId: [nextSenderId, data.receiverId].sort().join("-"),
                    customerName: customer?.first_name || "Unknown",
                    customerImage: customer?.image || null,
                };
                this.server.to(data.receiverId).emit("request_chat", enriched);
            });
        }
    }
    async handleRequestChat(data, client) {
        const { senderId, receiverId } = data;
        // Reject if astrologer already has 2 pending requests
        const requests = pendingRequests.get(receiverId) || new Set();
        if (requests.size >= 2) {
            this.server.to(senderId).emit('chat_busy', {
                message: 'Astrologer is currently busy with other customers.',
            });
            return;
        }
        // Add to pending list
        requests.add(senderId);
        pendingRequests.set(receiverId, requests);
        // Enrich and send to astrologer
        const customer = await this.UserService.findById(senderId);
        const enriched = {
            ...data,
            customerName: customer?.first_name || "Unknown",
            customerImage: customer?.image || null,
        };
        this.server.to(receiverId).emit('request_chat', enriched);
    }
    async handleAcceptChat(data, client) {
        // Check if astrologer is already chatting
        if (activeChats.has(data.receiverId)) {
            this.server.to(data.senderId).emit('chat_busy', {
                message: 'Astrologer is already in an active chat.',
            });
            return;
        }
        client.join(data.roomId);
        activeChats.add(data.receiverId); // Set as active
        this.server.to(data.senderId).emit('chat_accepted', data);
        const customer = await this.UserService.findById(data.senderId);
        const detailsText = [
            `Hi ${customer?.first_name || 'there'},`,
            'Below are my details:',
            `Name: ${customer?.first_name || '-'}`,
            `Gender: ${customer?.gender || '-'}`,
            `DOB: ${customer?.birth_date || '-'}`,
            `TOB: ${customer?.birth_time || '-'}`,
            `POB: ${customer?.birth_place || '-'}`,
            `Marital Status: ${customer?.marital_status || '-'}`,
            `Phone: ${customer?.mobile || '-'}`,
            `Email: ${customer?.email || '-'}`,
            `Address: ${[customer?.birth_place, customer?.city, customer?.state, customer?.country].filter(Boolean).join(', ') || '-'}`,
        ].join('\n');
        const detailsMsg = {
            sender_id: data.senderId,
            receiver_id: data.receiverId,
            message: detailsText,
            message_type: 'text',
            is_read: false,
        };
        const welcomeMsg = {
            sender_id: data.receiverId,
            receiver_id: data.senderId,
            message: 'Welcome! How can I help you today? 😊',
            message_type: 'text',
            is_read: false,
        };
        await this.chatService.create(detailsMsg);
        await this.chatService.create(welcomeMsg);
        console.log("✅ [Gateway] Sending initialMessages to room:", data.roomId);
        this.server.to(data.roomId).emit("initialMessages", [detailsMsg, welcomeMsg]);
        console.log("✅ [Gateway] Sent:", [detailsMsg, welcomeMsg]);
        // Remove from pending
        const requests = pendingRequests.get(data.receiverId);
        if (requests) {
            requests.delete(data.senderId);
            pendingRequests.set(data.receiverId, requests);
        }
    }
    handleRejectChat(data) {
        console.log(`❌ Chat rejected by astrologer (${data.receiverId})`);
        this.server.to(data.senderId).emit("chat_rejected");
    }
    /* ------------------------------------------------------------------ */
    /*  NEW: relay customer_ready so the astrologer knows the client is in */
    /* ------------------------------------------------------------------ */
    handleCustomerReady(data) {
        console.log("[GATEWAY] customer_ready relay → astrologer", data);
        // send straight to the astrologer’s personal room
        this.server
            .to(data.astrologerId)
            .emit("customer_ready", { customerId: data.customerId });
    }
};
exports.ChatGateway = ChatGateway;
tslib_1.__decorate([
    (0, websockets_1.WebSocketServer)(),
    tslib_1.__metadata("design:type", typeof (_c = typeof socket_io_1.Server !== "undefined" && socket_io_1.Server) === "function" ? _c : Object)
], ChatGateway.prototype, "server", void 0);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("join_room"),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [String, typeof (_d = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _d : Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinRoom", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("sendMessage"),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_e = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessage", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("end_chat_by_customer"),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleEndChatByCustomer", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('request_chat'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_f = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleRequestChat", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)('accept_chat'),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__param(1, (0, websockets_1.ConnectedSocket)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, typeof (_g = typeof socket_io_1.Socket !== "undefined" && socket_io_1.Socket) === "function" ? _g : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleAcceptChat", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("reject_chat"),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleRejectChat", null);
tslib_1.__decorate([
    (0, websockets_1.SubscribeMessage)("customer_ready"),
    tslib_1.__param(0, (0, websockets_1.MessageBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleCustomerReady", null);
exports.ChatGateway = ChatGateway = tslib_1.__decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
            credentials: true,
        },
        transports: ["websocket"],
        pingInterval: 25000,
        pingTimeout: 60000,
    }),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof chats_service_1.ChatService !== "undefined" && chats_service_1.ChatService) === "function" ? _a : Object, typeof (_b = typeof users_service_1.UserService !== "undefined" && users_service_1.UserService) === "function" ? _b : Object])
], ChatGateway);


/***/ }),
/* 97 */
/***/ ((module) => {

module.exports = require("@nestjs/websockets");

/***/ }),
/* 98 */
/***/ ((module) => {

module.exports = require("socket.io");

/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(100);
const auth_controller_1 = __webpack_require__(101);
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [auth_service_1.AuthService],
    })
], AuthModule);


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(38);
const moment_1 = tslib_1.__importDefault(__webpack_require__(61));
const crypto = tslib_1.__importStar(__webpack_require__(70));
const config_1 = __webpack_require__(11);
const utils_1 = __webpack_require__(65);
const constant_1 = __webpack_require__(20);
const models_1 = __webpack_require__(17);
const modules_1 = __webpack_require__(8);
let AuthService = class AuthService {
    constructor(jwt, config, loggerService) {
        this.jwt = jwt;
        this.config = config;
        this.loggerService = loggerService;
    }
    getAccessTokens(user) {
        const secret = crypto.randomBytes(164).toString("base64");
        const payload = {
            user: {
                id: user.id,
                first_name: user.first_name,
                mobile: user.mobile,
            },
            secret,
        };
        const token = this.jwt.sign(payload);
        const refreshToken = this.jwt.sign(payload, {
            expiresIn: this.config.get("JWT_REFRESH_EXPIRY"),
        });
        return {
            token,
            refreshToken,
            user: {
                id: user.id,
                name: user.first_name,
                mobile: user.mobile,
                login: user.is_login,
            },
        };
    }
    async sendLoginOtp(data, req) {
        try {
            const getOtp = await this.sendOTP(data.mobile, constant_1.OtpTypeEnum.LOGIN, req);
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.auth.otpSend,
                data: getOtp,
            });
        }
        catch (error) {
            const loggingEnabled = this.config.get("ENABLE_LOGGER", false);
            if (loggingEnabled === "true") {
                const stack = new Error().stack;
                this.loggerService.error(error.message, stack, req);
            }
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
    async sendOTP(mobile, otpType, req) {
        const { ip } = req;
        const ua = req.headers["user-agent"];
        let otp = await models_1.Otp.findOne({
            where: { mobile, type: otpType },
        });
        //Handling the otp attempts
        if (otp) {
            const currentTime = (0, moment_1.default)();
            const coolDownPeriod = 30;
            const attemptsLimit = 3;
            const isCoolDownActive = otp.updatedAt &&
                currentTime.diff(otp.updatedAt, "minutes") < coolDownPeriod;
            if (otp.attempts >= attemptsLimit && isCoolDownActive) {
                const minutesSinceLastOtp = currentTime.diff(otp.updatedAt, "minutes");
                const remainingMinutes = coolDownPeriod - minutesSinceLastOtp;
                const minuteText = remainingMinutes === 1 ? "minute" : "minutes";
                throw new Error(`${utils_1.AppResponse.messages.auth.maxReach} You can try again in ${remainingMinutes} ${minuteText}.`);
            }
            if (otp.attempts >= attemptsLimit && !isCoolDownActive) {
                await models_1.Otp.destroy({ where: { mobile, type: otpType } });
                otp = null;
            }
        }
        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
        const ttlDate = (0, moment_1.default)().add(10, "minutes");
        if (otp) {
            otp.otp = otpValue;
            otp.attempts += 1;
            otp.ttl = ttlDate;
            otp.ua = ua;
            otp.ip = ip;
            await otp.save();
        }
        else {
            otp = await models_1.Otp.create({
                mobile,
                ua,
                ip,
                ttl: ttlDate,
                type: otpType,
                otp: otpValue,
                attempts: 1,
            });
        }
        // Send OTP mobile
        // await this.mailerService.sendOtpmobile(mobile, {
        //   otp: otpValue,
        // });
        return otp;
    }
    async loginWithOtp(data, req) {
        try {
            const otpVerification = await this.verifyOtp({
                mobile: data.mobile,
                otp: data.otp,
                otpType: constant_1.OtpTypeEnum.LOGIN,
            });
            if (!otpVerification.status) {
                return utils_1.AppResponse.failed({
                    message: otpVerification.message,
                });
            }
            let mobileExists = await models_1.User.findOne({ where: { mobile: data.mobile } });
            if (mobileExists) {
                mobileExists.mobile = data.mobile;
                mobileExists.is_login = true;
                mobileExists.is_active = true;
                mobileExists = await mobileExists.save();
            }
            else {
                mobileExists = await models_1.User.create({
                    mobile: data.mobile,
                    is_login: true,
                    is_active: true,
                });
            }
            const tokenData = { ...this.getAccessTokens(mobileExists) };
            if (Object.keys(tokenData).length > 0) {
                await models_1.Otp.destroy({
                    where: { mobile: data.mobile, type: constant_1.OtpTypeEnum.LOGIN },
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.success,
                data: { ...this.getAccessTokens(mobileExists) },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
    async verifyOtp(data) {
        try {
            const otp = await models_1.Otp.findOne({
                where: {
                    mobile: data.mobile,
                    otp: data.otp,
                    type: data.otpType,
                },
            });
            if (!otp)
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.auth.otpInvalid,
                });
            if ((0, moment_1.default)(otp.ttl).isBefore((0, moment_1.default)()))
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.auth.otpExpired,
                });
            return utils_1.AppResponse.success({});
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => jwt_1.JwtService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof modules_1.LoggerService !== "undefined" && modules_1.LoggerService) === "function" ? _c : Object])
], AuthService);


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const auth_service_1 = __webpack_require__(100);
const auth_dto_1 = __webpack_require__(102);
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    async sendOtp(body, req) {
        return await this.authService.sendLoginOtp(body, req);
    }
    async loginWithOtp(body, req) {
        return await this.authService.loginWithOtp(body, req);
    }
    async verifyOtp(body) {
        return await this.authService.verifyOtp(body);
    }
};
exports.AuthController = AuthController;
tslib_1.__decorate([
    (0, common_1.Post)("send-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof auth_dto_1.SendOtpDto !== "undefined" && auth_dto_1.SendOtpDto) === "function" ? _b : Object, typeof (_c = typeof Request !== "undefined" && Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "sendOtp", null);
tslib_1.__decorate([
    (0, common_1.Post)("login-with-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof auth_dto_1.LoginOTPDto !== "undefined" && auth_dto_1.LoginOTPDto) === "function" ? _d : Object, typeof (_e = typeof Request !== "undefined" && Request) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "loginWithOtp", null);
tslib_1.__decorate([
    (0, common_1.Post)("verify-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof auth_dto_1.VerifyOtpDto !== "undefined" && auth_dto_1.VerifyOtpDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthController.prototype, "verifyOtp", null);
exports.AuthController = AuthController = tslib_1.__decorate([
    (0, common_1.Controller)("auth"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof auth_service_1.AuthService !== "undefined" && auth_service_1.AuthService) === "function" ? _a : Object])
], AuthController);


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDto = exports.LoginOTPDto = exports.LoginDto = exports.VerifyOtpDto = exports.SendOtpDto = exports.BuyEnergyDto = exports.LogOutDto = exports.VerifyTokenDto = void 0;
const tslib_1 = __webpack_require__(1);
const constant_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(73);
class VerifyTokenDto {
}
exports.VerifyTokenDto = VerifyTokenDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyTokenDto.prototype, "token", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VerifyTokenDto.prototype, "age_group", void 0);
class LogOutDto {
}
exports.LogOutDto = LogOutDto;
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], LogOutDto.prototype, "isLogOut", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], LogOutDto.prototype, "isAccountDelete", void 0);
class BuyEnergyDto {
}
exports.BuyEnergyDto = BuyEnergyDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "rawPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], BuyEnergyDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "currencyCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "currencySymbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "purchaseID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "productID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "transactionDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "verificationData", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "serverVerificationData", void 0);
class SendOtpDto {
}
exports.SendOtpDto = SendOtpDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: "Mobile number must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mobile number is required" }),
    (0, class_validator_1.Matches)(/^[6-9][0-9]{9}$/, {
        message: "Mobile number must be a valid 10-digit number starting with 6-9",
    }),
    tslib_1.__metadata("design:type", String)
], SendOtpDto.prototype, "mobile", void 0);
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "OTP must be a number!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "OTP should not be empty!" }),
    tslib_1.__metadata("design:type", Number)
], VerifyOtpDto.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(constant_1.OtpTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "otpType", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "device", void 0);
class LoginOTPDto {
}
exports.LoginOTPDto = LoginOTPDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginOTPDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "OTP must be a number!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "OTP should not be empty!" }),
    tslib_1.__metadata("design:type", Number)
], LoginOTPDto.prototype, "otp", void 0);
class updateDto {
}
exports.updateDto = updateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "Name must contain only alphabets",
    }),
    (0, class_validator_1.Length)(1, 20, { message: "Name must be a maximum of 20 characters long." }),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "age_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1, {
        message: "Please enter a valid number for 'Number of cigarettes'.",
    }),
    (0, class_validator_1.Max)(999, {
        message: "Number of cigarettes must be a maximum of 3 digits long.",
    }),
    tslib_1.__metadata("design:type", Number)
], updateDto.prototype, "number_of_cigarettes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1, { message: "Please enter a valid number for 'Years of smoking'." }),
    (0, class_validator_1.Max)(999, {
        message: "Year of smoking must be a maximum of 2 digits long.",
    }),
    tslib_1.__metadata("design:type", Number)
], updateDto.prototype, "years_of_smoking", void 0);


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthVendorModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const authVendor_service_1 = __webpack_require__(104);
const authVendor_controller_1 = __webpack_require__(105);
let AuthVendorModule = class AuthVendorModule {
};
exports.AuthVendorModule = AuthVendorModule;
exports.AuthVendorModule = AuthVendorModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [authVendor_controller_1.AuthVendorController],
        providers: [authVendor_service_1.AuthVendorService],
    })
], AuthVendorModule);


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthVendorService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const jwt_1 = __webpack_require__(38);
const moment_1 = tslib_1.__importDefault(__webpack_require__(61));
const crypto = tslib_1.__importStar(__webpack_require__(70));
const config_1 = __webpack_require__(11);
const utils_1 = __webpack_require__(65);
const constant_1 = __webpack_require__(20);
const models_1 = __webpack_require__(17);
const modules_1 = __webpack_require__(8);
let AuthVendorService = class AuthVendorService {
    constructor(jwt, config, loggerService) {
        this.jwt = jwt;
        this.config = config;
        this.loggerService = loggerService;
    }
    getAccessTokens(user) {
        const secret = crypto.randomBytes(164).toString("base64");
        const payload = {
            user: {
                id: user.id,
                first_name: user.first_name,
                mobile: user.mobile,
            },
            secret,
        };
        const token = this.jwt.sign(payload);
        const refreshToken = this.jwt.sign(payload, {
            expiresIn: this.config.get("JWT_REFRESH_EXPIRY"),
        });
        return {
            token,
            refreshToken,
            user: {
                id: user.id,
                name: user.first_name,
                mobile: user.mobile,
                login: user.is_login,
            },
        };
    }
    async sendLoginOtp(data, req) {
        try {
            const getOtp = await this.sendOTP(data.mobile, constant_1.OtpTypeEnum.LOGIN, req);
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.auth.otpSend,
                data: getOtp,
            });
        }
        catch (error) {
            const loggingEnabled = this.config.get("ENABLE_LOGGER", false);
            if (loggingEnabled === "true") {
                const stack = new Error().stack;
                this.loggerService.error(error.message, stack, req);
            }
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
    async sendOTP(mobile, otpType, req) {
        const { ip } = req;
        const ua = req.headers["user-agent"];
        let otp = await models_1.Otp.findOne({
            where: { mobile, type: otpType },
        });
        //Handling the otp attempts
        if (otp) {
            const currentTime = (0, moment_1.default)();
            const coolDownPeriod = 30;
            const attemptsLimit = 3;
            const isCoolDownActive = otp.updatedAt &&
                currentTime.diff(otp.updatedAt, "minutes") < coolDownPeriod;
            if (otp.attempts >= attemptsLimit && isCoolDownActive) {
                const minutesSinceLastOtp = currentTime.diff(otp.updatedAt, "minutes");
                const remainingMinutes = coolDownPeriod - minutesSinceLastOtp;
                const minuteText = remainingMinutes === 1 ? "minute" : "minutes";
                throw new Error(`${utils_1.AppResponse.messages.auth.maxReach} You can try again in ${remainingMinutes} ${minuteText}.`);
            }
            if (otp.attempts >= attemptsLimit && !isCoolDownActive) {
                await models_1.Otp.destroy({ where: { mobile, type: otpType } });
                otp = null;
            }
        }
        const otpValue = Math.floor(1000 + Math.random() * 9000).toString();
        const ttlDate = (0, moment_1.default)().add(10, "minutes");
        if (otp) {
            otp.otp = otpValue;
            otp.attempts += 1;
            otp.ttl = ttlDate;
            otp.ua = ua;
            otp.ip = ip;
            await otp.save();
        }
        else {
            otp = await models_1.Otp.create({
                mobile,
                ua,
                ip,
                ttl: ttlDate,
                type: otpType,
                otp: otpValue,
                attempts: 1,
            });
        }
        // Send OTP mobile
        // await this.mailerService.sendOtpmobile(mobile, {
        //   otp: otpValue,
        // });
        return otp;
    }
    async loginWithOtp(data, req) {
        try {
            const otpVerification = await this.verifyOtp({
                mobile: data.mobile,
                otp: data.otp,
                otpType: constant_1.OtpTypeEnum.LOGIN,
            });
            if (!otpVerification.status) {
                return utils_1.AppResponse.failed({
                    message: otpVerification.message,
                });
            }
            let mobileExists = await models_1.Vendor.findOne({
                where: { mobile: data.mobile },
            });
            if (mobileExists) {
                mobileExists.mobile = data.mobile;
                mobileExists.is_login = true;
                mobileExists.is_active = true;
                mobileExists = await mobileExists.save();
            }
            else {
                mobileExists = await models_1.Vendor.create({
                    mobile: data.mobile,
                    is_login: true,
                    is_active: true,
                });
            }
            const tokenData = { ...this.getAccessTokens(mobileExists) };
            if (Object.keys(tokenData).length > 0) {
                await models_1.Otp.destroy({
                    where: { mobile: data.mobile, type: constant_1.OtpTypeEnum.LOGIN },
                });
            }
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.success,
                data: { ...this.getAccessTokens(mobileExists) },
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
    async verifyOtp(data) {
        try {
            const otp = await models_1.Otp.findOne({
                where: {
                    mobile: data.mobile,
                    otp: data.otp,
                    type: data.otpType,
                },
            });
            if (!otp)
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.auth.otpInvalid,
                });
            if ((0, moment_1.default)(otp.ttl).isBefore((0, moment_1.default)()))
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.auth.otpExpired,
                });
            return utils_1.AppResponse.success({});
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
            });
        }
    }
};
exports.AuthVendorService = AuthVendorService;
exports.AuthVendorService = AuthVendorService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, common_1.Inject)((0, common_1.forwardRef)(() => jwt_1.JwtService))),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof jwt_1.JwtService !== "undefined" && jwt_1.JwtService) === "function" ? _a : Object, typeof (_b = typeof config_1.ConfigService !== "undefined" && config_1.ConfigService) === "function" ? _b : Object, typeof (_c = typeof modules_1.LoggerService !== "undefined" && modules_1.LoggerService) === "function" ? _c : Object])
], AuthVendorService);


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b, _c, _d, _e, _f;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AuthVendorController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const authVendor_service_1 = __webpack_require__(104);
const authVendor_dto_1 = __webpack_require__(106);
let AuthVendorController = class AuthVendorController {
    constructor(authVendorService) {
        this.authVendorService = authVendorService;
    }
    async sendOtp(body, req) {
        return await this.authVendorService.sendLoginOtp(body, req);
    }
    async loginWithOtp(body, req) {
        return await this.authVendorService.loginWithOtp(body, req);
    }
    async verifyOtp(body) {
        return await this.authVendorService.verifyOtp(body);
    }
};
exports.AuthVendorController = AuthVendorController;
tslib_1.__decorate([
    (0, common_1.Post)("send-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof authVendor_dto_1.SendOtpDto !== "undefined" && authVendor_dto_1.SendOtpDto) === "function" ? _b : Object, typeof (_c = typeof Request !== "undefined" && Request) === "function" ? _c : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthVendorController.prototype, "sendOtp", null);
tslib_1.__decorate([
    (0, common_1.Post)("login-with-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__param(1, (0, common_1.Req)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_d = typeof authVendor_dto_1.LoginOTPDto !== "undefined" && authVendor_dto_1.LoginOTPDto) === "function" ? _d : Object, typeof (_e = typeof Request !== "undefined" && Request) === "function" ? _e : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthVendorController.prototype, "loginWithOtp", null);
tslib_1.__decorate([
    (0, common_1.Post)("verify-otp"),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_f = typeof authVendor_dto_1.VerifyOtpDto !== "undefined" && authVendor_dto_1.VerifyOtpDto) === "function" ? _f : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], AuthVendorController.prototype, "verifyOtp", null);
exports.AuthVendorController = AuthVendorController = tslib_1.__decorate([
    (0, common_1.Controller)("authVendor"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof authVendor_service_1.AuthVendorService !== "undefined" && authVendor_service_1.AuthVendorService) === "function" ? _a : Object])
], AuthVendorController);


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateDto = exports.LoginOTPDto = exports.LoginDto = exports.VerifyOtpDto = exports.SendOtpDto = exports.BuyEnergyDto = exports.LogOutDto = exports.VerifyTokenDto = void 0;
const tslib_1 = __webpack_require__(1);
const constant_1 = __webpack_require__(20);
const class_validator_1 = __webpack_require__(73);
class VerifyTokenDto {
}
exports.VerifyTokenDto = VerifyTokenDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyTokenDto.prototype, "token", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], VerifyTokenDto.prototype, "age_group", void 0);
class LogOutDto {
}
exports.LogOutDto = LogOutDto;
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], LogOutDto.prototype, "isLogOut", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", Boolean)
], LogOutDto.prototype, "isAccountDelete", void 0);
class BuyEnergyDto {
}
exports.BuyEnergyDto = BuyEnergyDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "title", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "description", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "price", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "rawPrice", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", Number)
], BuyEnergyDto.prototype, "quantity", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "currencyCode", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "currencySymbol", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "purchaseID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "productID", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "transactionDate", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "verificationData", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], BuyEnergyDto.prototype, "serverVerificationData", void 0);
class SendOtpDto {
}
exports.SendOtpDto = SendOtpDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)({ message: "Mobile number must be a string" }),
    (0, class_validator_1.IsNotEmpty)({ message: "Mobile number is required" }),
    (0, class_validator_1.Matches)(/^[6-9][0-9]{9}$/, {
        message: "Mobile number must be a valid 10-digit number starting with 6-9",
    }),
    tslib_1.__metadata("design:type", String)
], SendOtpDto.prototype, "mobile", void 0);
class VerifyOtpDto {
}
exports.VerifyOtpDto = VerifyOtpDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "OTP must be a number!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "OTP should not be empty!" }),
    tslib_1.__metadata("design:type", Number)
], VerifyOtpDto.prototype, "otp", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsEnum)(constant_1.OtpTypeEnum),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], VerifyOtpDto.prototype, "otpType", void 0);
class LoginDto {
}
exports.LoginDto = LoginDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "password", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsOptional)(),
    tslib_1.__metadata("design:type", String)
], LoginDto.prototype, "device", void 0);
class LoginOTPDto {
}
exports.LoginOTPDto = LoginOTPDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], LoginOTPDto.prototype, "mobile", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)({}, { message: "OTP must be a number!" }),
    (0, class_validator_1.IsNotEmpty)({ message: "OTP should not be empty!" }),
    tslib_1.__metadata("design:type", Number)
], LoginOTPDto.prototype, "otp", void 0);
class updateDto {
}
exports.updateDto = updateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^(?=.*[A-Za-z])[A-Za-z\s]+$/, {
        message: "Name must contain only alphabets",
    }),
    (0, class_validator_1.Length)(1, 20, { message: "Name must be a maximum of 20 characters long." }),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "first_name", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "gender", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], updateDto.prototype, "age_group", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1, {
        message: "Please enter a valid number for 'Number of cigarettes'.",
    }),
    (0, class_validator_1.Max)(999, {
        message: "Number of cigarettes must be a maximum of 3 digits long.",
    }),
    tslib_1.__metadata("design:type", Number)
], updateDto.prototype, "number_of_cigarettes", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Min)(1, { message: "Please enter a valid number for 'Years of smoking'." }),
    (0, class_validator_1.Max)(999, {
        message: "Year of smoking must be a maximum of 2 digits long.",
    }),
    tslib_1.__metadata("design:type", Number)
], updateDto.prototype, "years_of_smoking", void 0);


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationModule = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const configuration_service_1 = __webpack_require__(108);
const configuration_controller_1 = __webpack_require__(109);
let ConfigurationModule = class ConfigurationModule {
};
exports.ConfigurationModule = ConfigurationModule;
exports.ConfigurationModule = ConfigurationModule = tslib_1.__decorate([
    (0, common_1.Module)({
        controllers: [configuration_controller_1.ConfigurationController],
        providers: [configuration_service_1.ConfigurationService],
    })
], ConfigurationModule);


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const models_1 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
let ConfigurationService = class ConfigurationService {
    async create(data) {
        const configuration = await models_1.SystemConfig.create({
            feature: data.feature,
            sub_feature: data.sub_feature,
            value: data.value,
        });
        return utils_1.AppResponse.success({
            message: utils_1.AppResponse.messages.success,
            data: configuration,
        });
    }
};
exports.ConfigurationService = ConfigurationService;
exports.ConfigurationService = ConfigurationService = tslib_1.__decorate([
    (0, common_1.Injectable)()
], ConfigurationService);


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ConfigurationController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const configuration_service_1 = __webpack_require__(108);
const configuration_dto_1 = __webpack_require__(110);
//import { HeadersGuard } from '@xapads/nest/modules';
let ConfigurationController = class ConfigurationController {
    constructor(configurationService) {
        this.configurationService = configurationService;
    }
    async create(body) {
        return await this.configurationService.create(body);
    }
};
exports.ConfigurationController = ConfigurationController;
tslib_1.__decorate([
    (0, common_1.Post)(''),
    tslib_1.__param(0, (0, common_1.Body)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [typeof (_b = typeof configuration_dto_1.CreateConfigurationDto !== "undefined" && configuration_dto_1.CreateConfigurationDto) === "function" ? _b : Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ConfigurationController.prototype, "create", null);
exports.ConfigurationController = ConfigurationController = tslib_1.__decorate([
    (0, common_1.Controller)('config'),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof configuration_service_1.ConfigurationService !== "undefined" && configuration_service_1.ConfigurationService) === "function" ? _a : Object])
], ConfigurationController);


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a, _b;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UpdatePermissionDto = exports.CustomConfigurationDto = exports.UpdateDto = exports.CreateConfigurationDto = void 0;
const tslib_1 = __webpack_require__(1);
const class_validator_1 = __webpack_require__(73);
const class_transformer_1 = __webpack_require__(111);
class CreateConfigurationDto {
}
exports.CreateConfigurationDto = CreateConfigurationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateConfigurationDto.prototype, "feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], CreateConfigurationDto.prototype, "sub_feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_a = typeof JSON !== "undefined" && JSON) === "function" ? _a : Object)
], CreateConfigurationDto.prototype, "value", void 0);
class UpdateDto {
}
exports.UpdateDto = UpdateDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "sub_feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "app", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "platform", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], UpdateDto.prototype, "country", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", typeof (_b = typeof JSON !== "undefined" && JSON) === "function" ? _b : Object)
], UpdateDto.prototype, "value", void 0);
class CustomConfigurationDto {
}
exports.CustomConfigurationDto = CustomConfigurationDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CustomConfigurationDto.prototype, "feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    tslib_1.__metadata("design:type", String)
], CustomConfigurationDto.prototype, "sub_feature", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], CustomConfigurationDto.prototype, "status", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], CustomConfigurationDto.prototype, "app", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], CustomConfigurationDto.prototype, "platform", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Transform)(({ value }) => value.toUpperCase()),
    tslib_1.__metadata("design:type", String)
], CustomConfigurationDto.prototype, "country", void 0);
class UpdatePermissionDto {
}
exports.UpdatePermissionDto = UpdatePermissionDto;
tslib_1.__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    tslib_1.__metadata("design:type", String)
], UpdatePermissionDto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsBoolean)(),
    tslib_1.__metadata("design:type", Boolean)
], UpdatePermissionDto.prototype, "status", void 0);


/***/ }),
/* 111 */
/***/ ((module) => {

module.exports = require("class-transformer");

/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountriesModule = void 0;
const tslib_1 = __webpack_require__(1);
const sequelize_1 = __webpack_require__(14);
const common_1 = __webpack_require__(6);
const countries_service_1 = __webpack_require__(113);
const countries_controller_1 = __webpack_require__(114);
const models_1 = __webpack_require__(17);
let CountriesModule = class CountriesModule {
};
exports.CountriesModule = CountriesModule;
exports.CountriesModule = CountriesModule = tslib_1.__decorate([
    (0, common_1.Module)({
        imports: [sequelize_1.SequelizeModule.forFeature([models_1.Country, models_1.State, models_1.City])],
        controllers: [countries_controller_1.CountriesController],
        providers: [countries_service_1.CountriesService],
    })
], CountriesModule);


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountriesService = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const sequelize_1 = __webpack_require__(14);
const models_1 = __webpack_require__(17);
const models_2 = __webpack_require__(17);
const models_3 = __webpack_require__(17);
const models_4 = __webpack_require__(17);
const utils_1 = __webpack_require__(65);
let CountriesService = class CountriesService {
    constructor(countryModel, stateModel, cityModel) {
        this.countryModel = countryModel;
        this.stateModel = stateModel;
        this.cityModel = cityModel;
    }
    async getCountries() {
        try {
            const countriesList = await models_1.Country.findAll({ attributes: ["id", "name"] });
            if (countriesList && countriesList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: countriesList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async getStates(country_id) {
        try {
            const statesList = await models_2.State.findAll({
                where: { country_id },
                attributes: ["id", "name"],
            });
            if (statesList && statesList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: statesList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    async getCities(state_id) {
        try {
            const citiesList = await models_3.City.findAll({
                where: { state_id },
                attributes: ["id", "name"],
            });
            if (citiesList && citiesList.length > 0) {
                return utils_1.AppResponse.success({
                    message: utils_1.AppResponse.messages.recordFound,
                    data: citiesList,
                });
            }
            else {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
    // Get the business logic to fetch the system config
    async getConfig() {
        try {
            const configList = await models_4.SystemConfig.findAll();
            if (!configList || configList.length === 0) {
                return utils_1.AppResponse.failed({
                    message: utils_1.AppResponse.messages.recordNotFound,
                    data: [],
                });
            }
            const grouped = {};
            configList.forEach((item) => {
                try {
                    grouped[item.feature] = JSON.parse(item.value);
                }
                catch (err) {
                    grouped[item.feature] = {};
                }
            });
            return utils_1.AppResponse.success({
                message: utils_1.AppResponse.messages.recordFound,
                data: grouped,
            });
        }
        catch (error) {
            return utils_1.AppResponse.failed({
                message: error.message,
                data: [],
            });
        }
    }
};
exports.CountriesService = CountriesService;
exports.CountriesService = CountriesService = tslib_1.__decorate([
    (0, common_1.Injectable)(),
    tslib_1.__param(0, (0, sequelize_1.InjectModel)(models_1.Country)),
    tslib_1.__param(1, (0, sequelize_1.InjectModel)(models_2.State)),
    tslib_1.__param(2, (0, sequelize_1.InjectModel)(models_3.City)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], CountriesService);


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


var _a;
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CountriesController = void 0;
const tslib_1 = __webpack_require__(1);
const common_1 = __webpack_require__(6);
const countries_service_1 = __webpack_require__(113);
let CountriesController = class CountriesController {
    constructor(countriesService) {
        this.countriesService = countriesService;
    }
    async getCountries() {
        return this.countriesService.getCountries();
    }
    async getStates(country_id) {
        return this.countriesService.getStates(country_id);
    }
    async getCities(state_id) {
        return this.countriesService.getCities(state_id);
    }
    // Get the system configuration model
    async getConfig() {
        return this.countriesService.getConfig();
    }
};
exports.CountriesController = CountriesController;
tslib_1.__decorate([
    (0, common_1.Get)("countries"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CountriesController.prototype, "getCountries", null);
tslib_1.__decorate([
    (0, common_1.Get)("states/:country_id"),
    tslib_1.__param(0, (0, common_1.Param)("country_id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CountriesController.prototype, "getStates", null);
tslib_1.__decorate([
    (0, common_1.Get)("cities/:state_id"),
    tslib_1.__param(0, (0, common_1.Param)("state_id")),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], CountriesController.prototype, "getCities", null);
tslib_1.__decorate([
    (0, common_1.Get)("config"),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", Promise)
], CountriesController.prototype, "getConfig", null);
exports.CountriesController = CountriesController = tslib_1.__decorate([
    (0, common_1.Controller)("countries"),
    tslib_1.__metadata("design:paramtypes", [typeof (_a = typeof countries_service_1.CountriesService !== "undefined" && countries_service_1.CountriesService) === "function" ? _a : Object])
], CountriesController);


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const tslib_1 = __webpack_require__(1);
const core_1 = __webpack_require__(2);
const express = tslib_1.__importStar(__webpack_require__(3));
const path_1 = __webpack_require__(4);
const api_module_1 = __webpack_require__(5);
const common_1 = __webpack_require__(6);
async function bootstrap() {
    const app = await core_1.NestFactory.create(api_module_1.ApiModule, {
        cors: {
            origin: ["http://localhost:3000", "http://www.astrobolo.com/"],
            credentials: true,
            exposedHeaders: ["Authorization", "publicationid"],
        },
    });
    // 🔥 Serve static files from the 'uploads' folder
    app.use("/uploads", express.static((0, path_1.join)(process.cwd(), "uploads")));
    // ✅ Serve chat images from 'public/chat-images'
    app.use("/chat-images", express.static((0, path_1.join)(process.cwd(), "public/chat-images")));
    const host = process.env.API_HOST || "0.0.0.0";
    const port = process.env.API_PORT || 4000;
    const globalPrefix = process.env.API_PREFIX || "";
    await app.listen(port, host);
    common_1.Logger.log(`🚀 👧Application is running on: http://${host}:${port}/${globalPrefix}`);
    common_1.Logger.log(`📷 Serving chat images from: http://${host}:${port}/chat-images`);
}
bootstrap();

})();

var __webpack_export_target__ = exports;
for(var __webpack_i__ in __webpack_exports__) __webpack_export_target__[__webpack_i__] = __webpack_exports__[__webpack_i__];
if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ })()
;