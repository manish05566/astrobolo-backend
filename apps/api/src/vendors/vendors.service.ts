import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { VendorDto, UploadProfileDto } from "./dto/vendors.dto";
import moment = require("moment");
import { Vendor } from "@xapads/nest/models";
import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class VendorService {
  constructor(private configService: ConfigService) {}

  async listing(filters: {
    skip: number;
    limit: number;
    sort: string;
    ord: "asc" | "desc";
  }) {
    try {
      const { skip, limit, sort, ord } = filters;
      const whereCondition: any = {};

      whereCondition.is_active = true;

      const userList = await Vendor.findAll({
        offset: skip,
        limit,
        order: [[sort, ord]],
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active"],
        },
      });

      if (userList && userList.length > 0) {
        return AppResponse.success({
          message: AppResponse.messages.recordFound,
          data: userList,
        });
      } else {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: [],
        });
      }
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: [],
      });
    }
  }

  async show(id: string) {
    try {
      const whereCondition: any = {};
      const userId = await Vendor.findByPk(id);
      if (!userId) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }
      if (id) {
        whereCondition.id = id;
      }

      const userSpecific = await Vendor.findOne({
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      if (!userSpecific) {
        return AppResponse.failed({
          message: AppResponse.messages.recordNotFound,
          data: {},
        });
      }

      return AppResponse.success({
        message: AppResponse.messages.recordFound,
        data: userSpecific,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async update(id: string, updatedData: VendorDto) {
    console.log("jkjkjkjkjkjkjkjkj servicessss");
    try {
      const vendor = await Vendor.findByPk(id);

      if (!vendor) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }

      //console.log('jkjjkjkjk', updatedData); return false;
      await vendor.update(updatedData);
      const updatedUser = await Vendor.findByPk(vendor.id, {
        attributes: {
          exclude: ["createdAt", "updatedAt"],
        },
      });

      return AppResponse.success({
        message: AppResponse.messages.recordUpdated,
        data: updatedUser,
      });
    } catch (error) {
      return AppResponse.failed({
        message: error.message,
        data: {},
      });
    }
  }

  async uploadProfile(payload: { userid: string; file: Express.Multer.File }) {
    const { userid, file } = payload;

    console.log("fileeeee", file);
    const MAX_FILE_SIZE = 50 * 1024; // 50KB
    const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

    if (file.size > MAX_FILE_SIZE) {
      return AppResponse.failed({
        message: "File size should not exceed 50KB",
        data: [],
      });
    }

    const ext = path.extname(file.originalname).toLowerCase();
    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      return AppResponse.failed({
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

    const baseUrl = this.configService.get<string>("BASE_URL");
    const imageUrl = `${baseUrl}/uploads/vendor/${filename}`;

    await Vendor.update({ image: imageUrl }, { where: { id: userid } });

    return AppResponse.success({
      message: AppResponse.messages.recordUpdated,
      data: imageUrl,
    });
  }

  // Upload vendor documents

  async uploadDocuments(userid: string, files: Express.Multer.File[]) {
    const MAX_FILE_SIZE = 500 * 1024; // 50KB limit per file
    const ALLOWED_EXTENSIONS = [".jpg", ".jpeg", ".png"];

    const uploadsDir = path.join(process.cwd(), "uploads", "vendor");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const urls: string[] = [];

    for (const file of files) {
      const ext = path.extname(file.originalname).toLowerCase();

      if (file.size > MAX_FILE_SIZE) {
        return AppResponse.failed({
          message: "Each file must not exceed 500KB",
        });
      }

      if (!ALLOWED_EXTENSIONS.includes(ext)) {
        return AppResponse.failed({
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
      const baseUrl = this.configService.get<string>("BASE_URL");
      urls.push(`${baseUrl}/uploads/vendor/${filename}`);
    }

    // Assuming the `Vendor` model has two fields: documents1 and documents2
    await Vendor.update(
      {
        document1: urls[0], // Aadhar document
        document2: urls[1], // Pan Card document
      },
      { where: { id: userid } }
    );

    return AppResponse.success({
      message: "Documents uploaded successfully",
      data: { document1: urls[0], document2: urls[1] },
    });
  }

  // async astrologerListing() {
  //   console.log("herererre listing");
  //   try {
  //     const astrologerListing = await Vendor.findAll({
  //       attributes: {
  //         exclude: ["createdAt", "updatedAt"],
  //       },
  //     });

  //     if (!astrologerListing) {
  //       return AppResponse.failed({
  //         message: AppResponse.messages.recordNotFound,
  //         data: {},
  //       });
  //     }

  //     return AppResponse.success({
  //       message: AppResponse.messages.recordFound,
  //       data: astrologerListing,
  //     });
  //   } catch (error) {
  //     return AppResponse.failed({
  //       message: error.message,
  //       data: {},
  //     });
  //   }
  // }

  
}
