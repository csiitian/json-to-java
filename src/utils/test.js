import { JsonParser } from "./JsonParser";

let jsonStr = "{\n" +
"  \"id\" : 1,\n" +
"  \"name\" : \"John Doe\",\n" +
"  \"age\" : 30,\n" +
"  \"city\" : \"New York\",\n" +
"  \"isStudent\" : false,\n" +
"  \"grades\" : [90, 85, 92],\n" +
"  \"isActive\" : true\n" +
"}";

JsonParser(jsonStr)