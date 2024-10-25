export const JsonConvertor = (jsonStr) => {
  try {
    const jsonObj = JSON.parse(jsonStr);
    const className = "MyClass"; // Replace with desired class name
    let classStr = `public class ${className} {\n`;
    let getterSetterStr = "";

    for (const key in jsonObj) {
      const value = jsonObj[key];
      const valueType = typeof value;
      let javaType;

      if (valueType === "string") {
        javaType = "String";
      } else if (valueType === "number") {
        javaType = Number.isInteger(value) ? "int" : "double";
      } else if (valueType === "boolean") {
        javaType = "boolean";
      } else if (valueType === "object") {
        javaType = "Object"; // Replace with appropriate class name for nested objects
      } else {
        javaType = "Object";
      }

      classStr += `  private ${javaType} ${key};\n`;

      // Generate getter and setter methods
      getterSetterStr += `\n  public ${javaType} get${key.charAt(0).toUpperCase() + key.slice(1)}() {\n`;
      getterSetterStr += `    return ${key};\n`;
      getterSetterStr += `  }\n\n`;
      getterSetterStr += `  public void set${key.charAt(0).toUpperCase() + key.slice(1)}(${javaType} ${key}) {\n`;
      getterSetterStr += `    this.${key} = ${key};\n`;
      getterSetterStr += `  }\n`;
    }

    classStr += getterSetterStr;
    classStr += `}`;

    return classStr;
  } catch (error) {
    console.error("Invalid JSON string:", error);
    return null;
  }
};