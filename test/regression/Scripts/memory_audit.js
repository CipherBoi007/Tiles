const http = require('http');

function makeRequest(url) {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve(res.statusCode));
    }).on('error', reject);
  });
}

async function runMemoryAudit() {
  console.log('=== MEMORY & RESOURCE STABILITY AUDIT ===');
  const targetUrl = 'http://localhost:5000/api/tiles';
  const iterations = 50;

  console.log(`Executing ${iterations} repeated requests to ${targetUrl}...`);
  
  const initialMem = process.memoryUsage();
  console.log('Initial Memory:', {
    heapUsedMB: (initialMem.heapUsed / 1024 / 1024).toFixed(2),
    heapTotalMB: (initialMem.heapTotal / 1024 / 1024).toFixed(2),
    rssMB: (initialMem.rss / 1024 / 1024).toFixed(2)
  });

  for (let i = 1; i <= iterations; i++) {
    try {
      await makeRequest(targetUrl);
    } catch (e) {
      console.error(`Request ${i} failed:`, e.message);
    }
  }

  // Force Garbage Collection if available
  if (global.gc) {
    global.gc();
  }

  const finalMem = process.memoryUsage();
  console.log('Final Memory after 50 requests:', {
    heapUsedMB: (finalMem.heapUsed / 1024 / 1024).toFixed(2),
    heapTotalMB: (finalMem.heapTotal / 1024 / 1024).toFixed(2),
    rssMB: (finalMem.rss / 1024 / 1024).toFixed(2)
  });

  const heapDiffMB = ((finalMem.heapUsed - initialMem.heapUsed) / 1024 / 1024).toFixed(2);
  console.log(`Heap Difference: ${heapDiffMB} MB`);

  if (parseFloat(heapDiffMB) < 10) {
    console.log('RESULT: NORMAL - Memory retention within healthy limits.');
  } else {
    console.log('RESULT: SUSPICIOUS - Elevated heap growth detected.');
  }
}

runMemoryAudit().catch(console.error);
