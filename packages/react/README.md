# @talentdigital/react

This package provides a react wrapper around [@talentdigital/kit](/packages/kit/).

## Usage

Install the package using your packaging tool.

```
npm install @talentdigital/react
```

**or**

```
pnpm add @talentdigital/react
```

**or**

```
yarn add @talentdigital/react
```

Import the `useKit` React Hook.

```tsx
import { useKit } from "@talentdigital/react";
```

Define the interface for the format configuration used. (optional)

```ts
export interface FormatConfiguration {
  backgroundImage: string;
  introText: string;
  questions: any[];
}
```

Create the kit using the `useKit` hook

```tsx
const kit = useKit<FormatConfiguration>({
  tenant: "your tenant id",
  logRocketId: "your logrocket id", // optional
});
```
