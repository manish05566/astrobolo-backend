import { Repository } from "typeorm";
import { Banner } from "./entity/banner.entity";
export declare class BannerService {
    private bannerRepository;
    constructor(bannerRepository: Repository<Banner>);
    findAll(): Promise<Banner[]>;
}
