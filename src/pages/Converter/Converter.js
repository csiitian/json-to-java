import React, { useState } from 'react';
import "./Converter.css";
import { JsonParser } from '../../utils/JsonParser';
import { JsonFormatter } from '../../utils/JsonFormatter';
import { JsonConvertor } from '../../utils/JsonConverter';

function Converter() {

  const sourcePlaceHolder = "{\n" +
    "  \"id\" : 1,\n" +
    "  \"name\" : \"John Doe\",\n" +
    "  \"age\" : 30,\n" +
    "  \"city\" : \"New York\",\n" +
    "  \"isStudent\" : false,\n" +
    "  \"grades\" : [90, 85, 92],\n" +
    "  \"isActive\" : true\n" +
    "}";

  const [sourceText, setSourceText] = useState(sourcePlaceHolder);
  const [targetText, setTargetText] = useState(JsonConvertor(sourceText));
  const [jsonFormatError, setJsonFormatError] = useState("");
  const [validJson, setValidJson] = useState(true);

  const handleSourceText = (e) => {
    setSourceText(e.target.value);
    const validJson = JsonParser(e.target.value);
    if (validJson) {
      console.log("Valid Json");
      setValidJson(true);
    } else {
      console.log("InValid Json");
      setValidJson(false);
    }
  }

  const handleTargetText = (e) => {
    setTargetText(e.target.value);
  }

  const handleFormat = () => {
    const { newJsonStr, errorMsg } = JsonFormatter(sourceText);
    console.log(errorMsg);
    setJsonFormatError(errorMsg);
    setSourceText(newJsonStr);
  }

  const handleConvert = () => {
    const javaClassStr = JsonConvertor(sourceText);
    setTargetText(javaClassStr);
  }

  return (
    <div className="ConverterRoot">
      <div className="ConverterHeader">
        <text className="ConverterHeaderText">JSON to Java Class Converter</text>
      </div>
      <div className="Converter">
        <div className="ConverterSource">
          <textarea className={jsonFormatError.length === 0 ? "ConverterSourceText" : "ConverterSourceTextError"}
            placeholder="Enter Json String"
            value={sourceText}
            onChange={handleSourceText} />
        </div>
        <div className="ConverterButtonRoot">
          <button className="ConverterButton" onClick={handleFormat}>Format</button>
          <button className="ConverterButton" onClick={handleConvert}>Convert</button>
        </div>
        <div className="ConverterTarget">
          <textarea className="ConverterTargetText"
            placeholder=""
            value={targetText}
            onChange={handleTargetText}
            disabled />
        </div>
      </div>
      {!validJson ?
        <div className="ConverterValidJson">
          <pre className="ConverterValidJsonText">Invalid Json Format</pre>
        </div> : null}
      <div className="ConverterError">
        <pre className="ConverterErrorText">{jsonFormatError}</pre>
      </div>
    </div>
  );
}

export default Converter;