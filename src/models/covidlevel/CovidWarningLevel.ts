import {DataTypes, Model} from "sequelize";

import {sequelize} from "../index";


interface CovidLevelAttributes {
    // id: number || null;
    level: number,
    name: string,
    countyId?: number,
    country: string,
    createdAt? : Date,
    updatedAt? : Date,
}


export class CovidWarningLevel extends Model<CovidLevelAttributes> {
    public level!: number;
    public level_name!: string;
    public name?: number;
    public country!: string;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
}

CovidWarningLevel.init(
    {
        level: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        name: {
            field:"level_name",
            type: DataTypes.STRING(45),
        },
        countyId: {
            field:"county_id",
            type: DataTypes.BIGINT,
            allowNull: true
        },
        country: {
            type: DataTypes.STRING(100),
        },
        createdAt:{
            field:"created_at",
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
            allowNull: false
        },
        updatedAt:{
            field:"updated_at",
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        modelName: "covid_warning_level",
        tableName: "covid_warning_level",
        timestamps:false,
        createdAt: false,
        updatedAt: false,
        sequelize,
    }
)

