"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * This function converts SNAKE_CASE strings to lowerCamelCase
 *
 * @export
 * @param {string} SNAKE_CASE the input string
 * @returns {string} lowerCamelCase of input
 */
function convertoCamelCase(SNAKE_CASE) {
    if (SNAKE_CASE.match(/_\w/g) !== null) {
        return SNAKE_CASE.toLowerCase().replace(/_\w/g, (m) => m[1].toUpperCase());
    }
    return SNAKE_CASE;
}
exports.convertoCamelCase = convertoCamelCase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vc3JjL3V0aWxzL3N0cmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOzs7Ozs7R0FNRztBQUNILDJCQUFrQyxVQUFrQjtJQUNsRCxJQUFJLFVBQVUsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3JDLE9BQU8sVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzVFO0lBQ0QsT0FBTyxVQUFVLENBQUM7QUFDcEIsQ0FBQztBQUxELDhDQUtDIn0=