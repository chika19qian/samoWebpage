## Samo 系列

「Samo」系列是使用 **Swift 原生开发**的 iOS / Mac 情绪陪伴与日记应用。界面主要采用 **SwiftUI** 构建，并使用 **MVVM + Repository** 架构管理业务逻辑和数据。

### 技术栈

- **DeepSeek 大语言模型**
  - 生成个性化日记回信
  - 提供情绪陪伴内容

- **CloudKit + 本地存储**
  - 保存日记、待办、宠物及 CBT 任务数据

- **RESTful API**
  - 账号登录
  - 设备配对
  - 多端数据同步

- **WidgetKit**
  - 桌面待办小组件
  - 日历倒计时小组件

- **StoreKit 2**
  - 支持应用内购买

- **Sign in with Apple + 邮箱登录**
  - 提供账号认证能力

- **Keychain**
  - 安全保存登录凭证和设备信息

- **AVFoundation / MediaPlayer**
  - 冥想音频
  - 背景音乐
  - 互动音效

- **UserNotifications**
  - 日程提醒
  - 纪念日提醒
  - 每日问候提醒

- **Swift Concurrency**
  - 使用 `async/await`
  - 使用 `actor` 处理网络请求与数据同步

- **App Groups**
  - 实现主应用与桌面小组件之间的数据共享

- **LunarSwift**
  - 支持农历和地区节日计算

- **自研 SamoPetKit**
  - 承载虚拟宠物互动
  - 支持 AI 行为能力
