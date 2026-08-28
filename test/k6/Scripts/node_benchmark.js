const http = require('http');

function makeRequest(url) {
  const start = Date.now();
  return new Promise((resolve) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        const duration = Date.now() - start;
        resolve({ statusCode: res.statusCode, duration });
      });
    }).on('error', (err) => {
      const duration = Date.now() - start;
      resolve({ statusCode: 500, duration, error: err.message });
    });
  });
}

async function runBenchmark() {
  console.log('=== HTTP LOAD & LATENCY BENCHMARK ===');
  const targetUrl = 'http://localhost:5000/api/tiles';
  const totalRequests = 100;
  const concurrency = 10;

  console.log(`Target URL: ${targetUrl}`);
  console.log(`Total Requests: ${totalRequests}, Concurrency: ${concurrency}\n`);

  const results = [];
  const startTime = Date.now();

  for (let i = 0; i < totalRequests; i += concurrency) {
    const batch = [];
    for (let j = 0; j < concurrency && (i + j) < totalRequests; j++) {
      batch.push(makeRequest(targetUrl));
    }
    const batchResults = await Promise.all(batch);
    results.push(...batchResults);
  }

  const totalTimeSec = (Date.now() - startTime) / 1000;
  const latencies = results.map(r => r.duration).sort((a, b) => a - b);
  const successCount = results.filter(r => r.statusCode === 200).length;

  const p50 = latencies[Math.floor(latencies.length * 0.50)];
  const p90 = latencies[Math.floor(latencies.length * 0.90)];
  const p95 = latencies[Math.floor(latencies.length * 0.95)];
  const p99 = latencies[Math.floor(latencies.length * 0.99)];

  const reqPerSec = (totalRequests / totalTimeSec).toFixed(2);

  console.log('--- BENCHMARK RESULTS ---');
  console.log(`Total Time: ${totalTimeSec.toFixed(2)}s`);
  console.log(`Throughput: ${reqPerSec} req/sec`);
  console.log(`Success Rate: ${successCount}/${totalRequests} (${(successCount / totalRequests * 100).toFixed(1)}%)`);
  console.log(`p50 Latency: ${p50} ms`);
  console.log(`p90 Latency: ${p90} ms`);
  console.log(`p95 Latency: ${p95} ms`);
  console.log(`p99 Latency: ${p99} ms`);
}

runBenchmark().catch(console.error);
