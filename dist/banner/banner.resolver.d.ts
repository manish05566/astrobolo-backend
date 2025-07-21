import { BannerService } from "./banner.service";
import { Banner } from "./entity/banner.entity";
export declare class BannerResolver {
    private bannerService;
    constructor(bannerService: BannerService);
    findAll(): Promise<Banner[]>;
}
