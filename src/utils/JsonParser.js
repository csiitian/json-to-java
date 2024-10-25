const checkBrackets = (jsonStr) => {
  const stack = [];
  const bracketMapping = new Map();
  let validJson = true;

  for (let i = 0; i < jsonStr.length; i++) {
    const x = jsonStr[i];

    if (x === '{' || x === '[') {
      stack.push(i);
    } else if (x === '}' || x === ']') {
      if (stack.empty) {
        validJson = false;
        bracketMapping.set(i, -2);
        break;
      }
      const popIndex = stack.pop();
      const pop = jsonStr[popIndex];
      if (pop !== oppositeBracket(x)) {
        bracketMapping.set(popIndex, -1);
        validJson = false;
        break;
      } else {
        bracketMapping.set(popIndex, i);
      }
    }
  }
  validJson = validJson && stack.length === 0;

  stack.forEach(element => {
    bracketMapping.set(element, -1);
  });

  return { validJson, bracketMapping };
}

export const JsonParser = (jsonStr) => {
  const { validJson, bracketMapping } = checkBrackets(jsonStr);
  return validJson;
}

function oppositeBracket(bracket) {
  if (bracket === '{') return "}";
  if (bracket === '}') return "{";
  if (bracket === '[') return "]";
  if (bracket === ']') return "[";
  return "";
}

// Just testing bro !!!

let jsonStr = "{{\n" +
  "  \"id\" : 1,\n" +
  "  \"name\" : \"John Doe\",\n" +
  "  \"age\" : 30,\n" +
  "  \"city\" : \"New York\",\n" +
  "  \"isStudent\" : false,\n" +
  "  \"grades\" : [90, 85, 92],\n" +
  "  \"isActive\" : true\n" +
  "}}";

JsonParser(jsonStr);