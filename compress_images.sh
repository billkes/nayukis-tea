#!/bin/bash

# 图片压缩脚本
# 用于压缩奈雪的茶小程序中的图片资源

echo "开始压缩图片资源..."

# 设置目标图片大小上限（100KB）
TARGET_SIZE_KB=100

# 创建压缩后的图片目录
COMPRESSED_DIR="static_compressed"
mkdir -p "$COMPRESSED_DIR"

# 统计信息
TOTAL_FILES=0
COMPRESSED_FILES=0
TOTAL_ORIGINAL_SIZE=0
TOTAL_COMPRESSED_SIZE=0

# 查找所有jpg和png图片
find static/ -type f \( -name "*.jpg" -o -name "*.jpeg" -o -name "*.png" \) | while read -r file; do
    TOTAL_FILES=$((TOTAL_FILES + 1))
    
    # 获取原始文件大小（KB）
    ORIGINAL_SIZE_KB=$(du -k "$file" | cut -f1)
    TOTAL_ORIGINAL_SIZE=$((TOTAL_ORIGINAL_SIZE + ORIGINAL_SIZE_KB))
    
    # 获取相对路径
    REL_PATH=${file#static/}
    COMPRESSED_FILE="$COMPRESSED_DIR/$REL_PATH"
    
    # 创建目标目录
    mkdir -p "$(dirname "$COMPRESSED_FILE")"
    
    # 如果文件小于目标大小，直接复制
    if [ "$ORIGINAL_SIZE_KB" -le "$TARGET_SIZE_KB" ]; then
        cp "$file" "$COMPRESSED_FILE"
        echo "复制: $file ($ORIGINAL_SIZE_KB KB <= $TARGET_SIZE_KB KB)"
    else
        # 使用convert进行压缩
        if command -v convert &> /dev/null; then
            # 计算压缩质量（基于原始大小）
            QUALITY=$((80 - (ORIGINAL_SIZE_KB / 1000) * 30))
            if [ "$QUALITY" -lt 30 ]; then
                QUALITY=30
            fi
            
            # 尝试压缩
            convert "$file" -quality "$QUALITY" -resize "1200x1200>" "$COMPRESSED_FILE" 2>/dev/null
            
            # 检查压缩结果
            if [ -f "$COMPRESSED_FILE" ]; then
                COMPRESSED_SIZE_KB=$(du -k "$COMPRESSED_FILE" | cut -f1)
                TOTAL_COMPRESSED_SIZE=$((TOTAL_COMPRESSED_SIZE + COMPRESSED_SIZE_KB))
                COMPRESSED_FILES=$((COMPRESSED_FILES + 1))
                
                echo "压缩: $file ($ORIGINAL_SIZE_KB KB -> $COMPRESSED_SIZE_KB KB, 质量: $QUALITY%)"
                
                # 如果压缩后仍然太大，继续降低质量
                if [ "$COMPRESSED_SIZE_KB" -gt "$TARGET_SIZE_KB" ]; then
                    QUALITY=$((QUALITY - 20))
                    if [ "$QUALITY" -lt 10 ]; then
                        QUALITY=10
                    fi
                    convert "$file" -quality "$QUALITY" -resize "800x800>" "$COMPRESSED_FILE"
                    COMPRESSED_SIZE_KB=$(du -k "$COMPRESSED_FILE" | cut -f1)
                    echo "二次压缩: $file ($COMPRESSED_SIZE_KB KB, 质量: $QUALITY%)"
                fi
            else
                # 如果convert失败，直接复制
                cp "$file" "$COMPRESSED_FILE"
                echo "转换失败，直接复制: $file"
            fi
        else
            # 如果没有convert命令，直接复制
            cp "$file" "$COMPRESSED_FILE"
            echo "未找到convert命令，直接复制: $file"
        fi
    fi
done

echo "=========================================="
echo "图片压缩完成!"
echo "总文件数: $TOTAL_FILES"
echo "压缩文件数: $COMPRESSED_FILES"
echo "原始总大小: $TOTAL_ORIGINAL_SIZE KB ($((TOTAL_ORIGINAL_SIZE / 1024)) MB)"
echo "压缩后总大小: $TOTAL_COMPRESSED_SIZE KB ($((TOTAL_COMPRESSED_SIZE / 1024)) MB)"

if [ "$TOTAL_COMPRESSED_SIZE" -gt 0 ]; then
    SAVED_SIZE=$((TOTAL_ORIGINAL_SIZE - TOTAL_COMPRESSED_SIZE))
    SAVED_PERCENT=$((SAVED_SIZE * 100 / TOTAL_ORIGINAL_SIZE))
    echo "节省空间: $SAVED_SIZE KB ($((SAVED_SIZE / 1024)) MB)"
    echo "压缩比例: $SAVED_PERCENT%"
fi

echo "压缩后的文件位于: $COMPRESSED_DIR/"
echo "请手动将 $COMPRESSED_DIR/ 下的文件替换到 static/ 目录"