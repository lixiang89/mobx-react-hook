# mobx-react-hook
mobx数据变化时更新react hook组件

### 安装

`npm i mobx-react-hook`

### 使用

自定义 hook：`useObserver(args)`
- `{Function|Object} args` mobx的reaction函数或者mobx的可观察对象。数据多的话，最好传入function。

```javascript
// store.js
import {observable,action} from 'mobx'

class Store{
    @observable test={t:1}
    @action
    setTest=(val={})=>{
        this.test=val
    }
}

export default new Store()

// react component
import React,{useEffect} from 'react'
import {useObserver} from 'mobx-react-hook'
import store from './store.js'

export default ()=>{
    const {test}=useObserver(store)
    // or
    const {test}=useObserver(()=>({test:store.test}))

    useEffect(()=>{
        store.setTest({t:2})
    },[])

    return (
        <div>{test.t}</div>
    )
}
```

### 注意

如果有互相关联的数据，最好分开来处理。如：

```javascript
    // store.js
    import {observable,action} from 'mobx'
    // mobx-extend是我的另一个npm包，主要扩展mobx一些方法，toJS既是mobx的toJS封装
    import mobxExtend from 'mobx-extend'

    @mobxExtend
    class Store{
        @observable a=1
        @observable b=2
        @action setB=(val)=>{this.b=val}
    }

    export default new Store()

    // react component
    import store from './store.js'
    const {a}=useObserver(()=>store.toJS(['a']))
    const {b}=useObserver(()=>store.toJS(['b']))

    // 可能会引起bug 
    // const {a,b}=useObserver(()=>store.toJS(['a','b']))

    useEffect(()=>{
        store.setB('sth.')
    },[a])
```

在`a`变动时会改变`b`的值，这种情况下，`a`和`b`分开使用`useObserver`比较好，否则可能会引起一些问题。