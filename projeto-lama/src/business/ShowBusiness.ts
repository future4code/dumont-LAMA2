import { ShowDatabase } from "../data/ShowDatabase";
import { ShowInputDTO } from "./entities/Show";
import { UserRole } from "./entities/User";
import { CustomError } from "./error/CustomError";
import { Authenticator } from "./services/Authenticator";
import { IdGenerator } from "./services/IdGenerator";

export class ShowBusiness{
    constructor(
        private showDatabase: ShowDatabase,
        private bandDatabase: BandDatabase,
        private idGenerator: IdGenerator,
        private authenticator: Authenticator
    ) { }

    async createShow(input: ShowInputDTO, token: string){
        const tokenData = this.authenticator.getData(token)
        if(tokenData.role !== UserRole.ADMIN){
            throw new CustomError(401, "Only admins can access this feature");
        }

        if(!input.band_id || !input.week_day || !input.start_time || !input.end_time){
            throw new CustomError(401, "Invalid input to createShow");
        }

        if(input.start_time < 8 || input.end_time > 23 || input.start_time >= input.end_time){
            throw new CustomError(401, "Invalid times to createShow");
        }

        if(!Number.isInteger(input.start_time) || !Number.isInteger(input.end_time)){
            throw new CustomError(401, "Times should be integer to createShow");  
        }

    }

}