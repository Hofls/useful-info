// 1. Replace INSERT_YOUR_URL_HERE with your URL
// 2. Execute script in browser console

(async () => {
  const url = 'http://INSERT_YOUR_URL_HERE/actuator/prometheus';

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const text = await response.text();
    const data = parsePrometheusMetrics(text);
    printHealthSummary(data);
  } catch (err) {
    console.error('Failed to fetch or parse metrics:', err.message);
  }
})();

function parsePrometheusMetrics(text) {
  const lines = text.split('\n');
  const data = {};

  for (const line of lines) {
    if (!line || line.startsWith('#')) continue;

    const lastSpaceIndex = line.lastIndexOf(' ');
    const keyPart = line.slice(0, lastSpaceIndex).trim();
    const value = Number(line.slice(lastSpaceIndex + 1));
    const num = parseFloat(value);
    if (!keyPart || isNaN(num)) continue;

    const m = keyPart.match(/^([^ {]+)(?:{(.*)})?$/);
    if (!m) continue;

    const metric = m[1];
    const labelsStr = m[2] || '';

    // Simple (no labels) metric
    if (!labelsStr) {
      data[metric] = num;
      continue;
    }

    // Extract common label values
    const name   = labelsStr.match(/name="([^"]+)"/)?.[1];
    const state  = labelsStr.match(/state="([^"]+)"/)?.[1];
    const id     = labelsStr.match(/id="([^"]+)"/)?.[1];
    const level  = labelsStr.match(/level="([^"]+)"/)?.[1];

    // Store with suffix when meaningful
    if (name) {
        data[`${metric}_${name}`] = num;
    } else if (state) {
        data[`${metric}_${state}`] = num;
    } else if (id) {
        const safeId = id.replace(/[^a-zA-Z0-9_]/g, '_');
        data[`${metric}_${safeId.toLowerCase()}`] = num;
    } else if (level) {
        data[`${metric}_${level}`] = num;
    } else {
        data[`${metric}`] = num;
     }
  }

  return data;
}

function printHealthSummary(data) {
  console.log('Spring Boot Quick Health:');
  console.log('');

  console.log('CPU:');
  const cpu = data.process_cpu_usage ?? data.system_cpu_usage;
  console.log(`CPU usage: ${(cpu * 100).toFixed(1)} % (JVM / system load)`);
  console.log('');

  console.log('JVM Memory — USED:');
  console.log(`Heap Tenured used: ${(data.jvm_memory_used_bytes_tenured_gen / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Eden used: ${(data.jvm_memory_used_bytes_eden_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Survivor used: ${(data.jvm_memory_used_bytes_survivor_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`MetaSpace used: ${(data.jvm_memory_used_bytes_metaspace / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Compressed Class Space used: ${(data.jvm_memory_used_bytes_compressed_class_space / 1024 / 1024).toFixed(1)} MB`);
  console.log('');

  console.log('JVM Memory — COMMITTED:');
  console.log(`Heap Tenured committed: ${(data.jvm_memory_committed_bytes_tenured_gen / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Eden committed: ${(data.jvm_memory_committed_bytes_eden_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Survivor committed: ${(data.jvm_memory_committed_bytes_survivor_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`MetaSpace committed: ${(data.jvm_memory_committed_bytes_metaspace / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Compressed Class Space committed: ${(data.jvm_memory_committed_bytes_compressed_class_space / 1024 / 1024).toFixed(1)} MB`);
  console.log('');

  console.log('JVM Memory — MAX:');
  console.log(`Heap Tenured max: ${(data.jvm_memory_max_bytes_tenured_gen / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Eden max: ${(data.jvm_memory_max_bytes_eden_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap Survivor max: ${(data.jvm_memory_max_bytes_survivor_space / 1024 / 1024).toFixed(1)} MB`);
  console.log(`MetaSpace max: ${(data.jvm_memory_max_bytes_metaspace / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Compressed Class Space max: ${(data.jvm_memory_max_bytes_compressed_class_space / 1024 / 1024).toFixed(1)} MB`);
  console.log('');

  console.log('Memory:');
  console.log(`Live heap post-GC: ${(data.jvm_gc_live_data_size_bytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Heap used after GC: ${(data.jvm_memory_usage_after_gc_percent * 100).toFixed(1)} %`);
  console.log(`Promoted to old-gen: ${(data.jvm_gc_memory_promoted_bytes_total / 1024 / 1024).toFixed(1)} MB`);
  console.log(`Classes loaded: ${data.jvm_classes_loaded_classes}`);
  console.log('');

  console.log('Threads:');
  console.log(`Peak threads: ${data.jvm_threads_peak_threads | 0}`);
  console.log(`Runnable threads: ${data.jvm_threads_states_threads_runnable | 0}`);
  console.log(`Waiting threads: ${data.jvm_threads_states_threads_waiting | 0}`);
  console.log(`Timed waiting threads: ${data.jvm_threads_states_threads_timed | 0}`);
  console.log(`Blocked threads: ${data.jvm_threads_states_threads_blocked | 0}`);
  console.log(`Daemon threads: ${data.jvm_threads_daemon_threads | 0}`);
  console.log('');

  console.log('Other:');
  console.log(`Uptime: ${Math.floor((Date.now()/1000 - data.process_start_time_seconds) / 60)} min (JVM running time)`);
  console.log(`Open files: ${data.process_files_open_files}`);
  console.log(`Startup time: ${data.application_started_time_seconds} s`);
  console.log(`Ready time: ${data.application_ready_time_seconds} s`);
  console.log(`Errors logged: ${data.logback_events_total_error}`);
  console.log(`Disk free: ${(data.disk_free_bytes / 1024 / 1024 / 1024).toFixed(1)} GB`);
  console.log(`JDBC connections min–max: ${data.jdbc_connections_min_dataSource | 0}–${data.jdbc_connections_max_dataSource | 0}`);
  console.log('');

  console.log('Executor:');
  console.log(`Tasks queued: ${data.executor_queued_tasks_threadPoolTaskScheduler}`);
  console.log(`Tasks completed: ${data.executor_completed_tasks_total_threadPoolTaskScheduler}`);
  console.log(`Executor threads: ${data.executor_pool_size_threads_threadPoolTaskScheduler}`);
  console.log('');

  console.log('Database:');
  console.log(`DB connections active: ${data.hikaricp_connections_active}`);
  console.log(`DB pool size: ${data.hikaricp_connections}`);
  console.log(`DB max usage: ${(data.hikaricp_connections_usage_seconds_max * 1000).toFixed(1)} ms`);
  console.log('');
}

