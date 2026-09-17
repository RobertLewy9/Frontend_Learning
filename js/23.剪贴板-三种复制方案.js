// ================= 1. 现代方案 (Clipboard API) =================
document.getElementById('modernBtn').addEventListener('click', async () => {
    const msgEl = document.getElementById('modernMsg');
    const text = document.getElementById('modernInput').value;
    
    // 差异点1：环境检测
    if (!navigator.clipboard) {
        msgEl.style.color = 'red';
        msgEl.textContent = "❌ 当前浏览器不支持 Clipboard API (非HTTPS环境)";
        return;
    }

    const startTime = performance.now();
    try {
        // 差异点2：异步非阻塞，支持直接传入字符串
        await navigator.clipboard.writeText(text);
        const endTime = performance.now();
        
        msgEl.style.color = 'green';
        msgEl.textContent = `✅ 现代API复制成功！(耗时: ${(endTime - startTime).toFixed(2)}ms)`;
        console.log("🚀 [现代方案] 纯异步，无需创建额外DOM，支持HTTPS/localhost");
    } catch (err) {
        msgEl.style.color = 'red';
        msgEl.textContent = "❌ 复制失败: " + err.message;
    }
});

// ================= 2. 兼容方案 (execCommand) =================
document.getElementById('legacyBtn').addEventListener('click', () => {
    const msgEl = document.getElementById('legacyMsg');
    const text = document.getElementById('legacyInput').value;
    
    const startTime = performance.now();
    try {
        // 差异点3：同步操作，必须手动创建隐藏的 textarea 并选中
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        
        textarea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textarea); // 清理DOM
        
        const endTime = performance.now();
        
        if (success) {
            msgEl.style.color = 'green';
            msgEl.textContent = `✅ 兼容方案复制成功！(耗时: ${(endTime - startTime).toFixed(2)}ms)`;
            console.log("🐢 [兼容方案] 同步阻塞，需手动操作DOM，已废弃但兼容老浏览器");
        } else {
            throw new Error("execCommand 返回 false");
        }
    } catch (err) {
        msgEl.style.color = 'red';
        msgEl.textContent = "❌ 复制失败: " + err.message;
    }
});

// ================= 3. 图片复制 (Blob + ClipboardItem) =================
document.getElementById('copyImageBtn').addEventListener('click', async () => {
    const msgEl = document.getElementById('imageMsg');
    
    if (!navigator.clipboard) {
        msgEl.style.color = 'red';
        msgEl.textContent = "❌ 图片复制仅支持现代 Clipboard API";
        return;
    }

    try {
        // 差异点4：不能直接传URL，必须经过 网络请求 -> Blob二进制 -> ClipboardItem 的转换
        const imageUrl = document.getElementById('image').src;
        const response = await fetch(imageUrl);
        const imageBlob = await response.blob();
        
        console.log("📦 [图片复制] 获取到 Blob 对象，MIME类型:", imageBlob.type, "大小:", imageBlob.size, "bytes");
        
        const clipboardItem = new ClipboardItem({
            [imageBlob.type]: imageBlob 
        });
        
        await navigator.clipboard.write([clipboardItem]);
        
        msgEl.style.color = 'green';
        msgEl.textContent = "✅ 图片复制成功！(底层使用了 Blob 二进制数据)";
    } catch (err) {
        console.error(err);
        msgEl.style.color = 'red';
        msgEl.textContent = "❌ 图片复制失败 (请确保在 HTTPS/localhost 环境下)";
    }
});