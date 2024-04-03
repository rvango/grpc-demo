# LLM-Driven Virtual Screen Reader gRPC Interface Demo

## Overview

This demo illustrates a basic implementation of _gRPC_ services in a scenario where a Python-based _LangChain_ agent
communicates with a _NodeJS_ virtual screen reader. It showcases the use of _gRPC_ to perform operations commonly
associated with screen readers, like navigating to the next heading, link, or landmark in a document.
This is a demonstration and does not interact with actual screen reader software or web content.

The demo uses Protocol Buffers (_protobuf_) to define the service and message contracts. Protocol Buffers are a
language-neutral, platform-neutral, extensible mechanism for serialising structured data, similar to XML, but smaller,
faster, and simpler.

## What's Demonstrated

- `NextHeading`: Simulates navigating to the next heading in a document.
- `NextLink`: Simulates navigating to the next hyperlink.
- `NextLandmark`: Simulates navigating to the next landmark region, like a navigation bar or footer.

These commands are sent from the Python client to the _NodeJS_ server using _gRPC_, and dummy responses are returned
from
the server to the client.

## Protocol Buffers (Protobuf)

The `.proto` files serve as the contract between client and server. They define the structure of the RPC (remote
procedure call) request and response messages. These `.proto` files are compiled to generate code for the client and
server, which enables them to understand the structure and serialise/deserialise the messages efficiently.

## Prerequisites

- _Conda_ (_Anaconda_ or _Miniconda_)

## Setup Instructions

Follow these instructions to clone the repository, set up the environment, and run the demo.

1. **Create and Activate Conda Environment**:

```bash
conda env create -f environment.yml
conda activate grpc_demo
```

2. **Install NodeJS Dependencies**:

```bash
npm install
```

3. Generating gRPC Stubs

We need to generate the Python _gRPC_ stubs from the `.proto` service definitions. These stubs are Python files that
contain classes for the services and the messages defined in the `screen_reader.proto` file.

```bash
python -m grpc_tools.protoc -I. --python_out=. --grpc_python_out=. screen_reader.proto
```

This command will produce the `screen_reader_pb2.py` and `screen_reader_pb2_grpc.py` files in your project directory.
These files are necessary for the Python client to communicate with the _gRPC_ server and must be generated any time
the `.proto` files are updated.

## Running the Demo

### Start the NodeJs Server

In one terminal window, start the NodeJs server:

```bash
node server.js
```

### Execute the Python Client

In another terminal, run the Python client:

```bash
python client.py
```

When the Python client sends a command, the server will simulate navigation and respond with details of the next
heading, link, or landmark region.


