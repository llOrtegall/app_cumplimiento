import { Request, Response } from 'express';
import PowerBi from '../connection';

export const getInfo = async (req: Request, res: Response) => {
  try {
    const [result1] = await PowerBi.query(`
      SELECT FECHAPAGO, 
      case ZONA
      when '39627' then 'Multired'
      when '39628' then 'Servired'
      else 'null' end AS EMPRESA, 
      COUNT(CASE WHEN PREMIO < 15*47065 THEN 1 END) AS menores_15UVT,
      COUNT(CASE WHEN PREMIO between 15*47065 and 48*47065 THEN 1 END) AS entre_15a48UVT,
      COUNT(CASE WHEN PREMIO > 48*47065 THEN 1 END) AS Mayores_48UVT
      FROM DETALLEPREMIOSCMP
      WHERE FECHAPAGO=CURDATE()
      GROUP BY FECHAPAGO,ZONA`
    );

    const [result2] = await PowerBi.query(`
      SELECT FECHAPAGO, case ZONA
      when '39627' then 'Multired'
      when '39628' then 'Servired'
      else 'null' end AS EMPRESA, 
      TIPOPREMIO, 
      count(1) CANT 
      FROM DETALLEPREMIOSCMP
      WHERE FECHAPAGO=CURDATE()
      GROUP BY FECHAPAGO,ZONA,TIPOPREMIO;`
    );

    res.status(200).json({ result1, result2 });
  } catch (error) {
    console.log(error);
    res.status(500).json('Internal server error');
  }
}
