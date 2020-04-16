# Create React component

Helper extension to generate react components **my way**.

## How it works

Right-click the parent folder and select "Create React component" (or "Create React Native component").

Input the component name (e.g. "MyComponent").

The extension will create a file sctructure like this inside the parent folder:

```
└ MyComponent
  ├ index.js
  └ MyComponent.js
```

With the following content:

`index.js`

```
export * from './MyComponent';
export { default } from './MyComponent';
```

`MyComponent.js`

```
import React from 'react';
import classNames from 'classnames';

function MyComponent({ className, children }) {
  return <div className={classNames(className)}>{children}</div>;
}

export default MyComponent;
```

Or if you created a React Native component:

```
import React from 'react';
import { StyleSheet, View } from 'react-native';

function MyComponent({ style, children }) {
  return <View style={[style, styles.root]}>{children}</View>;
}

const styles = StyleSheet.create({
  root: {},
});

export default MyComponent;
```

**Enjoy!**
