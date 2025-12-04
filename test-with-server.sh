#!/bin/bash

# Start the dev server in the background
npm run dev &
SERVER_PID=$!

# Wait for server to be ready
echo "Waiting for server to start..."
sleep 5

# Run tests
npm test

# Store test exit code
TEST_EXIT=$?

# Kill the server
kill $SERVER_PID 2>/dev/null

# Exit with test result
exit $TEST_EXIT
