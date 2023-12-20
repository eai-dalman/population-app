var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
/**
 * Fetches JSON data from the server.
 * @returns {Promise<any>} A promise that resolves to the JSON data.
 */
function getJSONData() {
    return __awaiter(this, void 0, void 0, function () {
        var baseURL, response, data, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    baseURL = window.location.origin;
                    return [4 /*yield*/, fetch("".concat(baseURL, "/data.json"))];
                case 1:
                    response = _a.sent();
                    if (!response.ok) {
                        throw new Error("HTTP error! Status: ".concat(response.status));
                    }
                    return [4 /*yield*/, response.json()];
                case 2:
                    data = _a.sent();
                    return [2 /*return*/, data];
                case 3:
                    err_1 = _a.sent();
                    console.error("Error fetching JSON:", err_1.message);
                    throw err_1;
                case 4: return [2 /*return*/];
            }
        });
    });
}
/**
 * Creates a card element based on the provided data.
 * @param {Object} cardData - The data used to create the card.
 * @param {Array<Object>} cardData.countries - An array of countries with count and name.
 * @param {string} cardData.gender - The gender associated with the card.
 * @param {string} cardData.primary_color - The primary color for styling.
 * @param {string} cardData.secondary_color - The secondary color for styling.
 * @param {number} cardData.total - The total count associated with the card.
 */
function createCard(_a) {
    var countries = _a.countries, gender = _a.gender, primary_color = _a.primary_color, secondary_color = _a.secondary_color, total = _a.total;
    var template = document.createElement("template");
    template.innerHTML = "\n    <div class=\"card-container\">\n      <h2 class=\"card-title\">".concat(total, "<span>").concat(gender, "</span></h2>\n\n      <div class=\"content-container\">\n        <span class=\"card-label\">By country</span>\n        <section class=\"small-cards-section\">\n          ").concat(countries
        .map(function (item) { return "\n              <div class=\"small-card-container\" style=\"background-color: ".concat(primary_color, ";\">\n                <div class=\"card-count\" style=\"background-color: ").concat(secondary_color, ";\">").concat(item.count, "</div>\n                <div class=\"card-country\">").concat(item.name, "</div>\n              </div>"); })
        .join(""), "\n        </section>\n      </div>\n    </div>");
    // Render
    var card = template.content.firstElementChild;
    var container = document.getElementById("cards-section");
    if (container) {
        container.appendChild(card);
    }
}
/**
 * Displays cards on the webpage by fetching data and creating cards.
 */
function displayCards() {
    return __awaiter(this, void 0, void 0, function () {
        var response, data, err_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, getJSONData()];
                case 1:
                    response = _a.sent();
                    data = response.populations;
                    data.map(function (item) { return createCard(item); });
                    return [3 /*break*/, 3];
                case 2:
                    err_2 = _a.sent();
                    console.error("Error in display cards:", err_2.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
// Initial call to display cards
displayCards();
