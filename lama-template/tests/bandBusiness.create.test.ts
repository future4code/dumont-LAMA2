import { BandBusiness } from "../src/business/BandBusiness";
import { BandInputDTO } from "../src/business/entities/Band";
import { Authenticator } from "../src/business/services/Authenticator";
import { IdGenerator } from "../src/business/services/IdGenerator";

let idGenerator = { generate: jest.fn(() => "bigbrother") } as IdGenerator;
let authenticator = { generateToken: jest.fn((data: any) => 'token'), getData: jest.fn() } as Authenticator;
let bandDatase = {postBand: jest.fn() } as any;

const bandBusiness = new BandBusiness(
    idGenerator,
    bandDatase,
    authenticator
)

describe ('Post band into database', () => {
    test('Should return Unauthorized Error for role different than ADMIN',  async () => {
        expect.assertions(3)

        authenticator = { getData: jest.fn(() => {
            return { id: "mockId", role: "NORMAL"}
        })} as any

        
        const input: BandInputDTO = {
            name: "mockName",
            music_genre: "mockMusicGenre",
            responsible: "mockResponsible"
        }

    })
})