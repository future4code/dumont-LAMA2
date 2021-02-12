import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { Show, ShowInputDTO } from "../business/entities/Show";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowBusiness } from "../business/ShowBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { ShowDatabase } from "../data/ShowDatabase";


export class ShowController {
  constructor(
    private showBusiness: ShowBusiness) {}

  public createShow = async (req: Request, res: Response): Promise<void> => {
    try {
      const week_day = Show.toWeekDayEnum(req.body.week_day);
      const input: ShowInputDTO ={
        band_id: req.body.band_id,
        week_day,
        start_time: req.body.start_time,
        end_time: req.body.end_time
      }

      const token = req.headers.authorization as string;

      await this.showBusiness.createShow(input, token)

      res.status(200).send({message: "Show created!"})

    } catch (error) {
     res.status(error.statusCode || 400).send(error.message);
    
      
    }

  }
}
