const buildSearch = require("../utils/queryBuilder");

describe("queryBuilder Testing Suite", () => {
  describe("buildSearch function", () => {
    it("should return an object", () => {
      const params = { spiciness: "hot" };
      expect(typeof buildSearch(params)).toBe("object");
    });
    it("should return a prop technoVals with a length corresponding to the num of input vals", () => {
      const params = { techno_name: ["css", "html"] };
      expect(buildSearch(params).technoVals.length).toBe(2);
    });
    it("should return a prop spiceVal which is of type str", () => {
      const params = { spiciness: "mild" };
      expect(typeof buildSearch(params).spiceVal).toBe("string");
    });
    it("should return a prop spiceCondition in the correct format", () => {
      const params = { spiciness: "medium", techno_name: "bootstrap" };
      const format = "spiciness = $1 AND ";
      expect(buildSearch(params).spiceCondition).toBe(format);
    });
    it("should return a prop technoSearch in the correct format with 1 val for techno_name", () => {
      const params = { techno_name: "bootstrap" };
      const format = "name = $1";
      expect(buildSearch(params).technoSearch).toBe(format);
    });
    it("should return a prop technoSearch in the correct format with 2 vals for techno_name", () => {
      const params = { techno_name: ["node", "express"] };
      const format = "name = $1 OR name = $2";
      expect(buildSearch(params).technoSearch).toBe(format);
    });
    it("should return correctly incremented placeholder nums if additional spiciness is present", () => {
      const params = {
        spiciness: "hot",
        techno_name: ["sql", "react", "javascript"],
      };
      format = "name = $2 OR name = $3 OR name = $4";
      expect(buildSearch(params).technoSearch).toBe(format);
    });
  });
});
