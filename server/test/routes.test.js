const server = require('../src/server');
const session = require('supertest');
const request = session(server)
const {activity1, activity2} = require("./utils/data/activityData")

describe("ROUTING TEST", () => {

    describe("GET /countries", () => {
        it("Should return all countries", async() => {
            const response = await request.get("/countries")
            expect(response.body).toHaveLength(250)
        })
    })

    describe("GET /countries/:id", () => {
        it("Should return country detail", async() => {
            const response = await request.get("/countries/KEN")
            const propertys = ["id", "name", "flag", "continent", "capital", "area", "population"]
            
            propertys.forEach((property) => {
                expect(response.body).toHaveProperty(property)
            })
        })

        it("Respondes with an error if necessary", async() => {
            const response = await request.get("/countries/bdus")
            expect(response.status).toBe(500)
        })
    })

    describe("GET /countries/name", () => {
        it("Should return all countries whose names match with the passed query", async() => {
            const queryName = "as"
            const response = await request.get(`/countries/name?name=${queryName}`)
            response.body.forEach((country) => {
                expect(country.name).toMatch(new RegExp(queryName, "i"))
            })
        })

        it("Respondes with an error if necessary", async() => {
            const response = await request.get("/countries/bdus")
            expect(response.status).toBe(500)
        })
    })

    describe("GET /activities", () => {
        it("Should return all activities", async() => {
            const response = await request.get("/activities")
            expect(response.body).toHaveLength(3)
        })

        it("Each activity has to have the propertys: 'id', 'name', 'difficulty', 'season', 'countries'", async() => {
            const response = await request.get("/activities")
            const propertys = ["id", "name", "difficulty", "season", "countries"]

            response.body.forEach((country) => {
                propertys.forEach((property) => {
                    expect(country).toHaveProperty(property)
                })
            })
            
        })
    })

    describe("POST /activities", () => {
        it("Should create an activity correctly", async() => {
            const response = await request.post("/activities").send(activity1)

            expect(response.text).toBe("Activity created successfully")
        })

        it("Should save activities created", async() => {
            await request.post("/activities").send(activity2)
            response = await request.get("/activities")
            expect(response.body).toHaveLength(5)
        })

        it("Should return an error when trying to create an activity that already exists", async() => {
            const response = await request.post("/activities").send(activity1)

            expect(response.status).toBe(500)
            expect(response.body.message).toBe("Activity already exists, try with a new one")
        })

        it("Should return an error when passing an invalid activity", async() => {
            const badActivity = {notName: "cndios", notSeason: "cndusi"}

            const response = await request.post("/activities").send(badActivity)

            expect(response.status).toBe(500)
        })
    })
})

