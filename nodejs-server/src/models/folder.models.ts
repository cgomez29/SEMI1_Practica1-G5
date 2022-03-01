import { DataTypes, Model} from 'sequelize';

import db from '../config/database.config';
import User from './user.models'

export interface FolderAttributes extends Model {   
    idFolder: number;
    nombre: string;
    usuario: number;
    createdAt?: Date;
    updatedAt?: Date;
};

const Folder = db.define<FolderAttributes>('folder', { 
    idFolder: {
       type: DataTypes.INTEGER,
       autoIncrement: true,
       primaryKey: true,
    },
    nombre: {
        type: DataTypes.STRING,
    },
    usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuario',
            key: 'idUsuario'
        }
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

//Folder.belongsTo(User, { foreignKey: 'idUsuario', as: 'usuario' });

export default Folder;