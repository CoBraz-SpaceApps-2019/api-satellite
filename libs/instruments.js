const { promisify } = require('util')
const xml = require("xml2js");
const request = promisify(require("request"))

const dayjs = require('dayjs')
const satellite = require("satellite.js")
const findInObject = require('find-in-object')

const getAll = async () => {
  const { body: { Observatory } } = await request({ method: "GET", url: "https://sscweb.gsfc.nasa.gov/WS/sscr/2/observatories", headers: { Accept: 'application/json' }, json: true })
  return Observatory[1].filter(instrument => instrument.ResourceId).map(each => {
    return {
      id: each.Id,
      res_id: each.ResourceId,
      name: each.Name,
      resolution: each.Resolution,
      start_time: dayjs(each.StartTime[1]).format('MM/DD/YYYY'),
      end_time: dayjs(each.EndTime[1]).format('MM/DD/YYYY')
    };
  });
};

const findOne = async resId => {
  const options = {
    method: "GET",
    url: "https://vspo.gsfc.nasa.gov/websearch/dispatcher",
    qs: {
      action: "GET_SPASE_XML_ACTION",
      resId
    }
  };
  const { body } = await request(options)

  return await xml.parseStringPromise(body, { explicitArray: false, normalizeTags: true, ignoreAttrs: true })
}

module.exports = {
  getAll,
  findOne
}
