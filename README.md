# mobx-react-hook
mobx数据变化时更新react hook组件（Update the react hook component when the mobx data changes）

### 安装（install）

`npm i mobx-react-hook`

### 使用（how to use）

自定义(custom) hook：`useObserver(args)`
- `{Function|Object} args` mobx的reaction函数或者mobx的可观察对象（mobx reaction function or mobx observable object）

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

// react hook component
import React,{useEffect} from 'react'
import {useObserver} from 'mobx-react-hook'
import store from './store.js'

export default ()=>{
    const {test}=useObserver(store)
    // or
    const {test}=useObserver(()=>{test:store.test})

    useEffect(()=>{
        store.setTest=0
    },[])

    return (
        <div>{test}</div>
    )
}
```