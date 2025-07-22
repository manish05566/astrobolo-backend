import { IsBoolean, IsNotEmpty, IsString,IsOptional } from "class-validator";
import { Transform } from 'class-transformer';


export class CreateConfigurationDto {

    @IsString()
    @IsNotEmpty()
    feature: string;

    @IsString()
    @IsNotEmpty()
    sub_feature: string;

   
    @IsNotEmpty()
    value: JSON;

}

export class UpdateDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsNotEmpty()
    feature: string;

    @IsString()
    @IsNotEmpty()
    sub_feature: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    app: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    platform: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    country: string;

    @IsNotEmpty()
    value: JSON;

}

export class CustomConfigurationDto {

    @IsString()
    feature: string;

    @IsString()
    sub_feature: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    app: string;

    @IsString()
    @IsNotEmpty()
    @Transform(({ value }) => value.toUpperCase())
    platform: string;

    @IsString()
    @IsOptional()
    @Transform(({ value }) => value.toUpperCase())
    country: string;

}

export class UpdatePermissionDto {

    @IsString()
    @IsNotEmpty()
    id: string;

    @IsNotEmpty()
    @IsBoolean()
    status: boolean;

}

