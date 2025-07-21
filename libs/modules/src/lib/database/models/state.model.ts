import { Column, Model, Table } from "sequelize-typescript";

@Table({
  tableName: "states",
  timestamps: false, // ⛔ disables createdAt/updatedAt expectation
})
export class State extends Model {
  @Column
  name: string;

  @Column
  country_id: number; // Foreign key to Country
}
