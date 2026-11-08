# Operation Europa - Web-Based Grand Strategy Game

A modern, cross-platform grand strategy game inspired by Hearts of Iron IV, built with TypeScript + WebAssembly + WebGL.

## Technology Stack

- **Frontend:** React + TypeScript + Vite
- **Game Engine:** Rust WebAssembly
- **Rendering:** WebGL
- **State Management:** Zustand
- **Build System:** Turborepo (monorepo)
- **Package Manager:** pnpm

## Project Structure

```
hoi3-web/
├── packages/
│   ├── frontend/              # React UI
│   ├── wasm-core/             # Rust game engine
│   ├── shared/                # Shared types
│   └── tools/                 # Development tools
├── data/                     # Game data
├── mods/                     # Mods
├── docs/                     # Documentation
└── tests/                    # Tests
```

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Rust 1.70+
- wasm-pack

### Installation

```bash
# Install dependencies
pnpm install

# Build WASM
cd packages/wasm-core
wasm-pack build --target web
cd ../..

# Start development server
pnpm dev
```

## Development

```bash
# Run frontend dev server
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Build for production
pnpm build
```

## Building WASM

```bash
cd packages/wasm-core
wasm-pack build --target web
```

## License

MIT
