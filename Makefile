.DEFAULT_GOAL := help

.PHONY: help setup dev build check ci validate format format-check lint links markdown markdown-fix test typecheck hooks

help: ## Show available commands
	@awk 'BEGIN {FS = ":.*## "; printf "Usage: make <target>\n\n"} /^[a-zA-Z_-]+:.*## / {printf "  %-16s %s\n", $$1, $$2}' $(MAKEFILE_LIST)

setup: ## Install the pinned toolchain, dependencies, and Git hooks
	mise install
	mise exec -- pnpm install --frozen-lockfile

dev: ## Start the local development server
	mise exec -- pnpm dev

build: ## Build the production site
	mise exec -- pnpm build

check: ## Run repository checks without a production build
	mise exec -- pnpm check

ci: ## Run complete checks and the production build
	mise exec -- pnpm run ci

validate: ci ## Validate content, source, local links, and the production route map

format: ## Format supported files
	mise exec -- pnpm format

format-check: ## Check formatting without writes
	mise exec -- pnpm format:check

lint: ## Run ESLint
	mise exec -- pnpm lint

links: ## Validate local content targets and external URLs
	mise exec -- pnpm content:check
	mise exec -- pnpm links:check

markdown: ## Run Markdownlint
	mise exec -- pnpm markdown:check

markdown-fix: ## Apply safe Markdownlint fixes
	mise exec -- pnpm markdown:fix

test: ## Validate documentation links, generated routes, and redirects
	mise exec -- pnpm test

typecheck: ## Generate content types and run TypeScript checks
	mise exec -- pnpm typecheck

hooks: ## Reinstall Husky Git hooks
	mise exec -- pnpm exec husky
