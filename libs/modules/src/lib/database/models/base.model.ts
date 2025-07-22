import {
  AllowNull,
  Column,
  CreatedAt,
  DataType,
  DeletedAt,
  Model,
  PrimaryKey,
  UpdatedAt,
} from 'sequelize-typescript';

export class BaseModel extends Model {
  @PrimaryKey
  @Column({
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  id: string;

  @CreatedAt
  @Column({ field: 'createdAt' })
  override createdAt: Date;

  @UpdatedAt
  @Column({ field: 'updatedAt' })
  override updatedAt: Date;

}
