---
title: |
  Model
---
<SwmSnippet path="/src/locations/moorish-temple/composition.js" line="19">

---

This code snippet renders a `ModelJSX` component with various props. The `model` prop is set to `Model`, the `instances` prop is set to `Instances`, the `enableScroll` prop is set to the value of `scrollEnabled`, the `lightMap` prop is set to `true`, the `className` prop is set to `fixed`, and the `cameraName` prop is set to `WebCamera`.

COMMENT: the provided description is not informative. Here is where developer is needed to give more context.

```javascript
      <ModelJSX
        model={Model}
        instances={Instances}
        enableScroll={scrollEnabled}
        lightMap={true}
        className="fixed"
        cameraName="WebCamera"></ModelJSX>
```

---

</SwmSnippet>

## Model component&nbsp;

## <SwmPath>[src/componentsR3F/GLTFOptimised.js](/src/componentsR3F/GLTFOptimised.js)</SwmPath>

<SwmSnippet path="/src/componentsR3F/GLTFOptimised.js" line="29">

---

This code snippet uses the `useMemo` hook to create two memoized values: `OptimisedModel` and `InstancesGroup`. The value of `OptimisedModel` is the `model` if it exists, otherwise it is set to `DefaultModel`. The value of `InstancesGroup` is the `instances` if it exists, otherwise it is set to `Instances`. These memoized values will only update if their respective dependencies (`model` and `instances`) change.

```javascript
  const OptimisedModel = useMemo(() => (model ? model : DefaultModel), [model]);
  const InstancesGroup = useMemo(() => (instances ? instances : Instances), [instances]);
```

---

</SwmSnippet>

<SwmSnippet path="/src/componentsR3F/GLTFOptimised.js" line="39">

---

This code snippet dispatches a custom event named <SwmToken path="/src/componentsR3F/GLTFOptimised.js" pos="40:6:6" line-data="      new CustomEvent(&#39;ThreeLoading&#39;, {">`ThreeLoading`</SwmToken> using the `document.dispatchEvent()` method. The event contains a `detail` object with a `progress` property, which is set to the rounded value of the `progress` variable.

```javascript
    document.dispatchEvent(
      new CustomEvent('ThreeLoading', {
        detail: {
          progress: Math.round(progress),
        },
      })
    );
```

---

</SwmSnippet>

<SwmSnippet path="/src/componentsR3F/GLTFOptimised.js" line="51">

---

This code snippet defines a function `gltfLoaded` that performs several operations on a `nodes` object, `animations` array, `mixer` object, and `actions` object. It checks if a `lightMap` exists and assigns it to the `lightMap` property of any child object that has a `material` property with an `emissiveMap`. It also sets the `child` object as the camera if its `type` is 'PerspectiveCamera' or its `name` is 'Camera'. Additionally, it creates a custom `animMixer` object using the first element of a `ref` object, sets its `timeScale` property, and iterates through the `animations` array to set the `duration` property and play each animation. Finally, it updates the `mixer` state with the `animMixer` object.

```javascript
  const gltfLoaded = (nodes, animations, mixer, actions) => {
    if (lightMap) {
      Object.values(nodes).forEach((child) => {
        if (child.material && child.material.emissiveMap) {
          child.material.lightMap = child.material.emissiveMap;
        }
        if (child.type === 'PerspectiveCamera' || child.name === 'Camera') {
          setCamera(child);
        }
      });
    }

    // Custom controlled animationMixer
    const animMixer = new AnimationMixer(ref.current[0]);
    animMixer.timeScale = timeScale;
    animMixer.duration = 0;
    animations.forEach((clip) => {
      animMixer.duration = clip.duration > animMixer.duration ? clip.duration : animMixer.duration;
      const action = animMixer.clipAction(clip);
      action.play();
    });
    setMixer(animMixer);
  };
```

---

</SwmSnippet>

<SwmMeta version="3.0.0" repo-id="Z2l0aHViJTNBJTNBc3dpbW0tdGVzdCUzQSUzQVBhdmVsLVlhcmFraG92aWNo" repo-name="swimm-test"><sup>Powered by [Swimm](https://app.swimm.io/)</sup></SwmMeta>
