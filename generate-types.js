const { generateApi } = require("swagger-typescript-api");
const path = require("path");

const PATH = path.resolve(process.cwd(), "./src/types/domain");
const SWAGGERS = Object.entries({
    "https://api.airqua.uk/openapi/v1.yml": "public.ts",
    "https://airqua.uk/api/swagger/openapi.yml": "private.ts",
});

(async () => {
    for (const [url, name] of SWAGGERS) {
        await generateApi({
            name,
            url,
            output: PATH,
            generateClient: false,
            generateUnionEnums: true,
            httpClientType: 'axios',
        })
    }
})();