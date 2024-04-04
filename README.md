# LLM-Driven Virtual Screen Reader gRPC Interface Demo

## Summary

This demo illustrates a basic implementation of _gRPC_ services in a scenario where a _Python_-based _LangChain_ agent
communicates with a _NodeJS_ virtual screen reader. It showcases the use of _gRPC_ to perform operations commonly
associated with screen readers, like navigating to the next heading, link, or landmark in a document.
This is a demonstration and does not interact with actual screen reader software or web content.

The demo leverages Protocol Buffers (_Protobuf_) for defining both the service interfaces and the structure of messages
exchanged between the client and server.

It demonstrates the power of _gRPC_ and _Protobuf_ in facilitating efficient, type-safe communication between different
components of a system.

## Technical overview

### Protobuf

In the context of our project, _Protobuf_ is used for two main purposes:

1. **Data format**: _Protobuf_ defines the format for serialising the structured data that is sent over the network.
   This
   includes defining the structure of requests and responses exchanged between the client and the server.

2. **Service definition**: Besides data serialisation, _Protobuf_ is also used to define the service interface. It
   specifies the methods that can be called remotely, along with their input and output types.

### gRPC

_gRPC_ is an open-source remote procedure call (RPC) system that uses _Protobuf_ for service definition and as its
underlying message interchange format. It provides a framework for executing requests on a server with the protocol of
your choice. In simpler terms, while _Protobuf_ defines the format and structure of the data and services, _gRPC_
handles the transmission of those messages over the network.

### Linking Protobuf with gRPC

Consider a simple service defined in a `screen_reader.proto` file that allows a client to request the next heading in a
document:

```protobuf
service VirtualScreenReader {
  rpc NextHeading (Empty) returns (HeadingResponse);
}

message Empty {}

message HeadingResponse {
  string text = 1;
}
```

Here's what happens under the hood when a Python client calls the `NextHeading` method:

- **Service definition with _Protobuf_**: The `.proto` file acts as the blueprint. It defines the `NextHeading` RPC
  method available on the server and its associated messages. The `Empty` message signifies a request that doesn't
  require any input, and the `HeadingResponse` message specifies that the response will include a text string.

- **Code generation**: _gRPC_ tools generate client and server code from the `.proto` file. For our _Python_ client and
  _NodeJS_ server, this means creating classes and methods that directly correspond to those defined in _Protobuf_,
  including stubs for making and handling `NextHeading` calls.

- **Communication over-the-wire with _gRPC_**: When the client invokes the `NextHeading` method, _gRPC_ serializes
  the `Empty` request into _Protobuf_ format and sends it to the server. The server then deserialises this request,
  executes the corresponding logic to find the next heading, serialises a `HeadingResponse` into _Protobuf_ format, and
  sends it back to the client.

This process illustrates how _Protobuf_ and gRPC work together. By defining our services and messages in _Protobuf_, we
ensure a strong contract between the client and server. _gRPC_ then takes care of the rest, handling the details of
network communication, serialisation, and deserialisation.
## Demo

We will see how the _Python_ client issues commands to the _NodeJS_ server via _gRPC_ to perform the following
dummy operations:

- `NextHeading`: Simulates navigating to the next heading in a document.
- `NextLink`: Simulates navigating to the next hyperlink.
- `NextLandmark`: Simulates navigating to the next landmark region, like a navigation bar or footer.

### Prerequisites

- _Conda_ (_Anaconda_ or _Miniconda_)

### Setup instructions

Follow these instructions to clone the repository, set up the environment, and run the demo.

1. **Create and activate Conda environment**:

```bash
conda env create -f environment.yml
conda activate grpc_demo
```

2. **Install NodeJS dependencies**:

```bash
npm install
```

3. **Generating gRPC stubs**:

We need to generate the Python _gRPC_ stubs from the `.proto` service definitions. These stubs are Python files that
contain classes for the services and the messages defined in the `screen_reader.proto` file.

```bash
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. screen_reader.proto
```

This command will produce the `screen_reader_pb2.py` and `screen_reader_pb2_grpc.py` files in your project directory.
These files are necessary for the Python client to communicate with the _gRPC_ server and must be generated any time
the `.proto` files are updated.

### Running the demo

#### Start the NodeJs server

In one terminal window, start the _NodeJs_ server:

```bash
node server.js
```

#### Execute the Python client

In another terminal, run the _Python_ client:

```bash
python client.py
```

When the _Python_ client sends a command, the server will simulate navigation and respond with details of the next
heading, link, or landmark region.


