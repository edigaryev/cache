const httpCacheHost = process.env["CIRRUS_HTTP_CACHE_HOST"];

if (httpCacheHost) {
    const newActionsCacheURL = "http://" + httpCacheHost + "/";

    console.log("Redefining the ACTIONS_CACHE_URL to " + ${newActionsCacheURL} + " to make the cache faster...");

    process.env["ACTIONS_CACHE_URL"] = newActionsCacheURL;
}
