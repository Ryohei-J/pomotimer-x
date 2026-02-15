# PomotimerX ブランドガイドライン

## 概要

このドキュメントはPomotimerXのビジュアルアイデンティティとUIデザインに関する基本ルールを定義します。
スタイリングはTailwind CSS v4を使用し、CSS変数ベースのテーマシステムで管理しています。

---

## ボイス&トーン

### トーンの原則

1. **簡潔に** - 短くわかりやすいラベルとメッセージ
2. **ポジティブに** - できないことより、できることを伝える
3. **絵文字は控えめに** - テキスト内での絵文字は使わない

### UIテキストの言語

- アプリのUIは **英語** で統一する
- ラベルは短い単語・フレーズを使う（例: "Work", "Short Break", "Start", "Reset"）

---

## テーマシステム

ダーク/ライトの2テーマをサポート。デフォルトはダークモード。
`globals.css` の `:root`（ライト）と `.dark`（ダーク）でCSS変数を切り替え、Tailwind `@theme inline` でユーティリティクラスにマッピングしている。

---

## カラーパレット

### アクセント / デッキカラー

| トークン | HEX | Tailwindクラス | 用途 |
|---------|-----|---------------|------|
| `--c-accent` | `#F88B3A` | `text-accent`, `bg-accent` | メインアクセント、セッションラベル、フォーカスリング |
| `--c-work` | `#F88B3A` | `text-work`, `bg-work` | 作業デッキ（= accent） |
| `--c-short-break` | `#4ECDC4` | `text-short-break`, `bg-short-break` | 小休憩デッキ |
| `--c-long-break` | `#7C6EE7` | `text-long-break`, `bg-long-break` | 長休憩デッキ |

> デッキカラーはライト/ダークモードで共通。

### サーフェスカラー

| トークン | ライト | ダーク | Tailwindクラス | 用途 |
|---------|--------|-------|---------------|------|
| `--background` | `#e0e0e0` | `#3a3a3a` | `bg-background` | ページ背景 |
| `--c-surface` | `#ffffff` | `#2c2c2c` | `bg-surface` | メインカード、モーダル背景 |
| `--c-surface-alt` | `#e5e7eb` | `#3a3a3a` | `bg-surface-alt` | 入力フィールド、ボタン背景、テーマトグル |

### テキストカラー

| トークン | ライト | ダーク | Tailwindクラス | 用途 |
|---------|--------|-------|---------------|------|
| `--foreground` | `#1a1a1a` | `#f0f0f0` | `text-foreground` | body デフォルト |
| `--c-text-primary` | `#1a1a1a` | `#f0f0f0` | `text-text-primary` | メインテキスト |
| `--c-text-secondary` | `#6b7280` | `#a0a0a0` | `text-text-secondary` | ラベル、ヒント、サブテキスト |

### ボーダー / ディバイダー

| トークン | ライト | ダーク | Tailwindクラス | 用途 |
|---------|--------|-------|---------------|------|
| `--c-divider` | `#d1d5db` | `#4a4a4a` | `border-divider`, `divide-divider` | ボーダー、グリッド区切り |

### セマンティックカラー

| 名前 | HEX | 用途 |
|------|-----|------|
| Success | `#10B981` | 成功状態 |
| Warning | `#F88B3A` | 警告状態（= accent） |
| Error | `#EF4444` | エラー状態（`text-red-400` で使用） |
| Info | `#3B82F6` | 情報 |

---

## タイポグラフィ

### フォントファミリー

| 用途 | フォント | CSS変数 | Tailwindクラス |
|------|---------|---------|---------------|
| UI全般 | Inter + 日本語フォールバック | `--font-inter` | `font-sans` |
| タイマー、数値入力 | Geist Mono | `--font-geist-mono` | `font-mono` |

```css
/* sans: Inter + 日本語システムフォントフォールバック */
font-family: var(--font-inter), "Hiragino Sans", "Hiragino Kaku Gothic ProN",
  "Yu Gothic", "Meiryo", sans-serif;

/* mono: Geist Mono */
font-family: var(--font-geist-mono);
```

### フォントサイズ（実際の使用）

| 用途 | クラス | 補足 |
|------|--------|------|
| タイマーカウントダウン | `text-6xl md:text-8xl font-mono font-bold tabular-nums` | 最大の表示要素 |
| ページタイトル（h1） | `text-2xl md:text-3xl font-bold` | "PomotimerX" |
| デッキ見出し（h2） | `text-lg font-bold` | "Work", "Short Break" 等 |
| モーダル見出し（h3） | `text-lg font-semibold` | "Playback Error" |
| セッションラベル | `text-xs font-medium uppercase tracking-widest` | タイマー上部 |
| ボタン | `text-base font-semibold` | — |
| 入力ラベル | `text-sm text-text-secondary` | — |
| 補足テキスト | `text-sm text-text-secondary font-medium` | セッションインジケーター |
| エラーテキスト | `text-red-400 text-xs` | URL入力下 |

### フォントウェイト

