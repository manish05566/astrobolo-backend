import { Column, Model, Table, DataType } from "sequelize-typescript";

@Table({ tableName: "countries", timestamps: false })
export class Country extends Model<Country> {
  @Column({ type: DataType.STRING })
  name: string;

  // Add more fields if your table has them
}
