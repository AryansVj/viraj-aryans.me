from http.server import HTTPServer, SimpleHTTPRequestHandler

class CORSRequestHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        super().end_headers()

if __name__ == '__main__':
    server_address = ('', 8000)  # Replace 8000 with your desired port number
    httpd = HTTPServer(server_address, CORSRequestHandler)
    print('Server running on port 8000...')
    httpd.serve_forever()
