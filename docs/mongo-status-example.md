### Step-by-step start with MongoDB.

1. Install mongoose:  
`npm i -s mongoose`

2. Define status model:
```js
const mongoose = require('mongoose');

const Schema = mongoose.Schema({
    user_id: {
        type: String,
        require: true,
        unique: true,
    },
    status: {
        type: String,
    },
}, { collection: 'statuses' });

const Status = mongoose.model('Status', Schema);
```

3. Define `getStatus` and `setStatus` methods:
```js
const setStatus = (user_id, status) => {
    return new Promise((resolve, reject) => {
        Status.findOne({ user_id: id }).then(res => {
            if (res) {
                res.status = status;
                res.save(err => err ? reject(err) : resolve());
            } else {
                const newStatus = new Status({ user_id, status });
                newStatus.save(err => err ? reject(err) : resolve());
            }
        })
        .catch(err => reject(err));
    });
}

const getStatus = user_id => {
    return new Promise((resolve, reject) => {
        Status.findOne({ user_id })
        .then(res => resolve(res ? res.status : null))
        .catch(err => reject(err));
    });
}
```

4. Use it in Ant:Messenger instance:
```js
const Ant = new AntMessenger(token, { getStatus, setStatus })
``` 

5. PROFIT! Ant:Messenger fully ready to use.