import { Request } from "express";
import { Show, ShowInputDTO } from "../business/entities/Show";
import { Authenticator } from "../business/services/Authenticator";
import { IdGenerator } from "../business/services/IdGenerator";
import { ShowBusiness } from "../business/showBusiness";
import { ShowDatabase } from "../data/ShowDatabase";


export class ShowController{
    async createShow(req: Request, res: Response){
        try {
            const week_day = Show.toWeekDayEnum(req.body.week_day)

            const input: ShowInputDTO = {
                week_day,
                band_id: req.body.band_id,
                start_time: req.body.start_time,
                end_time: req.body.end_time
            }

            const showBusiness = new ShowBusiness(
                new ShowDatabase,
                new BandDatabase,
                new IdGenerator,
                new Authenticator
            );

            await showBusiness.createShow(input, req.headers.authorization as string)

             res.status(200).send({message: "Show successfuly registered!"})

            
        } catch (error) {
            
        }
    }
}