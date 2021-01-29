function buildSearch(params) {
  const technoConditions = [];
  const technoVals = [];
  let spiceCondition = "";
  let spiceVal = "";

  // check for technologies
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

  // check for spiciness
  if (typeof params.spiciness !== "undefined") {
    if (!params.techno_name) {
      spiceCondition += "spiciness = $1";
    } else {
      spiceCondition += "spiciness = $1 AND";
    }
    spiceVal = params.spiciness;
  }

  // format both conditions so they include necessary placeholders
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

let query = buildSearch({ techno_name: ["css", "html"], spiciness: "hot" });
console.log(query.technoSearch);
