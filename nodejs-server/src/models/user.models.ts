import { DataTypes, Model} from "sequelize";
import db from '../config/database.config';

export interface UserAttributes extends Model {
    idUsuario: number;
    nombre: string;
    contrasena: string;
    usuario: string;
    urlFoto: string;
    createdAt?: Date;
    updatedAt?: Date;
}

const User = db.define<UserAttributes>('usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contrasena: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    usuario: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    urlFoto: {
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