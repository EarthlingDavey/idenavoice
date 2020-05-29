const { toUtf8, fromUtf8, isValidAddress } = require('ethereumjs-util');
var JSONParse = require('json-parse-safe');

function isValidTxHash(hash) {
  return /^0x([A-Fa-f0-9]{64})$/.test(hash);
}

const chooseActionPrefix = 'JSON-LD:ChooseAction:';
const chooseActionHex = fromUtf8(chooseActionPrefix);

function isChooseAction(payload) {
  return payload.startsWith(chooseActionHex);
}

async function parseChooseAction(payload) {
  var str = toUtf8(payload);
  // console.log(str);

  var json = str.slice(chooseActionPrefix.length);
  console.log(json);

  var obj = JSONParse(json);
  if (obj.error) {
    return;
  }
  console.log(obj);
  // return;

  const { actionOption, object } = obj.value;

  if (
    !actionOption ||
    actionOption['@type'] !== 'Answer' ||
    !actionOption.parentItem ||
    !isValidTxHash(actionOption.parentItem)
  ) {
    return;
  }

  if (!object || object['@type'] !== 'Answer' || !object.text) {
    return;
  }

  const chooseAction = {
    parentHash: actionOption.parentItem,
    answer: object.text,
  };

  // console.log(chooseAction);
  // return;

  return chooseAction;
}

module.exports = {
  isChooseAction,
  parseChooseAction,
};
