var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ws from "ws";
import { randomUUID } from "node:crypto";
/**
 * Scraped By Kaviaann
 * Protected By MIT LICENSE
 * Whoever caught removing wm will be sued
 * @description Any Request? Contact me : vielynian@gmail.com
 * @author Kaviaann 2024
 * @copyright https://whatsapp.com/channel/0029Vac0YNgAjPXNKPXCvE2e
 */
export function fluxGen(prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
            try {
                const delay = (ms) => {
                    return new Promise((res) => setTimeout(res, 5000));
                };
                const con = new ws("wss://ws-api.runware.ai/v1");
                const acc = {};
                const d_ = [];
                con.on("open", () => __awaiter(this, void 0, void 0, function* () {
                    con.on("message", (d, i) => {
                        const m = JSON.parse(Buffer.from(d).toString("utf8")).data[0];
                        m.taskType === "authentication" &&
                            (acc.uuid = m.connectionSessionUUID);
                        m.taskType === "imageInference" &&
                            d_.push({
                                isNSFW: m.NSFWContent,
                                imageURI: m.imageDataURI,
                                imageURL: m.imageURL,
                            });
                    });
                    // ? Init auth
                    con.send(JSON.stringify([
                        {
                            apiKey: "z1ilk4CqKMMMPSm3gynSdrsuoKsECcxK",
                            taskType: "authentication",
                        },
                    ]), (err) => {
                        if (err)
                            return reject(new Error("Fail to init authentication!"));
                    });
                    while (!acc.uuid)
                        yield delay(1000);
                    con.send(JSON.stringify([
                        {
                            taskType: "imageInference",
                            model: "runware:100@1",
                            positivePrompt: prompt,
                            height: 512,
                            width: 512,
                            numberResults: 2,
                            outputType: ["dataURI", "URL"],
                            outputFormat: "WEBP",
                            taskUUID: randomUUID(),
                        },
                    ]), (err) => {
                        if (err)
                            return reject(new Error("Fail to send image request"));
                    });
                    setTimeout(() => {
                        !d_.length &&
                            (() => {
                                return reject(new Error("Timeout making images!"));
                            })();
                    }, 15000);
                    while (!d_.length)
                        yield delay(2500);
                    return resolve({
                        prompt,
                        total: d_.length,
                        images: d_,
                    });
                }));
                return con;
            }
            catch (e) {
                return reject(e);
            }
        }));
    });
}
