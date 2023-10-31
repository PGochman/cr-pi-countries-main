const {createCountry, findCountry} = require("./utils/functions/countryFunctions")
const {country1, country2} = require("./utils/data/countryData")
const {createActivity, findActivity} = require("./utils/functions/activityFunctions")
const {activity3, activity4} = require("./utils/data/activityData")
const {getCountriesByActivityName, getActivitiesByCountryId} = require("./utils/functions/countryActivityFunctions")



describe("MODEL TEST", () => {

    describe("Country model", () => {
        
        describe("Create country", () => {
            it("Should create a country correctly", async() => {
                const response = await createCountry(country1)
                expect(response).toBe("Country created successfully")
            })

            it("should throw an error if not allowedNull categories are null", async() => {
                await createCountry({...country2, id: null}).then(() => {
                    throw Error("Country created with null id")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.id cannot be null")
                })

                await createCountry({...country2, name: null}).then(() => {
                    throw Error("Country created with null name")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.name cannot be null")
                })

                await createCountry({...country2, flag: null}).then(() => {
                    throw Error("Country created with null flag")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.flag cannot be null")
                })

                await createCountry({...country2, continent: null}).then(() => {
                    throw Error("Country created with null continent")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.continent cannot be null")
                })

                await createCountry({...country2, capital: null}).then(() => {
                    throw Error("Country created with null capital")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.capital cannot be null")
                })

                await createCountry({...country2, population: null}).then(() => {
                    throw Error("Country created with null population")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Country.population cannot be null")
                })
            })

            it("should not throw an error if allowedNull categories are null", async() => {
                const response = await createCountry({...country2, area: null, subregion: null})

                expect(response).toBe("Country created successfully")
            })

            it("should throw an error if trying to create an existing country", async() => {
                await createCountry(country1).catch((error) => expect(error.message).toBe("Country already exists"))
            })
        })

        describe("Find country", () => {
            it("should find a country when passing an existent id", async() => {
                const foundCountry = await findCountry(country1)

                expect(foundCountry.dataValues).toEqual(country1)
            })

            it("should return null if country is not found", async() => {
                const foundCountry = await findCountry({id: "cndis"})

                expect(foundCountry).toBeNull()
            })
        })
    })

    describe("Activity model", () => {
        describe("Create activity", () => {
            it("should create an activity when passed correct information", async() => {
                const response = await createActivity(activity3)

                expect(response).toBe("Activity created successfully")
            })

            it("shoul not create an activity if not allowedNull information is null", async() => {
                await createActivity({...activity4, name: null}).then(() => {
                    throw Error("Activity created with null name")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Activity.name cannot be null")
                })

                await createActivity({...activity4, difficulty: null}).then(() => {
                    throw Error("Activity created with null difficulty")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Activity.difficulty cannot be null")
                })

                await createActivity({...activity4, season: null}).then(() => {
                    throw Error("Activity created with null season")
                }).catch((error) => {
                    expect(error.message).toBe("notNull Violation: Activity.season cannot be null")
                })
            })

            it("should throw an error if trying to create an existing activity", async() => {
                await createActivity(activity3).then(() => {
                    throw Error("Created activity over existing one")
                }).catch((error) => expect(error.message).toBe("Activity already exists"))
            })
        })

        describe("Find activity", () => {
            it("should find an activity by its name", async() => {
                const foundActivity = (await findActivity(activity3)).dataValues

                for (let prop in foundActivity) {
                    if(prop == "id") continue
                    expect(foundActivity[prop]).toBe(activity3[prop])
                }
            })

            it("should return null if activity does not exist", async() => {
                const foundActivity = (await findActivity(activity4))

                expect(foundActivity).toBeNull()
            })
        })
    })

    describe("Relations model", () => {
        it("should return corresponding countries when sending activity name", async() => {
            const countries = await getCountriesByActivityName(activity3.name)

            expect(countries).toEqual(activity3.countries)
        })

        it("should return corresponding activities when sending country id", async() => {
            const activities = await getActivitiesByCountryId("arg")
                for(let act of activities){
                    for (let prop in act.dataValues){
                        if(prop == "id") continue
                        expect(activity3[prop]).toBe(act[prop])
                    }
                }
        })
    })
})