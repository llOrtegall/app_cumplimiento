import { Model, DataTypes, Optional } from 'sequelize';
import db_connection from '../connection';

interface ClienteAttributes {
  FECHACARGA: Date;
  TIPODOCUMENTO: string;
  DOCUMENTO: string;
  NOMBRES: string;
  FECHANACIMIENTO: Date;
  CATEGORIA: string | null;
  DIRECCION: string;
  TIPOZONA: string | null;
  TELEFONO1: string;
  TELEFONO2: string;
  EMAIL: string;
  PEP: string;
  VERSION: string;
}

type ClienteCreationAttributes = Optional<ClienteAttributes, 'FECHACARGA' | 'DOCUMENTO'>;

class Client extends Model<ClienteAttributes, ClienteCreationAttributes> {
  declare FECHACARGA: Date;
  declare TIPODOCUMENTO: string;
  declare DOCUMENTO: string;
  declare NOMBRES: string;
  declare FECHANACIMIENTO: Date;
  declare CATEGORIA: string;
  declare DIRECCION: string;
  declare TIPOZONA: string;
  declare TELEFONO1: string;
  declare TELEFONO2: string;
  declare EMAIL: string;
  declare PEP: string;
  declare VERSION: string;
}

Client.init({
  FECHACARGA: { type: DataTypes.DATE, allowNull: false },
  TIPODOCUMENTO: { type: DataTypes.STRING, allowNull: false },
  DOCUMENTO: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
  NOMBRES: { type: DataTypes.STRING, allowNull: false },
  FECHANACIMIENTO: { type: DataTypes.DATE, allowNull: false },
  CATEGORIA: { type: DataTypes.STRING, allowNull: false },
  DIRECCION: { type: DataTypes.STRING, allowNull: false },
  TIPOZONA: { type: DataTypes.STRING, allowNull: false },
  TELEFONO1: { type: DataTypes.STRING, allowNull: false },
  TELEFONO2: { type: DataTypes.STRING, allowNull: false },
  EMAIL: { type: DataTypes.STRING, allowNull: false },
  PEP: { type: DataTypes.STRING, allowNull: false },
  VERSION: { type: DataTypes.STRING, allowNull: false }
}, {
  sequelize: db_connection,
  tableName: 'TERCEROSCUMPLIMIENTO',
  timestamps: false
})

export default Client;