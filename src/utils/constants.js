// 字符集定义
export const CHAR_SETS = {
  lowercase: 'abcdefghijklmnopqrstuvwxyz',
  uppercase: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
  numbers: '0123456789',
  symbols: '!@#$%^&*()_+-=[]{}|:;<>,.?'
}

// 消歧义字符（需要排除的相似字符）
export const AMBIGUOUS_CHARS = {
  lowercase: 'il',
  uppercase: 'IO',
  numbers: '01'
}

// 复杂度级别配置
export const COMPLEXITY_LEVELS = {
  easy: {
    key: 'easy',
    name: '易于记忆',
    description: '简单易记，适合日常使用',
    defaultLength: 8,
    options: {
      includeLowercase: true,
      includeUppercase: false,
      includeNumbers: true,
      includeSymbols: false,
      strictMode: false,
      disambiguate: false
    }
  },
  readable: {
    key: 'readable',
    name: '易于阅读',
    description: '避免混淆字符，可读性强',
    defaultLength: 10,
    options: {
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: false,
      strictMode: false,
      disambiguate: true
    }
  },
  pleasant: {
    key: 'pleasant',
    name: '愉快',
    description: '平衡安全性和可读性',
    defaultLength: 12,
    options: {
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: false,
      strictMode: false,
      disambiguate: false
    }
  },
  strong: {
    key: 'strong',
    name: '强',
    description: '较高安全性',
    defaultLength: 16,
    options: {
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true,
      strictMode: false,
      disambiguate: false
    }
  },
  paranoid: {
    key: 'paranoid',
    name: '偏执',
    description: '极高安全性',
    defaultLength: 24,
    options: {
      includeLowercase: true,
      includeUppercase: true,
      includeNumbers: true,
      includeSymbols: true,
      strictMode: true,
      disambiguate: false
    }
  }
}

// 密码长度范围
export const PASSWORD_LENGTH = {
  min: 4,
  max: 32
}

// IndexedDB 配置
export const DB_CONFIG = {
  name: 'PasswordGeneratorDB',
  version: 1,
  storeName: 'passwordHistory'
}

// 主题配置
export const THEMES = {
  light: 'light',
  dark: 'dark'
}
