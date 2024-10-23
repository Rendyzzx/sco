import os from "os";
import changeCase from "change-case";
import { XmlEntities } from "html-entities";

const log = console.log.bind(console);
const DELIMITER = ":";
const htmlEntities = new XmlEntities();

const stripHTMLEntities = (e) => {
  return htmlEntities.decode(e);
};

const getCommonDelimiterForm = (e, t) => {
  const i = new RegExp(t + "\\S+", "g");
  const n = new RegExp(t + " ", "g");
  const r = e.match(i) || [];
  const a = e.match(n) || [];
  return r.length > a.length ? t : t + " ";
};

const parseRawData = (e) => {
  const t = {};
  let data = stripHTMLEntities(e);
  data = data.replace(/:\s*\r\n/g, ": ");
  const i = data.split("\n");
  const n = getCommonDelimiterForm(data, ":");

  i.forEach((line) => {
    if ((line = line.trim()) && line.includes(n)) {
      const parts = line.split(":");
      if (parts.length >= 2) {
        const key = changeCase.camelCase(parts[0]);
        const value = parts.splice(1).join(":").trim();
        if (key in t) {
          t[key] = `${t[key]} ${value}`;
        } else {
          t[key] = value;
        }
      }
    }
  });

  return t;
};

export default parseRawData;