# 执行任务

- 文件a：commit-message.txt
- 文件b：chatLog.md
- 需求：将`具体任务`按照`具体要求`完成后，最后将下方要求完成
- 要求：为我的本地所有更改生成合理的、尽量中文的提交信息，输出到文件a，不需要推送git
- 要求：维护文件b，将整理后的todolist和解决办法，往文件b的头部追加写入

--- 

```text
[] Error: file: components/top/top.js
 unknown: Unexpected token, expected "," (104:1)

  102 |     });  103 |   }> 104 | })      |  ^Error: file: components/top/top.js unknown: Unexpected token, expected "," (104:1)  102 |     });  103 |   }> 104 | })      |  ^    at enhance (D:\Program Files (x86)\Tencent\微信web开发者工具\code\package.nw\js\common\miniprogram-builder\modules\corecompiler\summer\plugins\enhance.js:1:1579)    at doTransform (D:\Program Files (x86)\Tencent\微信web开发者工具\code\package.nw\js\common\miniprogram-builder\modules\corecompiler\summer\plugins\enhance.js:1:1827)    at Object.runSummerPluginHook (D:\Program Files (x86)\Tencent\微信web开发者工具\code\package.nw\js\common\miniprogram-builder\modules\corecompiler\summer\worker.js:2:1239)(env: Windows,mp,1.06.2412050; lib: 3.8.12)
```

- 具体需求：修复代码错误
