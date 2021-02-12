import { Show, ShowOutputDTO, WeekDay } from "../business/entities/Show";
import { CustomError } from "../business/error/CustomError";
import { BaseDatabase } from "../data/BaseDatabase";

export class ShowDatabase extends BaseDatabase {
  private static TABLE_NAME = "lama_show";

  public async createShow(show: Show): Promise<void> {
    try {
      await BaseDatabase.connection
        .insert({
          id: show.id,
          week_day: show.week_day,
          start_time: show.start_time,
          end_time: show.end_time,
          band_id: show.band_id,
        })
        .into(ShowDatabase.TABLE_NAME);
    } catch (error) {
      throw new CustomError(500, "An unexpected error ocurred");
    }
  }

//   public async getShowsByTimes(
//     week_day: WeekDay,
//     start_time: number,
//     end_time: number
//   ): Promise<ShowOutputDTO> {
//     const shows = await BaseDatabase.connection.raw
//     {
//         `
//         SELECT show.id as id,
//                 show.start_time as start_time,
//                 show.end_time as end_time,
//                 show.week_day as week_day
//         FROM ${ShowDatabase.TABLE_NAME} show 
//         WHERE show.week_day = "${week_day}"
//         AND WHERE show.start_time <= "${end_time}"
//         AND WHERE show.end_time >= "${start_time}"
//         ORDER BY start_time ASC
//         `
//     }

//     return shows.map((show: any)=>{
//         return {
//             id: show.id,
//             band_id: show.band_id,
//             start_time: show.start_time,
//             end_time: show.end_time,
//             week_day: show.week_day

//         }
//     })
//   }
}
