# Contributing

## Development Setup

```bash
git clone https://github.com/YOUR_USERNAME/Bambulab-profile.git
cd Bambulab-profile
npm install
cp .env.local.example .env.local
# Configure Firebase (see FIREBASE_SETUP.md)
npm run dev
```

## Code Standards

### TypeScript
- Strict mode enabled
- No `any` types
- Proper type definitions for all functions
- Use interface/type definitions from `src/types/`

### Code Style
```bash
npm run lint        # ESLint
npm run type-check  # TypeScript validation
```

### Commit Convention
```
type(scope): description

Types: feat, fix, docs, style, refactor, test, chore
Example: feat(auth): add Google OAuth provider
```

## Testing

### Unit Tests
```bash
npm test           # Run once
npm run test:ci    # With coverage
```

### Test Requirements
- New features require tests
- Maintain >80% coverage
- Mock Firebase services in tests
- Test error handling

### E2E Tests
```bash
npm run test:e2e   # Playwright tests
```

## Pull Request Process

### Before Submitting
```bash
npm run ci         # Full validation
```

This runs:
- ESLint
- TypeScript check
- Unit tests
- Build verification

### PR Requirements
- [ ] All tests pass
- [ ] TypeScript strict compliance
- [ ] No ESLint errors
- [ ] Firebase rules tested
- [ ] Documentation updated (if needed)

### Review Process
1. Automated checks must pass
2. Code review by maintainer
3. Manual testing of features
4. Security review for Firebase changes

## Architecture Guidelines

### Component Structure
```typescript
// src/components/ComponentName.tsx
interface ComponentProps {
  // Props interface
}

export default function ComponentName({ ...props }: ComponentProps) {
  // Component implementation
}
```

### Service Layer
```typescript
// src/services/serviceName.ts
export class ServiceName {
  static async method(): Promise<ReturnType> {
    // Implementation
  }
}
```

### State Management
- React Context for global state
- useState/useReducer for local state
- No external state libraries

### Firebase Integration
- Use service layer abstractions
- Implement proper error handling
- Follow security rule patterns

## Security Requirements

### Code Security
- Validate all inputs
- Sanitize user data
- Use TypeScript strict mode
- Follow OWASP guidelines

### Firebase Security
- Test security rules locally
- Validate authentication flows
- Implement proper data isolation
- Monitor quota usage

## Performance Guidelines

### Bundle Size
- Keep bundle size minimal
- Use dynamic imports for large dependencies
- Optimize images and assets

### Runtime Performance
- Implement proper loading states
- Use React.memo for expensive components
- Optimize Firebase queries

## Issue Reporting

### Bug Reports
Include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Console errors
- Screenshots (if applicable)

### Feature Requests
Include:
- Problem statement
- Proposed solution
- Alternative considerations
- Implementation complexity estimate

## Release Process

Releases follow semantic versioning:
- `patch`: Bug fixes
- `minor`: New features
- `major`: Breaking changes

Only maintainer creates releases.
