import grpc
import screen_reader_pb2
import screen_reader_pb2_grpc

def run():
    # Assuming the server is running on localhost at port 50051
    with grpc.insecure_channel('localhost:50051') as channel:
        stub = screen_reader_pb2_grpc.VirtualScreenReaderStub(channel)

        # Request the next heading
        print("Requesting the next heading...")
        heading_response = stub.NextHeading(screen_reader_pb2.NavigationRequest())
        print(f"Received: {heading_response.text} with role {heading_response.ariaRole}")

        # Request the next link
        print("\nRequesting the next link...")
        link_response = stub.NextLink(screen_reader_pb2.NavigationRequest())
        print(f"Received: {link_response.text} with role {link_response.ariaRole}")

        # Request the next landmark
        print("\nRequesting the next landmark...")
        landmark_response = stub.NextLandmark(screen_reader_pb2.NavigationRequest())
        print(f"Received: {landmark_response.text} with role {landmark_response.ariaRole}")

if __name__ == '__main__':
    print("Starting the client...")
    run()
