import { DataTypes, Model} from "sequelize";
import db from '../config/database.config';

export interface UserAttributes extends Model {
    id: number;
    username: string;
    password: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const User = db.define<UserAttributes>('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    createdAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updatedAt: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});


export default User;