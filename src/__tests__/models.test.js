import * as Model from "../modules/models/model.js"
// const searchModel = require("../modules/models/model.js");

const searchModel = Model.searchModel;

it("search Model", () => 
    expect(searchModel()).toBe(undefined));