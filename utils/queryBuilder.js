function buildSearch(params) {
  const technoConditions = [];
  const technoVals = [];
  let spiceCondition = "";
  let spiceVal = "";

  // check for number of selected technologies
  if (typeof params.techno_name === "string") {
    technoConditions.push("name =");
    technoVals.push(params.techno_name);
  }
  if (typeof params.techno_name === "object") {
    for (let el of params.techno_name) {
      technoConditions.push("name =");
      technoVals.push(el);
    }
  }

  // check for spiciness being additionally selected
  if (typeof params.spiciness !== "undefined") {
    spiceCondition += "spiciness = $1 AND ";
    spiceVal = params.spiciness;
  }

  // format conditions so they include necessary placeholders
  let formattedTechnoConditions;
  if (spiceCondition && technoConditions.length) {
    formattedTechnoConditions = technoConditions.map(
      (el, idx) => (el += ` $${idx + 2}`)
    );
  } else if (technoConditions.length) {
    formattedTechnoConditions = technoConditions.map(
      (el, idx) => (el += ` $${idx + 1}`)
    );
  }

  // return obj with condition strings and vals
  return {
    technoSearch: !formattedTechnoConditions
      ? ""
      : formattedTechnoConditions.length > 1
      ? formattedTechnoConditions.join(" OR ")
      : formattedTechnoConditions[0],
    technoVals,
    spiceCondition,
    spiceVal,
  };
}

module.exports = buildSearch;
