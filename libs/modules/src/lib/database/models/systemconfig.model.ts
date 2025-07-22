import { Column, Table, DataType } from "sequelize-typescript";
import { BaseModel } from "./base.model";

@Table({ tableName: "systemconfig" })
export class SystemConfig extends BaseModel {
  @Column({
    type: DataType.STRING(50),
  })
  feature: string;

  @Column({
    type: DataType.STRING(50),
  })
  sub_feature: string;

  @Column(DataType.JSON) // ✅ use JSON for MySQL
  value: Record<string, any>;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: 0, // ✅ 0 instead of false
  })
  is_active: boolean;
}
