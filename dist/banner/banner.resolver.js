"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BannerResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const banner_service_1 = require("./banner.service");
const banner_entity_1 = require("./entity/banner.entity");
let BannerResolver = class BannerResolver {
    constructor(bannerService) {
        this.bannerService = bannerService;
    }
    findAll() {
        return this.bannerService.findAll();
    }
};
exports.BannerResolver = BannerResolver;
__decorate([
    (0, graphql_1.Query)(() => [banner_entity_1.Banner], { name: "getAllBanners" }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BannerResolver.prototype, "findAll", null);
exports.BannerResolver = BannerResolver = __decorate([
    (0, graphql_1.Resolver)(() => banner_entity_1.Banner),
    __metadata("design:paramtypes", [banner_service_1.BannerService])
], BannerResolver);
//# sourceMappingURL=banner.resolver.js.map