// CikGen 后台服务脚本
// 处理扩展的后台任务

// 点击工具栏图标时打开新标签页
chrome.action.onClicked.addListener(() => {
  chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') })
})

// 扩展安装时的处理
chrome.runtime.onInstalled.addListener((details) => {
  if (details.reason === 'install') {
    // 安装时自动打开主页
    chrome.tabs.create({ url: chrome.runtime.getURL('popup.html') })
    console.log('CikGen 密码生成器已安装')
  } else if (details.reason === 'update') {
    console.log('CikGen 密码生成器已更新')
  }
})

// 监听来自popup或options的消息
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'generatePassword') {
    // 可以在这里处理密码生成请求
    sendResponse({ success: true })
  }
  return true
})
