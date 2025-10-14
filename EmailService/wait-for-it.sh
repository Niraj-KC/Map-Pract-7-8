#!/usr/bin/env sh
set -e

HOST="$1"
shift
PORT="$1"
shift

TIMEOUT=60
QUIET=0

usage() {
  echo "Usage: $0 host port [--timeout=seconds] [--quiet] -- command args"
  exit 1
}

# Parse optional flags
while [[ $# -gt 0 ]]
do
  case "$1" in
    --timeout=*)
      TIMEOUT="${1#*=}"
      shift
      ;;
    --quiet)
      QUIET=1
      shift
      ;;
    --)
      shift
      break
      ;;
    *)
      break
      ;;
  esac
done

start_ts=$(date +%s)

while :
do
  if nc -z "$HOST" "$PORT" >/dev/null 2>&1; then
    end_ts=$(date +%s)
    if [ $QUIET -ne 1 ]; then
      echo "✅ $HOST:$PORT is available after $((end_ts - start_ts)) seconds"
    fi
    exec "$@"
    exit 0
  fi

  now_ts=$(date +%s)
  if [ $((now_ts - start_ts)) -ge $TIMEOUT ]; then
    echo "⏳ Timeout after ${TIMEOUT}s waiting for $HOST:$PORT"
    exit 1
  fi

  sleep 1
done
