# Cirrus Runners Cache action

This utility repository periodically runs a GitHub Action that pulls the latest [actions/cache](https://github.com/actions/cache) repository and applies a rather simple patch to all of its actions:

```ts
const httpCacheHost = process.env["CIRRUS_HTTP_CACHE_HOST"];

if (httpCacheHost != null) {
    const newActionsCacheURL = `http://${httpCacheHost}/`;

    console.log(
        `Redefining the ACTIONS_CACHE_URL to ${newActionsCacheURL} to make the cache faster...`
    );

    process.env["ACTIONS_CACHE_URL"] = newActionsCacheURL;
}
```

This allows the tasks running on [Cirrus Runners](https://cirrus-runners.app/) to take advantage of a faster and more local cache provided by Cirrus Runners and exposed in `CIRRUS_HTTP_CACHE_HOST` environment variable.

These modifications are then re-pushed to the corresponding major tags (e.g. `v4`), making the changes in your CI workflows as simple as:

```diff
-- uses: actions/cache@v4
+- uses: cirruslabs/cache@v4
   with:
     path: node_modules
     key: node_modules
```

## Why?

Because the following PRs were closed/not merged yet:

* https://github.com/actions/cache/pull/679
* https://github.com/actions/toolkit/pull/1695
