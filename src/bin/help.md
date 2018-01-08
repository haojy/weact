weact v__VERSION__
Usage: weact [options] <source> <target>

source path for jsx files path or app.jsx
target optional, default directory ./dist

options:
-v, --version               Show version number
-h, --help                  Show this help message
-w, --watch                 Watch files in bundle and rebuild on changes

Examples:

# generate codes for miniprogram in ./dist
weact examples/01.hello.world/

# give a destination path for generated code
weact examples/01.hello.world/ ./your_distribution

# rebuild on source changes
weact -w examples/01.hello.world/

For more information visit https://github.com/haojy/weact