// 1. Replace INSERT_YOUR_URL_HERE
// 2. Run in browser console

const baseUrl = 'http://INSERT_YOUR_URL_HERE/actuator/metrics/http.server.requests';
const endpointStats = new Map();

// ---------- helpers ----------

async function fetchMetric(url) {
    try {
        const res = await fetch(url);
        return await res.json();
    } catch {
        return null;
    }
}

function getCount(metric) {
    return metric?.measurements?.find(m => m.statistic === 'COUNT')?.value ?? 0;
}

function getUris(metric) {
    return metric?.availableTags?.find(t => t.tag === 'uri')?.values ?? [];
}

// ---------- phase 1: SERVER_ERROR ----------

async function collectServerErrors() {
    const metric = await fetchMetric(`${baseUrl}?tag=outcome:SERVER_ERROR`);
    const uris = getUris(metric);

    for (const uri of uris) {
        const m = await fetchMetric(
            `${baseUrl}?tag=uri:${encodeURI(uri)}&tag=outcome:SERVER_ERROR`
        );

        endpointStats.set(uri, {
            uri,
            serverErrors: getCount(m),
            clientErrors: 0,
            totalCount: 0
        });
    }
}

// ---------- phase 2: CLIENT_ERROR ----------

async function collectClientErrors() {
    const metric = await fetchMetric(`${baseUrl}?tag=outcome:CLIENT_ERROR`);
    const uris = getUris(metric);

    for (const uri of uris) {
        const m = await fetchMetric(
            `${baseUrl}?tag=uri:${encodeURI(uri)}&tag=outcome:CLIENT_ERROR`
        );

        const existing = endpointStats.get(uri) ?? {
            uri,
            serverErrors: 0,
            clientErrors: 0,
            totalCount: 0
        };

        existing.clientErrors = getCount(m);
        endpointStats.set(uri, existing);
    }
}

// ---------- phase 3: TOTAL ----------

async function collectTotals() {
    for (const entry of endpointStats.values()) {
        const m = await fetchMetric(
            `${baseUrl}?tag=uri:${encodeURI(entry.uri)}`
        );
        entry.totalCount = getCount(m);
    }
}

// ---------- output ----------

function printTopByErrorCount() {
    console.log('TOP 10 ENDPOINTS BY ERROR COUNT:\n');

    [...endpointStats.values()]
        .map(e => ({
            ...e,
            errorCount: e.clientErrors + e.serverErrors,
            errorPercent:
                e.totalCount > 0
                    ? ((e.clientErrors + e.serverErrors) / e.totalCount) * 100
                    : 0
        }))
        .sort((a, b) => b.errorCount - a.errorCount)
        .slice(0, 10)
        .forEach(e =>
            console.log(
                `Errors: ${e.clientErrors + e.serverErrors}` +
                ` | ${e.errorPercent.toFixed(1)}%` +
                ` | Calls: ${e.totalCount}` +
                ` | ${e.uri}`
            )
        );
}

function printTopByErrorPercent() {
    console.log('\nTOP 10 ENDPOINTS BY ERROR %:\n');

    [...endpointStats.values()]
        .filter(e => e.totalCount > 0)
        .map(e => ({
            ...e,
            errorCount: e.clientErrors + e.serverErrors,
            errorPercent:
                ((e.clientErrors + e.serverErrors) / e.totalCount) * 100
        }))
        .sort((a, b) => b.errorPercent - a.errorPercent)
        .slice(0, 10)
        .forEach(e =>
            console.log(
                `Errors: ${e.clientErrors + e.serverErrors}` +
                ` | ${e.errorPercent.toFixed(1)}%` +
                ` | Calls: ${e.totalCount}` +
                ` | ${e.uri}`
            )
        );
}

// ---------- run ----------

await collectServerErrors();
await collectClientErrors();
await collectTotals();

printTopByErrorCount();
printTopByErrorPercent();
