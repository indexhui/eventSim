# 2024-06 mugiuo 專案 AI 協作日誌

## 協作重點

- 以 Next.js + Chakra UI 為主，重視元件化、可維護性與設計一致性
- 使用 TypeScript，遇到型別錯誤時優先修正 linter 錯誤
- 優先保留原有設計與樣式，避免不必要的結構變動
- 重要元件（如 LeftCornerTag, FullscreenMenu）皆抽出共用，並支援彈性 props
- menu/section scroll 採用原生 scrollIntoView，確保平滑滾動體驗

## 來回修正經驗

- menu 元件需支援 children 與 onClose，點擊選單項目時自動關閉並平滑滾動
- Chakra UI 的 Text/Box/Link 用法需注意型別支援，避免 linter 錯誤
- section 需加上 id 以支援 scrollIntoView
- 保持元件 props 彈性（如 padding 控制尺寸、響應式設計）
- 若有設計稿，優先還原視覺細節（如 offset 標籤、圓角、陰影）

## 專案風格與習慣

- 優先元件化、可複用、props 彈性
- 保持程式碼簡潔、易讀
- 修正時不動到無關結構與樣式
- 重要互動（如 menu scroll）以原生 API 為主，必要時才用 framer-motion

## 建議

- 日後如有新元件，建議先抽出共用 props 與樣式
- 日誌可分不同主題（如 UI、互動、型別、設計還原）
- 若遇到複雜互動，先以最簡單原生解法為主，再考慮動畫優化

---

本檔案由 AI 協作自動產生，供日後回顧與新成員快速熟悉專案風格。
