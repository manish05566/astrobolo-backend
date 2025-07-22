import { Injectable } from "@nestjs/common";
import { diskStorage } from "multer";
import * as fs from "fs";
import * as path from "path";
import { UserDto, UploadProfileDto } from "./dto/users.dto";
import moment = require("moment");
import { User } from "@xapads/nest/models";
import { AppResponse, checkHash, toHash } from "@xapads/nest/utils";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class UserService {
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

      const userList = await User.findAll({
        offset: skip,
        limit,
        order: [[sort, ord]],
        where: whereCondition,
        attributes: {
          exclude: ["createdAt", "updatedAt", "is_active", "position"],
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
      const userId = await User.findByPk(id);
      if (!userId) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }
      if (id) {
        whereCondition.id = id;
      }

      const userSpecific = await User.findOne({
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


  async findById(id: string) {
  // returns the raw User instance (or null)
  return User.findByPk(id, {
    attributes: ["id", "first_name", "gender", "birth_date", "birth_time", "birth_place", "marital_status", "mobile", "email", "city", "state", "country","image"],   // fetch only what you need
  });
}


  async update(id: string, updatedData: UserDto) {
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return AppResponse.failed({
          message: AppResponse.messages.idNotFound,
          data: {},
        });
      }

      //console.log('jkjjkjkjk', updatedData); return false;
      await user.update(updatedData);
      const updatedUser = await User.findByPk(user.id, {
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

    console.log('fileeeee', file);
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

    const uploadsDir = path.join(process.cwd(), "uploads", "profile");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }

    const filename = `user-${Date.now()}${ext}`;
    const filepath = path.join(uploadsDir, filename);
    fs.writeFileSync(filepath, file.buffer);

    const baseUrl = this.configService.get<string>("BASE_URL");
    const imageUrl = `${baseUrl}/uploads/profile/${filename}`;

    await User.update({ image: imageUrl }, { where: { id: userid } });

    return AppResponse.success({
      message: AppResponse.messages.recordUpdated,
      data: imageUrl,
    });
  }
}
