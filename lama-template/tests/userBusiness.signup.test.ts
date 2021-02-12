import { Authenticator } from '../src/business/services/Authenticator';
import { IdGenerator } from '../src/business/services/IdGenerator'
import { UserBusiness } from '../src/business/UserBusiness'

let idGenerator = { generate: jest.fn(() => "bigbrother") } as IdGenerator;
let hashGenerator = { hash: jest.fn(async () => "senha cripto"), compare: jest.fn() } as any;
let userDatabase = { createUser: jest.fn() } as any;
let authenticator = { generateToken: jest.fn((data: any) => 'token'), getData: jest.fn() } as Authenticator;

let userBusiness = new UserBusiness(
    idGenerator,
    hashGenerator,
    authenticator,
    userDatabase
)

describe('Signup', () => {

    test('Should return an error', async () => {

        expect.assertions(2)

        try {

            const signupUser = {
                name: '',
                email: 'mike@gmail.com',
                password: "potato",
                role: "normal"
            }
            await userBusiness.createUser(
                signupUser
            )

            console.log()
        } catch (error) {
            expect(error.statusCode).toBe(422);
            expect(error.message).toEqual("Missing input");
        }
    })

    test('Should return token', async () => {


        const signupUser = {
            name: 'Mike',
            email: 'mike@gmail.com',
            password: "potato",
            role: "normal"
        }

        const token = await userBusiness.createUser(
            signupUser
        );

        expect(hashGenerator.hash).toHaveBeenCalled();
        expect(hashGenerator.hash).toHaveReturnedWith("senha cripto");
        expect(authenticator.generateToken).toHaveBeenCalled();
        expect(authenticator.generateToken).toHaveReturnedWith("token");
        expect(token).toEqual({ accessToken: "token" });
    })
})