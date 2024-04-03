const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('screen_reader.proto', {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});
const screenReaderProto = grpc.loadPackageDefinition(packageDefinition).screenreader;

function getNextHeading(call, callback) {
  // In a real application, this would be more complex and dynamic.
  // For demo purposes, we're just returning a fixed value.
  callback(null, { text: 'Heading 1: Welcome to the Demo', ariaRole: 'heading', status: 'success' });
}

function getNextLink(call, callback) {
  // Dummy implementation for demo.
  callback(null, { text: 'Next link: Click here for more information', ariaRole: 'link', status: 'success' });
}

function getNextLandmark(call, callback) {
  // Dummy implementation for demo.
  callback(null, { text: 'Next landmark: Navigation Bar', ariaRole: 'navigation', status: 'success' });
}

function main() {
  const server = new grpc.Server();
  server.addService(screenReaderProto.VirtualScreenReader.service, {
    NextHeading: getNextHeading,
    NextLink: getNextLink,
    NextLandmark: getNextLandmark
  });

  server.bindAsync('127.0.0.1:50051', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
      console.error(`Server error: ${error.message}`);
    } else {
      console.log(`Server running at http://127.0.0.1:${port}`);
    }
  });
}

main();
