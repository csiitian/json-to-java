const TAB = "  ";

export const JsonFormatter = (jsonStr) => {
  // replace all new lines and space
  jsonStr = jsonStr.replaceAll("\n", "");
  jsonStr = jsonStr.replaceAll(" ", "");
  jsonStr = jsonStr.replaceAll(TAB, "");
  jsonStr = jsonStr.replaceAll("{", "{\n");
  jsonStr = jsonStr.replaceAll("[", "[\n");
  jsonStr = jsonStr.replaceAll("}", "\n}");
  jsonStr = jsonStr.replaceAll("]", "\n]");
  jsonStr = jsonStr.replaceAll(",", ",\n");
  jsonStr = jsonStr.replaceAll(":", ": ");
  return appendTab(jsonStr);
}

const appendTab = (jsonStr) => {
  let level = 0;
  let i = 0;
  let newJsonStr = "";
  let lineNo = 0;
  let errorMsg = "";
  while(i < jsonStr.length) {    
    lineNo++;
    if(jsonStr[i] === '\n') {
      // show error in the previous line
      errorMsg = errorMsg.concat("\n");
      errorMsg = errorMsg.concat("Error in line no. " + (lineNo-1) + ". Exception: ',' found instead ']' expected.");
      i++;
      continue;
    }
    // read the whole string till new line
    let line = "";
    let open = 0;
    let close = 0;
    while(i < jsonStr.length && jsonStr[i] !== '\n') {
      line = line.concat(jsonStr[i]);
      if(jsonStr[i] === '[' || jsonStr[i] === '{') open++;
      else if(jsonStr[i] === ']' || jsonStr[i] === '}') close++;
      i++;
    }
    newJsonStr = newJsonStr.concat(getTabStr(level-close));
    newJsonStr = newJsonStr.concat(line);
    if(i < jsonStr.length)
      newJsonStr = newJsonStr.concat(jsonStr[i++]);
    level += open - close;
  }
  return {newJsonStr, errorMsg};
}

const getTabStr = (level) => {
  let tabStr = "";
  for(let i=0;i<level;i++) tabStr = tabStr.concat(TAB);
  return tabStr;
}