| ウェイト | クラス | 用途 |
|----------|--------|------|
| 400 | `font-normal`（デフォルト） | 本文、ラベル |
| 500 | `font-medium` | セッションラベル、セッションインジケーター |
| 600 | `font-semibold` | ボタン、モーダル見出し |
| 700 | `font-bold` | ページタイトル、デッキ見出し、タイマー |

---

## UIコンポーネント

### ボタン（`Button.tsx`）

Framer Motion の `motion.button` ベース。

#### バリエーション

| バリアント | スタイル | 用途 |
|-----------|---------|------|
| **Primary** | `bg-accent text-white hover:bg-accent/85` | メインアクション（Start, Pause, Resume, OK） |
| **Secondary** | `bg-surface-alt text-text-primary border border-divider hover:bg-surface-alt/80` | サブアクション（Reset） |

#### 共通スタイル

```
py-2 px-4 rounded-lg font-semibold text-base text-center transition-colors
disabled:opacity-40 disabled:cursor-not-allowed
```

#### アニメーション

- Hover: `scale: 1.05`
- Active（tap）: `scale: 0.95`
- Disabled時はスケールアニメーション無効

### テキスト入力フィールド

#### URL入力（`UrlInput.tsx`）

```
w-full rounded-lg bg-surface-alt p-3 text-sm
border border-divider focus:outline-none focus:border-accent
disabled:opacity-50 disabled:cursor-not-allowed
placeholder:text-text-secondary/50
```

#### 数値入力（`CycleSettings.tsx`）

```
w-14 rounded-lg bg-surface-alt p-1.5 text-center font-mono
border border-divider focus:outline-none focus:border-accent
disabled:opacity-50 disabled:cursor-not-allowed text-text-primary
```

#### レンジスライダー（`globals.css`）

- トラック: 高さ 2px、`var(--c-text-secondary)` 色
- サム: 14x14px 円形、白背景、`var(--c-text-secondary)` ボーダー
- Disabled: `opacity: 0.5; cursor: not-allowed`

### メインカード

- **背景**: `bg-surface`
- **角丸**: `rounded-2xl`
- **シャドウ**: `shadow-xl`（Tailwind デフォルト）
- **オーバーフロー**: `overflow-hidden`
- **最大幅**: `max-w-6xl`

### モーダル（`ErrorModal.tsx`）

- **バックドロップ**: `fixed inset-0 bg-black/60`
- **カード**: `bg-surface rounded-2xl p-8 max-w-md border border-surface-alt`
- **アニメーション**: `AnimatePresence` + `scale: 0.9 → 1`、`opacity: 0 → 1`

### テーマトグル（`ThemeToggle.tsx`）

- **サイズ**: `w-9 h-9 rounded-full`
- **背景**: `bg-surface-alt hover:bg-surface-alt/80`
- **アイコン**: インラインSVG（Sun/Moon）、18x18px、`stroke="currentColor"`

### YouTube埋め込み（`YouTubeEmbed.tsx`）

- **サイズ**: `w-40 h-24`
- **スタイル**: `rounded-lg overflow-hidden bg-black/50`

---

## スペーシング

Tailwind デフォルトのスペーシングスケールを使用。

| クラス | 値 | 主な使用箇所 |
|--------|-----|-------------|
| `gap-1` | 4px | タイマー内部 |
| `gap-2` | 8px | ヘッダー内要素、デッキ見出し |
| `gap-3` | 12px | 設定エリア、スライダー内 |
| `gap-4` | 16px | ボタン間、デッキパネル内 |
| `p-4 md:p-8` | 16px / 32px | ページパディング |
| `p-5` | 20px | デッキパネル内 |
| `p-6 pb-4` | 24px / 16px | ヘッダー |
| `p-8` | 32px | モーダル |

---

## 角丸（Border Radius）

| クラス | 用途 |
|--------|------|
| `rounded-lg` | ボタン、入力フィールド、YouTube埋め込み |
| `rounded-2xl` | メインカード、モーダルカード |
| `rounded-full` | テーマトグル、デッキのアクティブインジケーター（ドット） |

---

## シャドウ

| クラス | 用途 |
|--------|------|
| `shadow-xl` | メインカード |

---

## レスポンシブ

Tailwind v4 デフォルトブレークポイントを使用。

| ブレークポイント | 幅 |
|----------------|-----|
| `sm` | 640px |
| `md` | 768px |
| `lg` | 1024px |
| `xl` | 1280px |
| `2xl` | 1536px |

主な切り替えポイントは `md`（768px）:
- レイアウト: `grid-cols-1` → `grid-cols-3`
- ページパディング: `p-4` → `p-8`
- タイトル: `text-2xl` → `text-3xl`
- タイマー: `text-6xl` → `text-8xl`
- デッキ区切り: `divide-y` → `divide-x`

---

## アニメーション

Framer Motion（`motion/react`）を使用。

| コンポーネント | アニメーション |
|---------------|---------------|
| ボタン | `whileHover: scale 1.05`、`whileTap: scale 0.95` |
| セッションインジケーター | `AnimatePresence` + `y: 4→0`、`opacity: 0→1` のフェード |
| エラーモーダル（背景） | `opacity: 0→1` のフェード |
| エラーモーダル（カード） | `scale: 0.9→1`、`opacity: 0→1` |
