const http=require("http");
const fs=require("fs");
const path=require("path");
const port=1331;
const publicDir=path.join(__dirname, "public");
const server=http.createServer((req, res)=>{
    let filePath=path.join(publicDir, req.url=="/"?"index.html":req.url);
    filePath=path.normalize(filePath);
    if (!filePath.startsWith(publicDir)){
        res.writeHead(403, {"Content-Type": "text/plain; charset=utf-8"});
        return res.end("403 Forbidden");
    }
    const extname=path.extname(filePath).toLowerCase();
    const mimeTypes ={
        ".html": "text/html; charset=utf-8",
        ".css": "text/css; charset=utf-8",
        ".js": "application/javascript; charset=utf-8",
        ".txt": "text/plain; charset=utf-8",
        "xml": "application/xml; charset=utf-8",
        ".mp3": "audio/mpeg",
        ".wav": "audio/wav",
        ".ogg": "audio/ogg",
        ".flac": "audio/flac",
        ".m4a": "audio/mp4",
        ".ttf": "font/ttf",
        ".otf": "font/otf",
        ".woff": "font/woff",
        ".woff2": "font/woff2",
        ".jpg": "image/jpeg",
        ".jpeg": "image/jpeg",
        ".png": "image/png",
        ".gif": "image/gif",
        ".bmp": "image/bmp",
        ".webp": "image/webp",
        ".svg": "image/svg",
        ".ico": "image/x-icon",
        ".mp4": "video/mp4",
        ".avi": "video/x-msvideo",
        ".mov": "video/quicktime",
        ".wmv": "video/x-ms-wmv",
        ".flv": "video/x-flv",
        ".mkv": "video/x-matroska",
        ".webm": "video/webm",
        ".pdf": "application/pdf",
        ".doc": "application/msword",
        ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ".xls": "application/vnd.ms-excel",
        ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ".ppt": "application/vnd.ms-powerpoint",
        ".pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ".csv": "text/csv",
        ".zip": "application/zip",
        ".rar": "application/x-rar-compressed",
        ".7z": "application/x-7z-compressed",
    };
    const contentType=mimeTypes[extname]||"application/octet-stream";
    fs.readFile(filePath, (err, content)=>{
        if (err){
            if (err.code=="ENOENT"){
                res.writeHead(404, {"Content-Type": "text/html; charset=utf-8"});
                res.end("<h1>404 Not Found</h1>", "utf-8");
            }
            else{
                res.writeHead(500, {"Content-Type": "text/plain; charset=utf-8"});
                res.end(`Server error: ${err.message}`, "utf-8");
            }
        }
        else{
            res.writeHead(200,{
                "Content-Type": contentType,
                "Cache-Control": "no-cache, no-store, must-revalidate",
            });
            res.end(content);
        }
    });
});
server.listen(port, ()=>{
    console.log(`Server running at http://localhost:${port}`);
});
