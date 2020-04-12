# Create React component

Helper extension to generate react components **my way**.

## Features

Right-click the parent folder and select "Create React component".

Input the component name (e.g. "MyComponent").

The extension will create a file sctructure like this inside the parent folder:

```
└ MyComponent
  ├ MyComponent.js
  └ index.js
```

With the following content:

`MyComponent.js`

```
import React from 'react';
import classNames from 'classnames';

function MyComponent({ className, children }) {
  return <div className={classNames(className)}>{children}</div>;
}

export default MyComponent;
```

`index.js`

```
export * from './MyComponent';
export { default } from './MyComponent';
```

**Enjoy!**
