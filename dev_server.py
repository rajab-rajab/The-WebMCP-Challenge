"""Tiny local server with the headers WebMCP requires."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class WebMCPHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cross-Origin-Opener-Policy", "same-origin")
        self.send_header("Cross-Origin-Embedder-Policy", "require-corp")
        self.send_header("Permissions-Policy", "tools=(self)")
        super().end_headers()


if __name__ == "__main__":
    print("ReliefMesh running at http://localhost:8080")
    ThreadingHTTPServer(("", 8080), WebMCPHandler).serve_forever()
