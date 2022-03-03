import { DataTypes, Model } from 'sequelize';

import db from '../config/database.config';
import Folder from './folder.models'
export interface PhotoAttributes extends Model {
    idFoto: number;
    urlFoto: string;
    nombre: string;
    folder: number;
    createdAt?: Date;
    updatedAt?: Date;
};  

const Photo = db.define<PhotoAttributes>('foto', {
    idFoto: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    urlFoto: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    folder: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'folder',
            key: 'folder',
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

Photo.belongsTo(Folder, { foreignKey: 'folder', as: 'album' });

export default Photo;