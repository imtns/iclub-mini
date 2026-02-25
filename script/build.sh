#!/bin/bash

# 获取项目根目录（脚本所在目录的上级目录，根据实际结构调整）
# 假设脚本在项目根目录的 script 文件夹中
projectPath=$(cd $(dirname $0)/..; pwd)

# 目标目录（与命令中的 UNI_OUTPUT_DIR 保持一致）
targetDir="${projectPath}/build/prod/dist"

# 确保目标目录存在
mkdir -p ${targetDir}

# 复制 project.config.json 到目标目录
if [ -f "${projectPath}/project.config.json" ]; then
  cp "${projectPath}/project.config.json" "${targetDir}/"
  echo "✅ project.config.json 已复制到 ${targetDir}"
else
  echo "❌ 未找到 project.config.json（路径：${projectPath}）"
fi

# 打开微信开发者工具
/Applications/wechatwebdevtools.app/Contents/MacOS/cli open --project "${targetDir}"