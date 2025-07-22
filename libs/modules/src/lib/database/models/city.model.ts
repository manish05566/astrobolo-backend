import { Column, Model, Table } from "sequelize-typescript";

@Table({ tableName: "cities", timestamps: false })
export class City extends Model {
  @Column
  name: string;

  @Column
  state_id: number; // Foreign key to State
}
