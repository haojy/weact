weact 版本 __VERSION__
=====================================

使用: weact [options] <source> <target>

source 源码目录路径或app.jsx文件路径
target 代码生成路径=./dist

options:
-v, --version               显示版本 
-h, --help                  显示当前内容 
-w, --watch                 Watch源码变化，自动更新代码

例子:

# 在当前路径./dist目录下生成代码
weact examples/01.hello.world/

# 指定代码生成路径
weact examples/01.hello.world/ ./your_distribution

# watch模式, 根据源码改动，自动更新生成代码
weact -w examples/01.hello.world/

更多内容请访问 https://github.com/haojy/weact