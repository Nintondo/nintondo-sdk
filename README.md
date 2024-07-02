# nintondo-sdk

Installation:

```bash
npm i nintondo-sdk
```

Usage (manual method):

```typescript
import { initNintondo } from "nintondo-sdk";

// It will return Nintondo instance if extension is already injected to the website
const nintondo: Nintondo | undefined = initNintondo();
```

Using React.Context (for React\Next.JS projects):

```typescript
import { useNintondo, NintondoProvider } from "nintondo-sdk/react";

const Layout = () => {
  return (
    <NintondoProvider>
      <AppEntyPoint />
    </NintondoProvider>
  );
};

const AppEntyPoint = () => {
  const { isConnected, nintondo } = useNintondo();

  return (
    <div>
      {nintondo && <div>Nintondo injected</div>}
      {isConnected && <div>Nintondo connected</div>}
    </div>
  );
};
```
