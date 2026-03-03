import { DB_CONFIG } from './constants.js'

let db = null

/**
 * 初始化 IndexedDB 数据库
 * @returns {Promise<IDBDatabase>}
 */
export function initDB() {
  return new Promise((resolve, reject) => {
    if (db) {
      resolve(db)
      return
    }

    const request = indexedDB.open(DB_CONFIG.name, DB_CONFIG.version)

    request.onerror = () => {
      reject(new Error('无法打开数据库'))
    }

    request.onsuccess = (event) => {
      db = event.target.result
      resolve(db)
    }

    request.onupgradeneeded = (event) => {
      const database = event.target.result

      if (!database.objectStoreNames.contains(DB_CONFIG.storeName)) {
        const store = database.createObjectStore(DB_CONFIG.storeName, {
          keyPath: 'id',
          autoIncrement: true
        })
        store.createIndex('createdAt', 'createdAt', { unique: false })
        store.createIndex('complexity', 'complexity', { unique: false })
      }
    }
  })
}

/**
 * 保存密码记录
 * @param {Object} record - 密码记录
 * @returns {Promise<number>} 记录ID
 */
export async function savePassword(record) {
  const database = await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readwrite')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    
    const data = {
      ...record,
      createdAt: Date.now()
    }
    
    const request = store.add(data)
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('保存失败'))
    }
  })
}

/**
 * 获取历史记录
 * @param {Object} options - 查询选项
 * @returns {Promise<Array>} 历史记录列表
 */
export async function getHistory(options = {}) {
  const database = await initDB()
  const { limit = 50, offset = 0 } = options
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readonly')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    const index = store.index('createdAt')
    
    const records = []
    let skipped = 0
    
    const request = index.openCursor(null, 'prev')
    
    request.onsuccess = (event) => {
      const cursor = event.target.result
      
      if (cursor && records.length < limit) {
        if (skipped < offset) {
          skipped++
          cursor.continue()
        } else {
          records.push(cursor.value)
          cursor.continue()
        }
      } else {
        resolve(records)
      }
    }
    
    request.onerror = () => {
      reject(new Error('查询失败'))
    }
  })
}

/**
 * 删除单条记录
 * @param {number} id - 记录ID
 * @returns {Promise<void>}
 */
export async function deleteRecord(id) {
  const database = await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readwrite')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    const request = store.delete(id)
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('删除失败'))
    }
  })
}

/**
 * 清空所有记录
 * @returns {Promise<void>}
 */
export async function clearAllRecords() {
  const database = await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readwrite')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    const request = store.clear()
    
    request.onsuccess = () => {
      resolve()
    }
    
    request.onerror = () => {
      reject(new Error('清空失败'))
    }
  })
}

/**
 * 获取记录总数
 * @returns {Promise<number>}
 */
export async function getRecordCount() {
  const database = await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readonly')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    const request = store.count()
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('计数失败'))
    }
  })
}

/**
 * 获取所有记录
 * @returns {Promise<Array>}
 */
export async function getAllRecords() {
  const database = await initDB()
  
  return new Promise((resolve, reject) => {
    const transaction = database.transaction([DB_CONFIG.storeName], 'readonly')
    const store = transaction.objectStore(DB_CONFIG.storeName)
    const request = store.getAll()
    
    request.onsuccess = () => {
      resolve(request.result)
    }
    
    request.onerror = () => {
      reject(new Error('获取数据失败'))
    }
  })
}
