async function tryOverrideCache() {
    // Try Cirrus Runners's Chacha zone-local cache servers first
    const chachaURL = "http://chacha.us.cirrus-cache.download:8080/";

    if (chachaURL) {
        console.log("Chacha URL found, proceeding...");

        const tokenRequestURL = process.env["ACTIONS_ID_TOKEN_REQUEST_URL"];
        const tokenRequestToken = process.env["ACTIONS_ID_TOKEN_REQUEST_TOKEN"];

        if (!tokenRequestURL || !tokenRequestToken) {
            console.log("Cirrus Runners's Chacha zone-local cache servers are available, "+
                "but seems like no \"id-token: write\" permission is configured, "+
                "falling back to Cirrus Runners regional servers...");
        }

        const resp = await fetch(tokenRequestURL, {
            method: "GET",
            headers: {
                "Authorization": "Bearer " + tokenRequestToken,
            }
        });

        const token = await resp.json();

        process.env["ACTIONS_CACHE_URL"] = chachaURL;
        process.env["ACTIONS_RUNTIME_TOKEN"] = token.value;

        console.log("Environment variables are set!");

        return
    }

    // Fall back to Cirrus Runners regional-local cache servers
    console.log("Falling back to Cirrus Runners regional-local cache servers...");

    const httpCacheHost = process.env["CIRRUS_HTTP_CACHE_HOST"];

    if (httpCacheHost) {
        const newActionsCacheURL = "http://" + httpCacheHost + "/";

        console.log("Redefining the ACTIONS_CACHE_URL to " + newActionsCacheURL + " to make the cache faster...");

        process.env["ACTIONS_CACHE_URL"] = newActionsCacheURL;
    }

    // Do not change anything, thus falling back to GitHub-provided cache servers
}

await tryOverrideCache();

import("./index.js")
