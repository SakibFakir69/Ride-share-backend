"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("@/lib/axios");
const axiosBaseQuery = ({ baseUrl } = { baseUrl: "" }) => (_a) => __awaiter(void 0, [_a], void 0, function* ({ url, method, data, params, headers }) {
    var _b, _c;
    try {
        const result = yield (0, axios_1.axiosInstance)({
            url: url,
            method,
            data,
            params,
            headers,
        });
        return { data: result.data };
    }
    catch (axiosError) {
        const err = axiosError;
        return {
            error: {
                status: (_b = err.response) === null || _b === void 0 ? void 0 : _b.status,
                data: ((_c = err.response) === null || _c === void 0 ? void 0 : _c.data) || err.message,
            },
        };
    }
});
exports.default = axiosBaseQuery;
